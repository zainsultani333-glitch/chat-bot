import React, { useState, useEffect, useRef } from "react";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/solid";

function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef(null);

  const handleSend = async (message) => {
    if (!message.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { text: message, sender: "user" }]);

    // Show typing dots
    setIsTyping(true);

    try {
      const response = await fetch("https://chat-update-five.vercel.app/chat", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "string",
          payload: { additionalProp1: {} },
          message: message,
        }),
      });

      const data = await response.json();

      // Hide typing and show bot response
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { text: data.message || "No response from bot.", sender: "bot" },
      ]);
    } catch (error) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { text: "Error: Could not reach server.", sender: "bot" },
      ]);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 w-full h-screen sm:w-[360px] sm:h-[500px] bg-white rounded-none sm:rounded-2xl shadow-lg flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between bg-blue-500 p-3 sm:p-4 text-white font-semibold text-base sm:text-lg">
        <div className="flex items-center gap-2">
          <ChatBubbleOvalLeftIcon className="h-6 w-6" />
          ChatBot
        </div>
        <button onClick={onClose} className="text-white text-xl font-bold">
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 sm:p-4 overflow-y-auto flex flex-col space-y-3">
        {messages.map((msg, index) => (
          <ChatMessage key={index} text={msg.text} sender={msg.sender} />
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center space-x-2">
            <div className="bg-blue-500 rounded-full p-1 flex-shrink-0">
              <ChatBubbleOvalLeftIcon className="h-6 w-6 text-white" />
            </div>
            <div className="bg-gray-200 text-black px-3 py-2 rounded-xl text-sm sm:text-base">
              <span className="typing-dots">...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef}></div>
      </div>

      {/* Input */}
      <div className="border-t border-gray-200">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}

export default ChatWindow;
