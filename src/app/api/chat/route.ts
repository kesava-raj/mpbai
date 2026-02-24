import { NextResponse } from 'next/server';

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
        MPBx AI Labs is a futuristic AI Delivery Studio and Product Lab. We don't just research algorithms; we forge them into production-ready systems that power businesses. 
        We are part of the MyProBuddy ecosystem. Our core values are Execution, Innovation, Trust, and Accountability.

        SERVICES:
        1. AI Agents: Autonomous intelligence for complex tasks (task execution, decision-making, multi-step workflows).
        2. AI Chatbots: Intelligent conversational interfaces (support, lead capture, context retention).
        3. AI Voicebots: Voice-enabled AI scale (100+ simultaneous calls, CRM integration, emotion detection).
        4. Workflow Automation: End-to-end process intelligence (process mapping, API integration, data entry).

        OFFICIAL CASE STUDIES:

        1. End-to-End Tender Intelligence & Proposal Automation (Government Contracting)
           - Challenge: A mid-sized enterprise operating in a tender-heavy sector was spending disproportionate management time on identifying relevant tenders, manually checking eligibility, coordinating documentation, and assembling proposals under tight deadlines.
           - Intervention: Built an AI-first tender intelligence and proposal automation platform that mirrors the client’s real operating workflow.
           - What We Built: Automated tender discovery and relevance scoring, Eligibility logic mapping, Structured ingestion of 30+ mandatory docs, Risk flags, compliance checks, and Proposal assembly with version control.
           - Impact: Significant reduction in bid preparation time, Improved bid discipline, Lower dependency on individual experts, Consistent, auditable tender responses.
           - Key Quote: "AI embedded into execution, ensuring speed without compromising compliance."

        2. Clinical Workflow Automation for a Diagnostics Network (Healthcare)
           - Challenge: A fast-growing diagnostics group struggled with fragmented workflows across intake, routing, and reporting. Legacy systems existed, but none reflected how work was actually done on the ground.
           - Intervention: Designed a workflow-first automation layer that precisely digitised the existing operational process.
           - What We Built: End-to-end workflow automation (intake to reporting), Real-time operational dashboards, Rule engines derived from SOPs, and Longitudinal data exhaust for future intelligence.
           - Impact: Immediate operational visibility, Reduced coordination errors, Foundation for explainable clinical intelligence, Scalable architecture.
           - Key Quote: "Built as a long-term operating system, not a one-off software deployment."

        3. AI-Driven Student Assessment & Progress Intelligence (EdTech)
           - Challenge: An education organisation wanted a structured, objective way to assess student readiness and track progress—without relying solely on subjective evaluations.
           - Intervention: Data-driven assessment and scoring framework that combines structured inputs and explainable scoring logic.
           - What We Built: Multi-dimensional assessment engine, Transparent scoring logic with explainability, Progress tracking across cohorts, and Insights tailored for stakeholders.
           - Impact: More objective decision-making, Clear identification of gaps, Improved stakeholder confidence, Platform extensible across programs.
           - Key Quote: "Prioritized trust and explainability, not black-box scores."

        4. AI-Led Equity Readiness & Investor Alignment Platform (FinTech / VC)
           - Challenge: Early-stage companies often approach equity fundraising without being investor-ready—leading to wasted effort and misaligned conversations.
           - Intervention: AI-assisted equity readiness and screening platform that evaluates startups across business and financial dimensions.
           - What We Built: Structured founder and company intake, AI-generated readiness diagnostics, Clear classification (pursue/defer/rework), and Investor-aligned recommendations.
           - Impact: Higher quality founder-investor conversations, Reduced noise and false starts, Better use of founder and investor time, Improved credibility.
           - Key Quote: "Shifts fundraising from hope-driven outreach to data-informed preparation."

        5. Grant Discovery, Eligibility & Application Intelligence (Non-Profit / Research)
           - Challenge: Startups and MSMEs struggle to discover relevant grants, interpret eligibility clauses, and prepare compliant applications.
           - Intervention: Grant intelligence platform that combines structured grant databases with AI-driven eligibility analysis.
           - What We Built: Continuously updated grant corpus, Eligibility extraction and rule mapping, Fit scoring based on company profile, and Guided application workflows.
           - Impact: Improved grant discovery and success rates, Lower dependence on manual consultants, Faster application cycles, Clear audit trail.
           - Key Quote: "Grants became a repeatable process, not a one-time gamble."

        OUR APPROACH:
        We focus on "AI embedded into execution" and building "long-term operating systems."

        CONTACT INFO:
        Email: reachus@myprobuddy.com
        Phone: +91 99522 37700
        Roadmap within 24 hours.
        `;

        const prompt = `
        You are MPBx AI, the professional and futuristic AI assistant for MPBx AI Labs.
        Your goal is to answer user questions based ONLY on the provided knowledge base.
        
        KNOWLEDGE BASE:
        ${knowledgeBase}

        STRICT GUIDELINES:
        - NEVER use external knowledge or perform web searches (imaginary or real).
        - If asked about "Case Studies", list or describe the 5 official case studies from the knowledge base.
        - Use "we", "our", and "ours" when referring to MPBx AI Labs.
        - If information is not in the knowledge base, state: "I am specialized in MPBx AI Labs' specific offerings and case studies. For more detailed information, please contact our team at reachus@myprobuddy.com."
        - Keep answers concise, professional, and tech-forward.
        
        User context: ${JSON.stringify(context || {})}
        The user just said: "${message}"
        
        Answer as MPBx AI:
        `;

        // Create the request body
        const requestBody = {
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.1, // Keep it grounded
                topK: 1,
                topP: 1,
            }
        };

        console.log("Sending request to Gemini API (gemini-flash-latest)...");

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Gemini API Error (Status: ${response.status}):`, errorText);
            throw new Error(`Gemini API Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();

        if (data.error) {
            console.error("Gemini API Data Error:", data.error);
            throw new Error(data.error.message || 'Gemini API Error');
        }

        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
            console.error("Unexpected Gemini response structure:", JSON.stringify(data, null, 2));
            throw new Error("Invalid response format from Gemini");
        }

        return NextResponse.json({ reply: text });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('SERVER SIDE CHAT ERROR:', error);
        // Return the actual error message to the client for debugging
        return NextResponse.json(
            { error: error.message || 'Failed to process chat request' },
            { status: 500 }
        );
    }
}
