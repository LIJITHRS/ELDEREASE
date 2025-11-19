import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/userContext"; // ✅ Import context
import "./GroupChat.css";

const Groupchat = () => {
  const { user } = useContext(UserContext); // ✅ Access user
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const userId = user?.userId;
  const username = user?.userEmail?.split("@")[0]; // Optional: create better naming if needed

  useEffect(() => {
    console.log("userId:", userId);
    console.log("username:", username);
  }, [userId, username]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/group/messages");
      setMessages(res.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async () => {
    if (!userId || !username) {
      alert("Please login to chat.");
      return;
    }
  
    if (!text.trim()) {
      return; // Don't send empty messages
    }
  
    try {
      await axios.post("http://localhost:5000/group/send", {
        userId,
        sender: username,
        text,
      });
  
      setText("");
      fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  
  

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="chat-container">
      <h2>👥 Group Chat</h2>

      <div className="chat-box">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`chat-message ${msg.username === username ? "self" : "other"}`}
          >
            <span className="chat-username">{msg.username}</span>
            <div className="chat-text">{msg.text}</div>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Groupchat;
