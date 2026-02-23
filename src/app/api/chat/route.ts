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

        const prompt = `
      You are MPBx AI, a helpful, professional, and slightly futuristic AI assistant for MPBx AI Labs.
      Your goal is to explain our services, case studies, and capabilities in a conversational, chat-like manner.
      Be concise, engaging, and tech-savvy. Don't be too verbose unless asked for details.
      
      User context (if any): ${JSON.stringify(context || {})}
      
      The user just said: "${message}"
      
      Answer the user as MPBx AI.Focus on "we build", "our solutions", etc.
    `;

        // Create the request body
        const requestBody = {
            contents: [{ parts: [{ text: prompt }] }],
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
    } catch (error: any) {
        console.error('SERVER SIDE CHAT ERROR:', error);
        // Return the actual error message to the client for debugging
        return NextResponse.json(
            { error: error.message || 'Failed to process chat request' },
            { status: 500 }
        );
    }
}
