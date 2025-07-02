import { GoogleGenerativeAI } from "@google/generative-ai";

import { ResumeMatchResponse, GenerateContentPayload } from '../../../types/ResumeMatchTypes';
import { NextResponse } from "next/server";

const googleGenAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string)

export async function POST(request: Request) {
    const payload: GenerateContentPayload = await request.json()
    const model = googleGenAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // to use "gemini-pro" // gemini-1.5-pro

    const prompt = `
        You are an expert HR recruiter and an AI resume matching specialist.
        Your task is to analyze a candidate's resume against a given job at given URL and provide a comprehensive match analysis in a structured JSON format.

        ---
        **Job Description URL:** ${payload.jobUrl}
        ---
        **Candidate Resume File:** ${payload.resume}

        ---
        **Your analysis should provide the following:**
        1.  **matchScore**: An overall percentage (0-100) indicating how well the resume matches the job requirements.
        2.  **overallSummary**: A concise paragraph summarizing the overall fit.
        3.  **strengths**: An array of key areas where the candidate excels, with a title, description, and relevant keywords.
        4.  **areasToAddress**: An array of key areas where the candidate needs to improve, with a title, description, suggestions for improvement, and relevant keywords.
        5.  **sectionMatches**: (Optional but highly recommended) An array of detailed match analyses for specific resume sections (e.g., "Experience", "Skills", "Education"). Include a score, summary, highlights, and gaps for each.
        6.  **matchedKeywordsAndSkills**: An array of important skills/keywords from both the resume and job description, indicating presence in each, and an optional relevance score.
        7.  **recommendation**: (Optional) A recommendation ('SHORTLIST', 'REVIEW_CAREFULLY', 'REJECT') and a reason.
        8.  **warnings**: (Optional) Any issues found during analysis (e.g., "Resume format was difficult to parse").

        **IMPORTANT**: Respond ONLY with a JSON object adhering to the specified schema. Do not include any conversational text or markdown outside the JSON.
    `;

    const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
            responseMimeType: "application/json", // This is crucial for structured output
            // maxOutputTokens: 2048 // Controls the maximum number of tokens (words + punctuation pieces) the model can generate.
        },
    });

    const responseText = result.response.text();
    try {
        const parsedResponse: ResumeMatchResponse = JSON.parse(responseText);
        return NextResponse.json(parsedResponse)
    } catch (error) {
        console.error("Failed to parse Gemini API response:", responseText, error); 
    }
}
