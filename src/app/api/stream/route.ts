import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const result = streamText({
      model: google("gemini-2.0-flash"),
      prompt,
    });
    return result.toUIMessageStreamResponse();
  } catch (err) {
    console.error("Streaming error:", err);
    return NextResponse.json(
      {
        error: "Failed to Stream response",
      },
      {
        status: 500,
      }
    );
  }
}
