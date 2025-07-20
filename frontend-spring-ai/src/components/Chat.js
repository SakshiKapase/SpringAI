import React, { useState } from "react";

function ChatGenerator() {
  const [prompt, setPrompt] = useState("");           // User input
  const [chatResponse, setChatResponse] = useState(""); // AI response

  // Function to call backend API
  const askAI = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/ask-ai?prompt=${prompt}`  // Backend endpoint
      );

      const data = await response.text(); // We expect plain text as response
      console.log(data);

      setChatResponse(data); // Update response
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  return (
    <div className="chat-container">
      <h2>Talk to AI</h2>

      {/* ✅ Input for prompt */}
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a prompt for AI"
      />

      {/* ✅ Button to trigger API call */}
      <button onClick={askAI}>Ask AI</button>

      {/* ✅ Display the output */}
      <div className="output">
        <p>{chatResponse}</p>
      </div>
    </div>
  );
}

export default ChatGenerator;
