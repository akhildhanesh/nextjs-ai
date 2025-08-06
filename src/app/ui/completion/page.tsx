"use client"

import { FormEvent, useState } from "react";
import Markdown from "react-markdown";

const CompletionPage = () => {
  const [prompt, setPrompt] = useState<string>("")
  const [completion, setCompletion] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const complete = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/completion", {
        method: "POST",
        body: JSON.stringify({prompt})
      })

      const data = await response.json();
      setCompletion(data?.text);

      if (!response.ok) {
        throw new Error(data?.error)
      }
    } catch (error) {
      console.error(error)
      setError(error instanceof Error ? error?.message : "Something went wrong")
    } finally {
      setIsLoading(false)
      setPrompt("")
    }
  };
  return (
    <div className="flex flex-col items-center">
      <div className="p-5">
        {error && !completion ? (
          <div className="text-red-500">{error}</div>
        ) : null}
        {isLoading ? (
          <div className="text-white animate-pulse font-bold">Loading</div>
        ) : completion ? (
          <div className="whitespace-pre-wrap text-white">
            <Markdown>{completion}</Markdown>
          </div>
        ) : null}
      </div>
      <form className="fixed bottom-2 w-full px-3 max-w-lg" onSubmit={complete}>
        <div className="flex gap-2 w-full">
          <input
            type="text"
            placeholder="How can i help you?"
            className="flex-1 !bg-[#303030] p-2 pl-5 py-3 w-full text-white rounded-full outline-none"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            type="submit"
            className={`font-bold cursor-pointer ${
              isLoading || !prompt ? "text-gray-500" : "text-white "
            }`}
            disabled={isLoading || !prompt}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default CompletionPage