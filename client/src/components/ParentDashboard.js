import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaCalendarDay, FaClipboardList, FaUser, FaUserEdit, FaSignOutAlt, FaStar, FaBiking, FaClock, FaTemperatureLow, FaCalendarAlt, FaQuestionCircle, FaShieldAlt, FaUserCheck, FaMapMarkerAlt, FaHandsWash, FaLock, FaCertificate, FaPlusCircle } from 'react-icons/fa';
import '../styles/ParentDashboard.css';

const ParentDashboard = () => {
  useEffect(() => {
    // Mobile menu toggle simulation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Because hamburger doesn't exist in this markup, skipping toggle behavior.

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const onScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll);

    // Simulate loading animations
    const animateElements = document.querySelectorAll('.stat-card, .status-card, .schedule-card, .action-card');
    animateElements.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.animation = `fadeInUp 0.5s ease forwards ${i * 0.1}s`;
    });

    // Cleanup on unmount
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

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
      <li><Link to="/"><FaHome /> Home</Link></li>
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


      {/* Main Dashboard */}
      <main className="dashboard-container">
        {/* Welcome section */}
        <section className="welcome">
          <h2>Welcome to Mom2School, <span id="parent-name">Mom & Dad</span>!</h2>
          <p>Your daily lunch delivery assistant – designed for parents who care but can't always be there.</p>
        </section>
          {/* Benefits */}
        <section className="dashboard-section benefits">
            <div className="section-header">
              <h3><FaStar /> Why Choose Mom2School?</h3>
              <p className="section-subtitle">Reliable school lunch delivery service</p>
            </div>
            <div className="benefit-cards">
              <div className="card">
                <div className="card-icon"><FaBiking /></div>
                <h4>No Daily Rush</h4>
                <p>We handle the delivery logistics so you don't have to</p>
              </div>
              <div className="card">
                <div className="card-icon"><FaClock /></div>
                <h4>On-Time Every Time</h4>
                <p>Punctual pickups based on school lunch timings</p>
              </div>
              <div className="card">
                <div className="card-icon"><FaTemperatureLow /></div>
                <h4>Safe & Fresh</h4>
                <p>Lunch delivered with temperature care</p>
              </div>
              <div className="card">
                <div className="card-icon"><FaCalendarAlt /></div>
                <h4>Flexible Plans</h4>
                <p>Monthly or custom schedules available</p>
              </div>
            </div>
        </section>

          {/* How It Works */}
        <section className="dashboard-section how-it-works">
            <div className="section-header">
              <h3><FaQuestionCircle /> How It Works</h3>
              <p className="section-subtitle">Simple three-step process</p>
            </div>
            <div className="steps-container">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Prepare Lunch</h4>
                  <p>Pack your child's lunch by the scheduled pickup time</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Rider Pickup</h4>
                  <p>Our verified rider collects from your doorstep</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>School Delivery</h4>
                  <p>Delivered fresh to your child at school</p>
                </div>
              </div>
            </div>
        </section>

          {/* Trust & Safety */}
        <section className="dashboard-section trust">
            <div className="section-header">
              <h3><FaShieldAlt /> Safety & Assurance</h3>
              <p className="section-subtitle">Your peace of mind is our priority</p>
            </div>
            <div className="trust-content">
              <div className="trust-features">
                <div className="feature"><FaUserCheck /><span>Background-checked riders</span></div>
                <div className="feature"><FaMapMarkerAlt /><span>Real-time tracking</span></div>
                <div className="feature"><FaHandsWash /><span>Contactless pickup</span></div>
                <div className="feature"><FaLock /><span>Secure payments</span></div>
              </div>
              <div className="trust-badge">
                <div className="badge-icon"><FaCertificate /></div>
                <p>100% satisfaction guarantee on all deliveries</p>
              </div>
            </div>
        </section>

          {/* Quick Actions */}
        <section className="quick-actions">
            {/* <a href="#" className="action-button primary"><FaPlusCircle /> Schedule New Delivery</a> */}
            {/* <a href="#" className="action-button secondary"><FaCalendarDay /> View Today's Pickup</a> */}
        </section>

      </main>

      {/* Footer */}
      <footer>
        &copy; 2025 Mom2School. All rights reserved.<br />
        mom2school@gmail.com | +4642324546 |<br />
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

export default ParentDashboard;
