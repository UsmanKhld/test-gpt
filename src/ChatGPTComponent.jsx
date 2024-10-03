import React, { useState } from "react";
import axios from "axios";
import "./ChatGPTComponent.css"; // Import CSS for styling

const ChatGPTComponent = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const apiKey = import.meta.env.VITE_APP_OPENAI_API_KEY; // Replace with your OpenAI API key

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const getChatGPTResponse = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const result = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `You are a friendly assistant who focuses on technology and programming topics. 
									  Always introduce yourself as "Tech Assistant" and avoid discussing anything outside of technology. 
									  Use a cheerful and encouraging tone.`,
            },
            { role: "user", content: prompt },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      setResponse(result.data.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching response from OpenAI:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      getChatGPTResponse();
    }
  };

  return (
    <div className="chat-container">
      <h1 className="chat-title">Chat with GPT</h1>
      <div className="chat-box">
        <div className="chat-output">
          {response ? (
            <div className="response-bubble">
              <p>{response}</p>
            </div>
          ) : (
            <div className="placeholder">
              {loading ? "Generating response..." : "Ask me anything!"}
            </div>
          )}
        </div>

        <textarea
          value={prompt}
          onChange={handlePromptChange}
          onKeyDown={handleKeyPress}
          className="chat-input"
          placeholder="Type your prompt here..."
          rows="2"
          disabled={loading}
        />

        <button
          className="send-button"
          onClick={getChatGPTResponse}
          disabled={loading || !prompt}
        >
          {loading ? "Loading..." : "Send"}
        </button>
      </div>
      <a href="/recipes">
        <button className="send-button">Recipe maker</button>
      </a>
    </div>
  );
};

export default ChatGPTComponent;
