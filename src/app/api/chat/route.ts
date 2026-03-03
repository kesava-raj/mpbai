import { NextResponse } from 'next/server';

// Fallback chain: try these models in order if one is rate-limited
const MODEL_FALLBACKS = [
    'gemini-2.0-flash',
    'gemini-2.0-flash-lite',
    'gemini-2.5-flash',
];

async function callGemini(apiKey: string, requestBody: object): Promise<{ text: string; model: string }> {
    for (const model of MODEL_FALLBACKS) {
        console.log(`Trying model: ${model}...`);

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            }
        );

        if (response.status === 429) {
            console.warn(`Model ${model} rate-limited (429). Trying next fallback...`);
            continue; // Try the next model
        }

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Gemini API Error (${model}, Status: ${response.status}):`, errorText);
            throw new Error(`Gemini API Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();

        if (data.error) {
            console.error(`Gemini API Data Error (${model}):`, data.error);
            throw new Error(data.error.message || 'Gemini API Error');
        }

        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
            console.error(`Unexpected response from ${model}:`, JSON.stringify(data, null, 2));
            throw new Error('Invalid response format from Gemini');
        }

        console.log(`✅ Success with model: ${model}`);
        return { text, model };
    }

    throw new Error('All Gemini models are currently rate-limited. Please wait a minute and try again.');
}

export async function POST(req: Request) {
    try {
        const { message, context } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: 'Gemini API key not configured' },
                { status: 500 }
            );
        }

        const knowledgeBase = `
        COMPANY OVERVIEW:
        MPBx AI Labs is a futuristic AI Delivery Studio and Product Lab. We forge production-ready AI systems (Operating Systems, not just one-offs). 
        We are part of the MyProBuddy ecosystem. Our core values are Execution, Innovation, Trust, and Accountability.

        CAPABILITIES:
        1. AI Architecting: We design the entire blueprint of your project.
        2. BRD Generation: We build detailed Business Requirement Documents.
        3. Competitive Analysis: We analyze market rivals and identify gaps your AI can fill.
        4. Production Delivery: We build high-scale Agents, Voicebots, and Workflow Automations.

        SERVICES:
        - AI Agents: Autonomous intelligence for multi-step workflows.
        - AI Chatbots: Context-aware interfaces for support & lead capture.
        - AI Voicebots: Natural speech handling 100+ simultaneous calls.
        - Workflow Automation: End-to-end process intelligence mirroring SOPs.

        REFERENCE CASE STUDIES:
        1. End-to-End Tender Intelligence & Proposal Automation (Government Contracting):
           - Challenge: Disproportionate time spent on manual discovery and eligibility coordination.
           - Intervention: AI-first platform that automates discovery, scores relevance, maps eligibility criteria, and assembles submission-ready proposals.
           - Impact: Significant reduction in bid preparation time and improved bid discipline.
        
        2. Clinical Workflow Automation (Healthcare):
           - Challenge: Fragmented workflows across intake, routing, and reporting for a diagnostics network.
           - Intervention: Workflow-first automation layer digitising SOPs into a long-term operating system.
           - Impact: Immediate operational visibility and reduced coordination errors.
        
        3. AI-Driven Student Assessment & Progress Intelligence (EdTech):
           - Challenge: Subjective readiness evaluations lacking diagnostic depth.
           - Intervention: Data-driven framework combining structured inputs and explainable scoring logic for actionable educator insights.
           - Impact: Objective decision-making and clear gap identification.
        
        4. AI-Led Equity Readiness & Investor Alignment (FinTech / VC):
           - Challenge: Startups approaching fundraising without structured readiness.
           - Intervention: Platform evaluating business, financial, and narrative dimensions to generate readiness diagnostics.
           - Impact: Higher quality founder-investor conversations and reduced fundraising noise.
        
        5. Grant Discovery, Eligibility & Application Intelligence (Non-Profit):
           - Challenge: SMEs struggling with interpretating eligibility clauses for grants.
           - Intervention: Platform combining structured databases with AI-driven eligibility analysis and guided workflows.
           - Impact: Improved success rates and lower dependence on consultants.

        CONTACT INFO:
        Email: reachus@myprobuddy.com
        Phone: +91 99522 37700
        `;

        const prompt = `
        SYSTEM ROLE:
        You are the "MPBx Lead AI Architect." You are highly intelligent, strategic, and professional. 
        Your primary role is to help users bridge the gap between their "Big Idea" and a "Production-Ready Blueprint."

        MISSION PARAMETERS:
        1. INFORMATION GATHERING: When a user shares an idea, ask intelligent follow-up questions to understand the "Ground Reality".
        2. PROJECT BLUEPRINTING: Once you have enough context, offer to generate a mini-BRD (Business Requirement Document).
        3. HELPING THE USER & ENDING CONVERSATION: Think logically. If the user asks "how can you help me", or if the conversation seems to be reaching a natural conclusion where they want to know more or proceed with building, tell them we can build this and you need their contact details to set up a meeting.
           - Crucially, whenever you ask for their contact details to proceed, you MUST append the exact text "[TRIGGER_CONTACT_FORM]" at the very bottom of your response. This will trigger the UI popup automatically.
        4. BRAND ALIGNMENT: Always maintain that MPBx AI Labs builds "Operating Systems" for execution.
        5. QUICK REPLIES: At the absolute end of every single response, you must provide 3 context-aware quick replies for the user to click. Format this exactly starting with "[QUICK_REPLIES]" followed by the options separated by a pipe "|". 
           - ONE of these options must always be "Contact Us".
           - Example format: "[QUICK_REPLIES] Generate a BRD | Tell me about your case studies | Contact Us"

        RESPONSE STYLE:
        - Use "we", "our", and "ours" (MPBx AI Labs).
        - Maintain a futuristic, executive, and confident tone.
        - STRICT FORMATTING RULE: You MUST use proper Markdown. Always add double line breaks (\n\n) between paragraphs, list items, and sections.
        - NEVER escape markdown. Write bold text using **bold text** syntax directly.
        - If a user just says "hey", greet them as the Lead Architect and ask what they are looking to build today.

        KNOWLEDGE BASE:
        ${knowledgeBase}

        User context size: ${context ? context.length : 0} previous messages.
        Recent Context: ${JSON.stringify(context?.slice(-4) || [])}

        Input: "${message}"

        Architect's Response:
        `;

        const requestBody = {
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
            }
        };

        const { text } = await callGemini(apiKey, requestBody);

        return NextResponse.json({ reply: text });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('SERVER SIDE CHAT ERROR:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to process chat request' },
            { status: 500 }
        );
    }
}
