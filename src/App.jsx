import React, { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/solid";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-5 z-50">
          <ChatWindow onClose={() => setIsOpen(false)} />
        </div>
      )}

      {/* Floating button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-50 bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-full shadow-xl hover:scale-110 hover:from-blue-600 hover:to-indigo-700 transition transform duration-300 animate-bounce"
        >
          <ChatBubbleOvalLeftIcon className="h-6 w-6 text-white" />
        </button>
      )}
    </>
  );
}

export default App;
