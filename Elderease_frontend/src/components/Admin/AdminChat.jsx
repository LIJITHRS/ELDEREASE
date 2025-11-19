import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminChat.css";

const AdminChat = () => {
    const [messages, setMessages] = useState([]);
    const [replies, setReplies] = useState({});

    // ✅ Fetch messages when component mounts
    useEffect(() => {
        fetchMessages();
    }, []);

    // ✅ Fetch all messages for Admin
    const fetchMessages = async () => {
        try {
            console.log("✅ Fetching all messages for admin...");

            const response = await axios.get("http://localhost:5000/messages");

            console.log("✅ Messages received:", response.data);
            
            // ✅ Group messages by userId (Include both user & admin messages)
            const groupedMessages = response.data.reduce((acc, msg) => {
                if (!acc[msg.userId]) {
                    acc[msg.userId] = { username: msg.username, messages: [] };
                }

                // ✅ Differentiate between user messages and admin messages
                acc[msg.userId].messages.push(
                    msg.sender === "admin" ? <p key={msg._id}><strong>Admin:</strong> {msg.text}</p> : <p key={msg._id}>{msg.text}</p>
                );

                return acc;
            }, {});

            setMessages(Object.entries(groupedMessages)); // Convert object to array
        } catch (error) {
            console.error("❌ Error fetching messages:", error);
        }
    };

    // ✅ Handle reply input change
    const handleReplyChange = (userId, replyText) => {
        setReplies({ ...replies, [userId]: replyText });
    };

    // ✅ Send reply message
    const sendReply = async (userId) => {
        if (!replies[userId]) return; // Prevent empty replies

        try {
            console.log(`✅ Sending reply to user ID: ${userId}`);
            await axios.post("http://localhost:5000/messages/reply", {
                userId,
                text: replies[userId],
                sender: "admin", // ✅ Store as admin message
            });

            console.log("✅ Reply sent successfully");
            setReplies({ ...replies, [userId]: "" }); // Clear input after sending
            fetchMessages(); // Refresh messages after sending reply
        } catch (error) {
            console.error("❌ Error sending reply:", error);
        }
    };

    return (
        <div className="admin-chat">
            <h2>Admin Chat</h2>
            {messages.length > 0 ? (
                <table className="chat-table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Messages</th>
                            <th>Reply</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.map(([userId, data]) => (
                            <tr key={userId}>
                                <td>{data.username || "Unknown User"}</td>
                                <td>{data.messages}</td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Reply..."
                                        value={replies[userId] || ""}
                                        onChange={(e) => handleReplyChange(userId, e.target.value)}
                                    />
                                    <button onClick={() => sendReply(userId)}>Send</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No messages yet.</p>
            )}
        </div>
    );
};

export default AdminChat;
