import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateAccountPage.css';
import { registerAPI } from '../../services/allAPI';

const CreateAccountPage = () => {
  // State hooks to store form data and messages
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const { username, email, password } = userData;

    // Input validation
    if (!username || !email || !password) {
      setError("Please fill out all fields correctly.");
      setSuccess('');
      return;
    }

    setError('');
    setLoading(true); // Set loading to true

    try {
      const result = await registerAPI(userData);
      if (result.status === 200) {
        setSuccess(`${result.data.username} is registered successfully`);
        setError('');
        setUserData({
          username: "",
          email: "",
          password: ""
        });
        alert("Registration Successfull!!!")
        setLoading(false); // Reset loading
        navigate("/login");
      } else {
        alert("Registration failed!!!")
        setError(result.data.message || "Registration failed.");
        setLoading(false); // Reset loading
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during registration.");
      setSuccess('');
      setLoading(false); // Reset loading
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  return (
    <div className="create-account-container">
      <h2>Create Account</h2>

      {/* Display success or error messages */}
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      {/* Registration form */}
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="username">Name:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="create-account-btn"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      {/* Link to the login page */}
      <div className="login-link">
        <span onClick={() => navigate('/login')}>Already have an account? Login</span>
      </div>
    </div>
  );
};

export default CreateAccountPage;
