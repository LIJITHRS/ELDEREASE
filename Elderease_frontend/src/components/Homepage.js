import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoCard from './VideoCard'; // Component for displaying tutorials
import './HomePage.css';

const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [tutorials, setTutorials] = useState([]);
    const [filteredTutorials, setFilteredTutorials] = useState([]);
    const [showChat, setShowChat] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState('');

    // ✅ Fetch user ID and username from local storage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('userId');
        const storedUsername = localStorage.getItem('username');

        if (storedUser) {
            setUserId(storedUser);
            setUsername(storedUsername || "User");
        }
        fetchTutorials();
    }, []);

    // ✅ Fetch tutorials
    const fetchTutorials = async () => {
        try {
            const response = await axios.get('http://localhost:5000/tutorials');
            setTutorials(response.data);
        } catch (error) {
            console.error("❌ Error fetching tutorials:", error);
        }
    };

    // ✅ Search functionality
    const searchTutorials = (query) => {
        setSearchQuery(query);
        if (query.trim() === '') {
            setFilteredTutorials([]);
        } else {
            setFilteredTutorials(
                tutorials.filter(tutorial =>
                    tutorial.title.toLowerCase().includes(query.toLowerCase())
                )
            );
        }
    };

    // ✅ Voice Search
    const startVoiceSearch = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Speech Recognition is not supported in this browser.");
            return;
        }

        try {
            const recognition = new SpeechRecognition();
            recognition.lang = 'en-US';
            recognition.start();

            recognition.onresult = (event) => {
                const rawQuery = event.results[0][0].transcript;
                const formattedQuery = rawQuery
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                    
                setSearchQuery(formattedQuery);
                searchTutorials(formattedQuery);
            };
            

            recognition.onerror = (event) => {
                alert(`Speech Recognition Error: ${event.error}`);
            };
        } catch (error) {
            alert("An error occurred while using Speech Recognition.");
        }
    };

    // ✅ Fetch chat history when chat opens
    useEffect(() => {
        if (showChat && userId) {
            fetchMessages();
        }
    }, [showChat, userId]);

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/messages/${userId}`);
            setMessages(response.data);
        } catch (error) {
            console.error("❌ Error fetching chat history:", error);
        }
    };

    // ✅ Send message and update chat in real-time
    const sendMessage = async () => {
        if (!userId) {
            alert("You must be logged in to send messages.");
            return;
        }

        if (newMessage.trim() === '') return;

        const messageData = { userId, sender: username, text: newMessage };

        // Update UI instantly
        setMessages([...messages, messageData]);
        setNewMessage('');

        try {
            await axios.post('http://localhost:5000/send', messageData);
            fetchMessages(); // ✅ Fetch latest messages including admin replies
        } catch (error) {
            console.error("❌ Error sending message:", error);
        }
    };

    return (
        <div className="home-page">
            <video autoPlay loop muted className="bg-video">
                <source src="/assets/home.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => searchTutorials(e.target.value)}
                    placeholder="Search tutorials..."
                />
                <button className="voice-btn" onClick={startVoiceSearch}>🎙️</button>
            </div>

            {searchQuery.trim() !== '' && (
                <div className="tutorial-cards">
                    {filteredTutorials.length === 0 ? (
                        <p className="text-red-600 text-center">No tutorials found.</p>
                    ) : (
                        filteredTutorials.map(tutorial => (
                            <VideoCard key={tutorial._id} videoId={tutorial.videoId} title={tutorial.title} />
                        ))
                    )}
                </div>
            )}

            <button className="chat-button" onClick={() => setShowChat(!showChat)}>💬 Chat with Admin</button>

            {showChat && (
                <div className="chatbox">
                    <div className="chat-header">
                        <span>Chat with Admin</span>
                        <button onClick={() => setShowChat(false)}>✖</button>
                    </div>
                    <div className="chat-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={msg.sender === username ? "user-msg" : "admin-msg"}>
                                <strong>{msg.sender}: </strong>{msg.text}
                            </div>
                        ))}
                    </div>
                    <div className="chat-input">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message..."
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;
