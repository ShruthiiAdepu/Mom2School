import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setIsLoading(true);

  if (formData.password !== formData.confirmPassword) {
    setError('Passwords do not match');
    setIsLoading(false);
    return;
  }

  try {
    const API_BASE = "http://localhost:5000/api"; // 👈 backend base URL

    // Send signup data to backend
const response = await fetch(`${API_BASE}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role: formData.role,
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Signup failed");
    }

    // ✅ Save token & user to localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    // ✅ Navigate based on role
    if (data.user.role === "parent") {
      navigate('/parent-register-plan');
    } else if (data.user.role === "rider") {
      navigate('/rider-profile-setup');
    }

  } catch (err) {
    console.error("Signup error:", err);
    setError(err.message || "Failed to sign up. Please try again.");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="signup-container">
      {/* Navbar */}
      <header className="navbar">
        <h1 className="logo">Mom2School</h1>
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/">
                <i className="fas fa-home"></i>
                <span> Home</span>
              </Link>
            </li>
            {/* <li>
              <a href="#how-it-works">
                <i className="fas fa-info-circle"></i>
                <span> How It Works</span>
              </a>
            </li>
            <li>
              <Link to="/login">
                <i className="fas fa-sign-in-alt"></i>
                <span> Login</span>
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <i className="fas fa-user-plus"></i>
                <span> Sign Up</span>
              </Link>
            </li> */}
          </ul>
        </nav>
      </header>

      {/* Clean Centered Sign Up Form */}
      <main className="signup-wrapper">
        <div className="signup-box">
          <h2>Create Account</h2>
          <p>Sign up to start delivering comfort</p>

          {error && (
            <div className="error-message">{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <select
              name="role"
              className="role-dropdown"
              required
              value={formData.role}
              onChange={handleChange}
            >
              <option value="" disabled>Select your role</option>
              <option value="parent">Parent</option>
              <option value="rider">Rider</option>
            </select>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <button type="submit" className="form-button" disabled={isLoading}>
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </button>
          </form>

          <p className="form-footer">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer>
        &copy; 2025 Mom2School. All rights reserved.<br />
        <a href="mailto:mom2school@gmail.com"></a>mom2school@gmail.com | +4642324546 |<br />
        Follow us on

        <div className="social-icons">
          {/* Instagram */}
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#e1306c" viewBox="0 0 24 24">
              <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 2 .2 2.5.4.6.2 1.1.5 1.6 1 .5.5.8 1 .9 1.6.2.5.3 1.3.4 2.5.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 2-.4 2.5-.2.6-.5 1.1-1 1.6s-1 .8-1.6.9c-.5.2-1.3.3-2.5.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-2-.2-2.5-.4-.6-.2-1.1-.5-1.6-1-.5-.5-.8-1-.9-1.6-.2-.5-.3-1.3-.4-2.5C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-2 .4-2.5.2-.6.5-1.1 1-1.6.5-.5 1-.8 1.6-.9.5-.2 1.3-.3 2.5-.4C8.4 2.2 8.8 2.2 12 2.2M12 0C8.7 0 8.3 0 7 .1 5.7.2 4.6.5 3.7 1.1c-.9.6-1.7 1.4-2.3 2.3C.5 4.6.2 5.7.1 7 .1 8.3 0 8.7 0 12s.1 3.7.1 5c.1 1.3.4 2.4 1 3.3.6.9 1.4 1.7 2.3 2.3.9.6 2 1 3.3 1.1 1.3.1 1.7.1 5 .1s3.7 0 5-.1c1.3-.1 2.4-.4 3.3-1.1.9-.6 1.7-1.4 2.3-2.3.6-.9 1-2 1.1-3.3.1-1.3.1-1.7.1-5s0-3.7-.1-5c-.1-1.3-.4-2.4-1-3.3-.6-.9-1.4-1.7-2.3-2.3C19.4.5 18.3.2 17 .1 15.7 0 15.3 0 12 0zM12 5.8c-3.4 0-6.2 2.8-6.2 6.2s2.8 6.2 6.2 6.2 6.2-2.8 6.2-6.2-2.8-6.2-6.2-6.2zm0 10.2c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm6.4-10.8c0 .8-.6 1.4-1.4 1.4S15.6 6 15.6 5.2s.6-1.4 1.4-1.4 1.4.6 1.4 1.4z"/>
            </svg>
          </a>

          {/* Facebook */}
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#1877f2" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35C.596 0 0 .597 0 1.333v21.333C0 23.403.596 24 1.325 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.597 1.325-1.334V1.333C24 .597 23.404 0 22.675 0z"/>
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Signup;
