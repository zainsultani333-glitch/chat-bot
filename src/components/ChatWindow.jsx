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

    // Show typing indicator
    setIsTyping(true);

    // Define Swagger flow
    const flow = [
      {
        action: "login",
        payload: {
          name: "Dr. Sir Iklaq",
          phone: "03124567896",
          address: "cant",
        },
      },
      { action: "list_categories", payload: {} },
      {
        action: "list_items",
        payload: { category_name: "Computer Accessories" },
      },
      {
        action: "add_to_cart",
        payload: { name: "Laptop MacPro 2017", quantity: 2, price: 85000 },
      },
      { action: "show_cart", payload: {} },
      { action: "checkout", payload: { payment_method: "Cash on Delivery" } },
      { action: "logout", payload: {} },
    ];

    try {
      let finalResponse = null;

      // Loop through flow sequentially
      for (const step of flow) {
        const response = await fetch(
          "https://fastapi-chatbot-wine.vercel.app/chat",
          {
            method: "POST",
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              action: step.action,
              payload: step.payload,
            }),
          }
        );

        const data = await response.json();
        finalResponse = data;

        // Optionally show intermediate responses
        let botText = "";
        if (data.categories) botText = data.categories.join(", ");
        else if (data.items)
          botText = data.items.map((i) => `${i.name} - ${i.price}`).join("\n");
        else if (data.cart)
          botText = data.cart.map((i) => `${i.name} x${i.quantity}`).join("\n");
        else botText = data.message || "No response from bot.";

        setMessages((prev) => [...prev, { text: botText, sender: "bot" }]);
      }

      setIsTyping(false);
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
