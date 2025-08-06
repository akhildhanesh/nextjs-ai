import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const { text } = await generateText({
      model: google("gemini-2.0-flash"),
      maxOutputTokens: 100,
      prompt: prompt,
    });

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Error:", error);
    NextResponse.json(
      {
        error: "Failed to generate text",
      },
      {
        status: 500,
      }
    );
  }
}
