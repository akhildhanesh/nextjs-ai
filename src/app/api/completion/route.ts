import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextResponse } from "next/server";

export async function POST() {
  const { text } = await generateText({
    model: google("gemini-2.0-flash"),
    maxOutputTokens: 50,
    prompt: "today's date",
  });

  return NextResponse.json({ text });
}
