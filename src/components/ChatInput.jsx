import React, { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

function ChatInput({ onSend }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <form
      className="flex items-center border-t border-gray-200 p-2 sm:p-3"
      onSubmit={handleSubmit}
    >
      {/* Input field */}
      <input
        type="text"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 px-3 py-2 sm:px-4 sm:py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
      />

      {/* Send button */}
      <button
        type="submit"
        className="ml-2 bg-gradient-to-br from-blue-500 to-indigo-600 px-4 py-2 sm:px-5 sm:py-3 rounded-full shadow-lg hover:scale-110 hover:from-blue-600 hover:to-indigo-700 transition transform duration-200 flex items-center justify-center"
      >
        <PaperAirplaneIcon className="h-5 w-5 text-white" />
      </button>
    </form>
  );
}

export default ChatInput;
