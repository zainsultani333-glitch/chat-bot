import React, { useState, useEffect, useRef } from "react";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/solid";

function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" },
  ]);

  const chatEndRef = useRef(null);

  const handleSend = (message) => {
    if (!message.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { text: message, sender: "user" }]);

    // Mock bot reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "I received your message: " + message, sender: "bot" },
      ]);
    }, 1000);
  };

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full h-[100vh] sm:w-[360px] sm:h-[500px] bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden">
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
