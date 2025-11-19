import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Hardcoded Admin Login (LocalStorage)
    if (email === 'admin@gmail.com' && password === 'admin123') {
        console.log('Admin login successful');
        alert('Welcome Admin!');
        
        // ✅ Store Admin Details in localStorage
        localStorage.setItem('token', 'hardcoded-admin-token'); // Dummy token
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('userEmail', email);

        // ✅ Log the stored token
        console.log("Stored Admin Token:", localStorage.getItem('token'));

        // Redirect to Admin Dashboard
        navigate('/admin-dashboard');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Login successful:', data);
            alert("Login successful!");
            console.log("Response Data:", data);

            // ✅ Ensure role is stored correctly (if available)
            const userRole = data.role || 'user'; // Default to 'user' if undefined

            // ✅ Store User Details in localStorage
            localStorage.setItem('token', data.token); // Store JWT token
            localStorage.setItem('userRole', userRole); // Store user role
            localStorage.setItem('userEmail', email); // Store email
            localStorage.setItem('userId', data.userId); // Store User ID if available

            // ✅ Log the stored token
            console.log("Stored User Token:", localStorage.getItem('token'));

            // ✅ Redirect user based on role
            if (userRole === 'admin') {
                navigate('/admin-dashboard');
            } else {
                navigate('/'); // Redirect normal users to homepage
            }
        } else {
            alert("Login failed!");
            console.error('Login failed:', data.message);
        }
    } catch (err) {
        console.error('Error:', err);
        alert('Something went wrong! Please try again.');
    }
};




  return (
    <div className='d-flex justify-center align-middle flex-1'>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>

        <div className="forgot-password">
        <span 
            className="create-account-link text-center" 
            onClick={() => navigate('/create-account')}
          >
            Create Account
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
