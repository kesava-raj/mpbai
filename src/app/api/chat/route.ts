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
           - Challenge: Fragmented, error-prone process for identifying tenders and assembling proposals under tight deadlines.
           - Intervention: Built an AI-first platform for ingestion, eligibility analysis, and proposal assembly.
           - Impact: Significant reduction in bid preparation time, improved bid discipline, auditable responses.
           - Key Quote: "AI embedded into execution, ensuring speed without compromising compliance."

        2. Clinical Workflow Automation (Diagnostics / Healthcare)
           - Challenge: Fragmented workflows across intake, routing, and reporting in a fast-growing diagnostics network.
           - Intervention: Designed a workflow-first automation layer digitizing the operational process.
           - Impact: Immediate operational visibility, reduced coordination errors, scalable architecture.
           - Key Quote: "Built as a long-term operating system, not a one-off software deployment."

        3. AI-Driven Student Assessment & Progress Intelligence (EdTech)
           - Challenge: Lacked diagnostic depth and longitudinal insight in student readiness assessment.
           - Intervention: Data-driven assessment and scoring framework with explainable logic.
           - Impact: Objective decision-making, clear identification of gaps, improved stakeholder confidence.
           - Key Quote: "Prioritized trust and explainability, not black-box scores."

        4. AI-Led Equity Readiness & Investor Alignment (FinTech / VC)
           - Challenge: Founders lacked structured ways to assess investor-readiness before fundraising.
           - Intervention: AI-assisted screening platform evaluating business, financial, governance, and narrative dimensions.
           - Impact: Higher quality founder-investor conversations, reduced noise, better use of time.
           - Key Quote: "Shifts fundraising from hope-driven outreach to data-informed preparation."

        5. Grant Discovery, Eligibility & Application Intelligence (Non-Profit / Research)
           - Challenge: Startups/MSMEs struggle to interpret grant eligibility and prepare compliant applications.
           - Intervention: Grant intelligence platform with AI-driven eligibility analysis and guided workflows.
           - Impact: Improved success rates, lower dependence on consultants, faster application cycles.

        SUCCESS STORIES (Testimonials):
        - Fintech Automation (FinEase Corp): Reduced loan manual verification time by 80%. Tech: Python, OpenAI, AWS.
        - Healthcare Patient Portal (MediCare Plus): Streamlined intake agent reduced onboarding time by 60%. Tech: Next.js, LangChain, Azure.
        - Retail Demand Forecasting (UrbanTrends): Predictive analytics engine resulted in 22% revenue increase. Tech: TensorFlow, Google Cloud, React.

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
        - If asked about "Case Studies", list or describe the 5 official case studies or 3 success stories from the knowledge base.
        - Use "we", "our", and "ours" when referring to MPBx AI Labs.
        - If information is not in the knowledge base, state: "I am specialized in MPBx AI Labs' specific offerings and case studies. For more detailed information, please contact our team at hello@mpbxailabs.com."
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
