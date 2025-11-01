import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
    try {
        const body = await request.json();
        const { message } = body;

        if (!message) {
            return NextResponse.json(
                { reply: "Message is required" },
                { status: 400 }
            );
        }

        const systemPrompt = `You are Ved's AI portfolio assistant.
You know about:
- Vedprakash Patel, a enthusiastic developer who completed his B.Tech in Computer Science from KIIT.
- His main skills: MERN, Django, Python, Machine Learning (TF-IDF, SVD), Firebase.
- Key projects: Refer to projects section.
Answer questions naturally, in 1-2 short paragraphs.
If asked for contact info, refer them to the Contact section.`;

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

        // Combine system prompt with user message
        const prompt = `${systemPrompt}\n\nUser: ${message}\n\nAssistant:`;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        return NextResponse.json({
            reply: text,
        });
    } catch (error) {
        console.error("Chatbot error:", error);
        return NextResponse.json(
            { reply: "Sorry, something went wrong. Please try again." },
            { status: 500 }
        );
    }
}
