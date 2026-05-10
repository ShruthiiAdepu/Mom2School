import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { FaHome, FaBoxOpen, FaUserCircle, FaCalendarDay, FaClipboardList, FaUser, FaUserEdit, FaSignOutAlt, FaStar, FaBiking, FaClock, FaTemperatureLow, FaCalendarAlt, FaQuestionCircle, FaShieldAlt, FaUserCheck, FaMapMarkerAlt, FaHandsWash, FaLock, FaCertificate, FaPlusCircle } from 'react-icons/fa';

// import { FaHome, FaBoxOpen, FaIndianRupeeSign, FaUserEdit, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import '../styles/RiderDashboard.css';

const RiderDashboard = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:5000/api/rider", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        console.log("Fetched rider profile:", data);
        setProfile(data);
      })
      .catch(err => console.error("Failed to fetch rider profile:", err));
  }, []);

  if (!profile) {
    return <div className="loading">Loading rider profile...</div>;
  }

  // Destructure with optional chaining to avoid undefined errors
  const personal = profile.personal || {};
const vehicle = profile.vehicle || {};
  const experience = profile.experience || [];
  const skills = profile.skills || [];
  const documents = profile.documents || {};
  return (
    <div>
      <header className="navbar">
  <div className="logo-container">
    <h1 className="logo">Mom2School</h1>
    <div className="user-status">
      <span className="status-indicator active"></span>
    </div>
  </div>

  <nav>
    <ul className="nav-links">
      <li>
        <Link to="/rider-dashboard">
          <FaHome /> Home
        </Link>
      </li>
      <li>
        <Link to="/r-mypickups">
          <FaBoxOpen /> My Pickups
        </Link>
      </li>
      <li>
        <Link to="/r-earnings">
          {/* <FaIndianRupeeSign /> */}
           Earnings
        </Link>
      </li>

      {/* Profile Dropdown */}
      <li className="profile-menu" tabIndex={0}>
        <button className="profile-btn">
          <FaUserCircle />
        </button>
        <ul className="profile-dropdown">
          <li className="dropdown-item">
            <Link to="/r-editprofile">
              <FaUserEdit /> Edit Profile
            </Link>
          </li>
          <li className="dropdown-item">
            <Link to="/">
              <FaSignOutAlt /> Logout
            </Link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</header>

      <main className="dashboard-container">
        <section className="welcome-banner">
          <div className="welcome-content">
            <h1>Welcome Back, {personal.fullName || "Rider"}!</h1>
            <p>You have <strong>3 scheduled pickups</strong> today. Your first pickup is at <strong>9:30 AM</strong>.</p>
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-header"><h2><i className="fas fa-user-tie"></i> Rider Profile</h2></div>
          <div className="profile-grid">
            
            {/* Personal Info */}
            <div className="profile-card">
              <div className="card-header"><i className="fas fa-user"></i><h3>Personal Information</h3></div>
              <div className="card-body">
                <div className="info-row"><span className="info-label">Full Name:</span><span className="info-value">{personal.fullName || "-"}</span></div>
                <div className="info-row"><span className="info-label">Contact:</span><span className="info-value">{personal.mobile || "-"}</span></div>
                <div className="info-row"><span className="info-label">Email:</span><span className="info-value">{personal.email || "-"}</span></div>
                <div className="info-row"><span className="info-label">Location:</span><span className="info-value">{personal.city || "-"}, {personal.area || "-"}</span></div>
                <div className="info-row"><span className="info-label">Languages:</span><span className="info-value">{(personal.languages || []).join(", ")}</span></div>
              </div>
            </div>

            {/* Vehicle Info */}
            <div className="profile-card">
              <div className="card-header"><i className="fas fa-motorcycle"></i><h3>Vehicle Information</h3></div>
              <div className="card-body">
                <div className="info-row"><span className="info-label">Vehicle Type:</span><span className="info-value">{vehicle.type || "-"} - {vehicle.model || "-"}</span></div>
                <div className="info-row"><span className="info-label">Reg. Number:</span><span className="info-value">{vehicle.regNumber || "-"}</span></div>
                <div className="info-row"><span className="info-label">License No.:</span><span className="info-value">{vehicle.licenseNumber || "-"}</span></div>
                <div className="info-row"><span className="info-label">License Valid:</span><span className="info-value">{vehicle.licenseValid || "-"}</span></div>
              </div>
            </div>

            {/* Work Experience */}
            <div className="profile-card">
              <div className="card-header"><i className="fas fa-briefcase"></i><h3>Work Experience</h3></div>
              <div className="card-body">
                {experience.map((exp, index) => (
                  <div className="experience-item" key={index}>
                    <span className="exp-company">{exp.company || "-"}</span>
                    <span className="exp-duration">{exp.duration || "-"}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills & Documents */}
            <div className="profile-card">
              <div className="card-header"><i className="fas fa-star"></i><h3>Skills & Documents</h3></div>
              <div className="card-body">
                <div className="skills-container">
                  {(skills || []).map((skill, i) => <span className="skill-tag" key={i}>{skill}</span>)}
                  {profile.otherSkills && <span className="skill-tag">{profile.otherSkills}</span>}
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="profile-card">
              <div className="card-header"><i className="fas fa-file-alt"></i><h3>Verified Documents</h3></div>
              <div className="card-body">
                {documents.aadhar && <div className="document-item verified"><i className="fas fa-id-card"></i><span>Aadhar Card</span></div>}
                {documents.pan && <div className="document-item verified"><i className="fas fa-credit-card"></i><span>PAN Card</span></div>}
                {documents.licenseCopy && <div className="document-item verified"><i className="fas fa-id-card-alt"></i><span>Driving License</span></div>}
                {documents.vehicleRC && <div className="document-item verified"><i className="fas fa-file"></i><span>Vehicle RC</span></div>}
              </div>
            </div>

          </div>
        </section>

        {/* Quick Tips */}
        <section className="dashboard-section tips-section">
          <div className="section-header"><h2><i className="fas fa-lightbulb"></i> Quick Tips</h2></div>
          <div className="tips-container">
            <div className="tip-card"><i className="fas fa-route"></i><p>Plan your route in advance to minimize travel time between pickups.</p></div>
            <div className="tip-card"><i className="fas fa-clock"></i><p>Confirm with parents 10 minutes before arriving at each location.</p></div>
            <div className="tip-card"><i className="fas fa-box-open"></i><p>Double-check each box is properly sealed before transport.</p></div>
            <div className="tip-card"><i className="fas fa-shield-alt"></i><p>Always wear your helmet and follow traffic rules.</p></div>
          </div>
        </section>

        
      </main>

      <footer>
        &copy; 2025 Mom2School. All rights reserved.<br />
        <a href="mailto:mom2school@gmail.com"></a>mom2school@gmail.com | +4642324546 |<br />
        Follow us on

        {/* Social Media Icons */}
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

export default RiderDashboard;
