import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaCalendarDay, FaClipboardList, FaUser, FaUserEdit, FaSignOutAlt, FaClock, FaStar, FaBicycle, FaMedal, FaBriefcase, FaIdCard, FaHistory, FaLightbulb, FaDoorOpen, FaMapMarkedAlt, FaMapMarkerAlt, FaCalendarCheck, FaMotorcycle, FaHouseUser, FaCheckCircle, FaRoad, FaCheckDouble } from 'react-icons/fa';
import '../styles/ParentTodaysPickup.css'; // Assume you create style based on your CSS file

const ParentTodaysPickup = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [showCustomAlert, setShowCustomAlert] = useState(false);

  useEffect(() => {
    // Update current time initially and every minute
    function updateCurrentTime() {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setCurrentTime(timeString);
    }
    updateCurrentTime();
    const interval = setInterval(updateCurrentTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleLiveTrackingClick = () => {
    setShowCustomAlert(true);
  };

  const closeCustomAlert = () => {
    setShowCustomAlert(false);
  };


 return (
    <div>
      {/* Header */}
      <header className="navbar">
  <div className="logo-container">
    <h1 className="logo">Mom2School</h1>
    <div className="user-status"></div>
  </div>

  <nav>
    <ul className="nav-links">
      <li><Link to="/parent-dashboard"><FaHome /> Home</Link></li>
      <li><Link to="/parent-todays-pickup"><FaCalendarDay /> Today's Pickup</Link></li>
      <li><Link to="/parent-primary"><FaClipboardList /> Primary</Link></li>

      {/* Profile Dropdown */}
      <li className="profile-menu" tabIndex={0}>
        <button className="profile-btn">
          <i className="fas fa-user-circle"></i>
        </button>
        <ul className="profile-dropdown">
          <li className="dropdown-item">
            <Link to="/parent-editprofile">
              <i className="fas fa-user-edit"></i> Edit Profile
            </Link>
          </li>
          <li className="dropdown-item">
            <Link to="/">
              <i className="fas fa-sign-out-alt"></i> Logout
            </Link>
          </li>
        </ul>
      </li>

    </ul>
  </nav>
</header>

      <main className="main-content">
        <div className="content-container">
          <div className="main-area">
            <h2><FaClock /> Today's Pickup Schedule</h2>
            <p className="pickup-time">Your rider is scheduled for pickup at <strong>11:30 AM</strong></p>

            <div className="details-row">
              {/* Rider Card */}
              <div className="rider-card">
                <div className="rider-header">
                  <div className="rider-photo">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Rajesh Kumar" />
                    <div className="rider-rating"><FaStar /> 4.8</div>
                  </div>
                  <div className="rider-info">
                    <h3>Rajesh Kumar <span className="verified-badge"><FaCheckCircle /> Verified</span></h3>
                    <div className="rider-stats">
                      <span><FaBicycle /> Bike</span>
                      <span><FaMedal /> 98% Trust</span>
                      <span><FaBriefcase /> 5 yrs</span>
                    </div>
                  </div>
                </div>
                <div className="rider-details">
                  <div className="detail-item"><FaIdCard /><div><p className="detail-label">DL Number</p><p>DL0420150032456</p></div></div>
                  <div className="detail-item"><FaBicycle /><div><p className="detail-label">Vehicle</p><p>Honda Activa (DL 4S AB 1234)</p></div></div>
                  <div className="detail-item"><FaHistory /><div><p className="detail-label">Experience</p><p>Since 2017 (7 years)</p></div></div>
                </div>
              </div>

              {/* Tips Box */}
              <div className="tips-box">
                <h3><FaLightbulb /> Pickup Tips</h3>
                <ul>
                  <li><FaClock /> Ensure the lunch is packed by <strong>11:15 AM</strong></li>
                  <li><FaDoorOpen /> Leave the bag outside your main door if you're not available</li>
                  <li><FaMapMarkedAlt /> Track the rider live from the tracker</li>
                </ul>
              </div>
            </div>

            {/* Horizontal Tracker */}
            <div className="tracker-container">
              <h3><FaMapMarkerAlt /> Delivery Journey</h3>
              <p className="date-info">Friday, May 30, 2025</p>
              <div className="horizontal-tracker">
                <div className="step completed">
                  <div className="step-icon pulse-animation"><FaCalendarCheck /></div>
                  <div className="step-content">
                    <p className="step-title">Pickup Scheduled</p>
                    <p className="step-time">Completed at 11:30 AM</p>
                  </div>
                </div>
                <div className="step current">
                  <div className="step-icon pulse-animation"><FaMotorcycle /></div>
                  <div className="step-content">
                    <p className="step-title">Rider En Route</p>
                    <p className="step-time">Expected by 11:45 AM</p>
                    <p className="step-status"><i className="fas fa-location-dot"></i> Currently near MG Road</p>
                    <p className="current-time">Current time: {currentTime}</p>
                  </div>
                </div>
                <div className="step upcoming">
                  <div className="step-icon"><FaHouseUser /></div>
                  <div className="step-content">
                    <p className="step-title">At Parent's Home</p>
                    <p className="step-time">Expected by 12:15 PM</p>
                  </div>
                </div>
                <div className="step upcoming">
                  <div className="step-icon"><FaCheckCircle /></div>
                  <div className="step-content">
                    <p className="step-title">Pickup Done</p>
                    <p className="step-time">Expected by 12:20 PM</p>
                  </div>
                </div>
                <div className="step upcoming">
                  <div className="step-icon"><FaRoad /></div>
                  <div className="step-content">
                    <p className="step-title">On the Way to School</p>
                    <p className="step-time">Expected by 12:50 PM</p>
                  </div>
                </div>
                <div className="step upcoming">
                  <div className="step-icon"><FaCheckDouble /></div>
                  <div className="step-content">
                    <p className="step-title">Delivered</p>
                    <p className="step-time">Expected by 12:55 PM</p>
                  </div>
                </div>
              </div>
              <button className="live-track-btn pulse-animation" onClick={handleLiveTrackingClick}>
                <FaMapMarkedAlt /> View Live Tracking
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer>
        &copy; 2025 Mom2School. All rights reserved.<br />
        <a href="mailto:mom2school@gmail.com">mom2school@gmail.com</a> | +4642324546 |<br />
        Follow us on

        <div className="social-icons">
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#e1306c" viewBox="0 0 24 24">
              <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 2 .2 2.5.4.6.2 1.1.5 1.6 1 .5.5.8 1 .9 1.6.2.5.3 1.3.4 2.5.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 2-.4 2.5-.2.6-.5 1.1-1 1.6s-1 .8-1.6.9c-.5.2-1.3.3-2.5.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-2-.2-2.5-.4-.6-.2-1.1-.5-1.6-1-.5-.5-.8-1-.9-1.6-.2-.5-.3-1.3-.4-2.5C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-2 .4-2.5.2-.6.5-1.1 1-1.6.5-.5 1-.8 1.6-.9.5-.2 1.3-.3 2.5-.4C8.4 2.2 8.8 2.2 12 2.2M12 0C8.7 0 8.3 0 7 .1 5.7.2 4.6.5 3.7 1.1c-.9.6-1.7 1.4-2.3 2.3C.5 4.6.2 5.7.1 7 .1 8.3 0 8.7 0 12s.1 3.7.1 5c.1 1.3.4 2.4 1 3.3.6.9 1.4 1.7 2.3 2.3.9.6 2 1 3.3 1.1 1.3.1 1.7.1 5 .1s3.7 0 5-.1c1.3-.1 2.4-.4 3.3-1.1.9-.6 1.7-1.4 2.3-2.3.6-.9 1-2 1.1-3.3.1-1.3.1-1.7.1-5s0-3.7-.1-5c-.1-1.3-.4-2.4-1-3.3-.6-.9-1.4-1.7-2.3-2.3C19.4.5 18.3.2 17 .1 15.7 0 15.3 0 12 0zM12 5.8c-3.4 0-6.2 2.8-6.2 6.2s2.8 6.2 6.2 6.2 6.2-2.8 6.2-6.2-2.8-6.2-6.2-6.2zm0 10.2c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm6.4-10.8c0 .8-.6 1.4-1.4 1.4S15.6 6 15.6 5.2s.6-1.4 1.4-1.4 1.4.6 1.4 1.4z"/>
            </svg>
          </a>

          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#1877f2" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35C.596 0 0 .597 0 1.333v21.333C0 23.403.596 24 1.325 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.597 1.325-1.334V1.333C24 .597 23.404 0 22.675 0z"/>
            </svg>
          </a>
        </div>
      </footer>

      {/* Custom Alert */}
      {showCustomAlert && (
        <div className="custom-alert" onClick={closeCustomAlert}>
          <div className="custom-alert-content" onClick={e => e.stopPropagation()}>
            <p>Live tracking feature will be implemented soon!</p>
            <button className="custom-alert-btn" onClick={closeCustomAlert}>OK</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default ParentTodaysPickup;
