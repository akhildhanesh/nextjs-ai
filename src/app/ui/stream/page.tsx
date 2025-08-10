"use client"

import { useCompletion } from "@ai-sdk/react";
import Markdown from "react-markdown";

const StreamPage = () => {
    const {input, handleInputChange, handleSubmit, completion, isLoading, error} = useCompletion({
        api: "/api/stream"
    })

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-white font-bold text-center p-5 text-2xl">
        GPT - [gemini-2.0-flash]
      </h1>
      <div className="w-2/4 mx-auto">
        {error && !completion ? (
          <div className="text-red-500">{error.message}</div>
        ) : null}
        {isLoading && !completion ? (
          <div className="text-white animate-pulse font-bold">Loading</div>
        ) : completion ? (
          <div className="whitespace-pre-wrap text-white w-full">
            <Markdown>{completion}</Markdown>
          </div>
        ) : null}
        {/* <Markdown>{completion}</Markdown> */}
      </div>
      <div className="flex flex-col items-center">
        <form
          className="fixed bottom-2 w-full px-3 max-w-lg"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-2 w-full">
            <input
              type="text"
              placeholder="How can i help you?"
              className="flex-1 !bg-[#303030] p-2 pl-5 py-3 w-full text-white rounded-full outline-none"
              value={input}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className={`font-bold cursor-pointer ${
                isLoading || !input ? "text-gray-500" : "text-white "
              }`}
              disabled={isLoading || !input}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StreamPage