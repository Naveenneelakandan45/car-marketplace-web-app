import React, { useState, useRef } from "react";
import { LuMessageSquareMore } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { VscSend } from "react-icons/vsc";

const Chat = () => {
  const [chatVisible, setChatVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const thinkingTimeout = useRef(null);

  const toggleChat = () => {
    setChatVisible(!chatVisible);
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (userInput.trim()) {
      const userMessage = { text: userInput, sender: "user" };
      setMessages([...messages, userMessage]);
      setUserInput("");
      generateBotResponse(userInput);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const generateBotResponse = async (input) => {
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 
    const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;

    const context = `"I'm here to assist with car marketplace queries. Please ask about buying, selling, or details of vehicles Answer within 1 or 2 lines. Based on available information, respond to: "${input}"`;

    thinkingTimeout.current = setTimeout(() => {
      setIsThinking(true);
    }, 500);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: context }] }],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const botResponse = data.candidates[0]?.content?.parts[0]?.text || "Sorry, I couldn't understand that.";

      clearTimeout(thinkingTimeout.current);
      setIsThinking(false);

      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, { text: botResponse, sender: "bot" }]);
      }, 1000);
    } catch (error) {
      console.error("Error fetching bot response:", error);
      clearTimeout(thinkingTimeout.current);
      setIsThinking(false);

      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, { text: "Sorry, I encountered an error.", sender: "bot" }]);
      }, 1000);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
     
      <button
        onClick={toggleChat}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all"
      >
        <LuMessageSquareMore />
      </button>

    
      {chatVisible && (
        <div className="w-80 h-96 bg-white shadow-xl rounded-lg fixed bottom-16 right-5 flex flex-col border border-gray-300">
         
          <div className="bg-blue-600 text-white p-3 font-bold text-lg rounded-t-lg flex justify-between">
            <span>LithiBot</span>
            <button onClick={toggleChat} className="text-white text-xl"><IoClose /></button>
          </div>

         
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-[75%] ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white ml-auto"
                    : "bg-gray-200 text-black"
                }`}
              >
                {message.text}
              </div>
            ))}
            {isThinking && <div className="p-2 bg-gray-200 rounded-lg max-w-[75%]">Thinking...</div>}
          </div>

         
          <div className="p-2 border-t border-gray-300 flex">
            <input
              type="text"
              className="flex-1 p-2 border border-gray-300 rounded-lg outline-none"
              placeholder="Type a message..."
              value={userInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2 hover:bg-blue-600"
            >
              <VscSend />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
