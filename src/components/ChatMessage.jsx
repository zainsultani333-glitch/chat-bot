import React from "react";
import { UserIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/solid";

function ChatMessage({ text, sender }) {
  return (
    <div
      className={`flex items-end space-x-2 ${
        sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      {/* Bot avatar */}
      {sender === "bot" && (
        <div className="bg-blue-500 rounded-full p-1 flex-shrink-0">
          <ChatBubbleOvalLeftIcon className="h-6 w-6 text-white" />
        </div>
      )}

      {/* Message bubble */}
      <div
        className={`max-w-[85%] sm:max-w-[70%] p-2 sm:p-3 rounded-xl text-sm sm:text-base break-words ${
          sender === "user"
            ? "bg-green-200 text-black"
            : "bg-gray-200 text-black"
        }`}
      >
        {text}
      </div>

      {/* User avatar */}
      {sender === "user" && (
        <div className="bg-green-500 rounded-full p-1 flex-shrink-0">
          <UserIcon className="h-6 w-6 text-white" />
        </div>
      )}
    </div>
  );
}

export default ChatMessage;
