import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminNavbar from './components/Admin/AdminNavbar'; // Import Admin Navbar
import AddEvent from './components/User/AddEvent';
import HomePage from './components/Homepage.js';
import ContactUs from './components/ContactUs';
import Adminhome from './components/Admin/Adminhome';
import CreateAccountPage from './components/Registration/CreateAccountPage';
import ForgotPasswordPage from './components/Registration/ForgotPasswordPage';
import LoginPage from './components/Registration/LoginPage';
import EventList from './components/EventList';
import ApprovedEvents from './components/Admin/ApproveEvents';
import Webinar from './components/User/Webinar';
import AdminTutorials from './components/Admin/AdminTutorials';
import Tutorials from './components/User/Tutorials';
import HealthResources from './components/User/HealthResourses';
import Article from './components/User/Article';
import AdminChat from './components/Admin/AdminChat';
import AddQuestion from './components/Admin/AddQuestion';
import DailyQuiz from './components/User/DailyQuiz';
import { UserProvider } from './context/userContext';
import AdminAnswers from './components/Admin/AdminAnswers';
import Groupchat from './components/User/Groupchat.jsx';
import GroupChatPage from './components/User/GroupChatPage.jsx';

const App = () => {
    const [userRole, setUserRole] = useState(localStorage.getItem("userRole")); // Get role from localStorage

    useEffect(() => {
        // Listen for changes in localStorage to update role dynamically
        const handleStorageChange = () => {
            setUserRole(localStorage.getItem("userRole"));
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    return (
        <UserProvider>
        <Router>
            {userRole === "admin" ? <AdminNavbar /> : <Navbar />} {/* Show the correct navbar */}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/create-account" element={<CreateAccountPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/add-event" element={<AddEvent />} />
                <Route path="/events" element={<EventList />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/approve-events" element={<ApprovedEvents />} />
                <Route path='/admin-dashboard' element={<Adminhome />} />
                <Route path='/user-webinar' element={<Webinar />} />
                <Route path='/admin-tutorials' element={<AdminTutorials />} />
                <Route path='/tutorials' element={<Tutorials/>}/>
                <Route path='/health' element={<HealthResources/>}/>
                <Route path='/articles' element={<Article/>}/>
                <Route path='/adminchat' element={<AdminChat/>}/>
                <Route path='/questions' element={<AddQuestion/>}/>
                <Route path='/dailyquiz' element={<DailyQuiz/>}/>
                <Route path='/answers' element={<AdminAnswers/>}/>
                <Route path='/groupchat' element={<Groupchat/>}/>
                <Route path='/groupchatpage' element={<GroupChatPage/>}/>
            </Routes>
        </Router>
        </UserProvider>
    );
};

export default App;
