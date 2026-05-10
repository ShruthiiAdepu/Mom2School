import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBoxOpen, FaUserCircle, FaCalendarDay, FaClipboardList, FaUser, FaUserEdit, FaSignOutAlt, FaStar, FaBiking, FaClock, FaTemperatureLow, FaCalendarAlt, FaQuestionCircle, FaShieldAlt, FaUserCheck, FaMapMarkerAlt, FaHandsWash, FaLock, FaCertificate, FaPlusCircle } from 'react-icons/fa';
import '../styles/RiderDashboard.css';
import '../styles/RiderMyPickups.css';

const RiderMyPickups = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState(() => new Date().toISOString().split('T')[0]);

  // Initialize Google Map
  useEffect(() => {
    function initMap() {
      const map = new window.google.maps.Map(document.getElementById('pickupMap'), {
        center: { lat: 12.9716, lng: 77.5946 },
        zoom: 12,
      });

      const locations = [
        { lat: 12.9716, lng: 77.5946, title: 'Start Point', icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png' },
        { lat: 12.9352, lng: 77.6245, title: 'Rohan Sharma', icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png' },
        { lat: 12.9279, lng: 77.6271, title: 'Priya Patel', icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png' },
        { lat: 12.9784, lng: 77.6408, title: 'Arjun Reddy', icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png' },
        { lat: 12.9667, lng: 77.5667, title: 'National Public School', icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png' },
      ];

      locations.forEach((location) => {
        new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: map,
          title: location.title,
          icon: location.icon,
        });
      });

      const routeCoordinates = [
        { lat: 12.9716, lng: 77.5946 },
        { lat: 12.9352, lng: 77.6245 },
        { lat: 12.9279, lng: 77.6271 },
        { lat: 12.9784, lng: 77.6408 },
        { lat: 12.9667, lng: 77.5667 },
      ];

      const routePath = new window.google.maps.Polyline({
        path: routeCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 3,
      });

      routePath.setMap(map);
    }

    if (window.google) {
      initMap();
    }
  }, []);

  // Pickup data
  const [pickups, setPickups] = useState([
    {
      id: '#PK-2023-001',
      student: 'Rohan Sharma',
      address: '123 MG Road, Bangalore',
      time: '7:30 AM',
      school: 'National Public School',
      status: 'pending',
    },
    {
      id: '#PK-2023-002',
      student: 'Priya Patel',
      address: '456 Brigade Road, Bangalore',
      time: '7:45 AM (Completed at 7:42 AM)',
      school: 'National Public School',
      status: 'completed',
    },
    {
      id: '#PK-2023-003',
      student: 'Arjun Reddy',
      address: '789 Koramangala, Bangalore',
      time: '8:00 AM',
      school: 'National Public School',
      status: 'pending',
    },
  ]);

  // Filter pickups
  const filteredPickups = pickups.filter((p) => {
    const showByStatus = statusFilter === 'all' || p.status === statusFilter;
    // dateFilter logic can be applied here if pickup has a date field
    return showByStatus;
  });

  // Confirm pickup handler
  const confirmPickup = (id) => {
    setPickups((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: 'completed', time: p.time + ' (Confirmed)' } : p
      )
    );
    alert('Pickup confirmed successfully!');
  };

  // Contact parent handler
  const contactParent = (student) => {
    alert(`Calling parent of ${student}\nIn a real app, this would initiate a call or show contact details.`);
  };

  return (
    <div>
      {/* Header */}
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

      {/* Main Content */}
      <main className="pickups-container">
        <h1><i className="fas fa-box-open"></i> My Pickups</h1>

        {/* Actions */}
        <div className="pickup-actions">
          <button className="btn btn-primary" id="viewRouteBtn" onClick={() => alert('Opening full route view with turn-by-turn navigation')}>
            <i className="fas fa-route"></i> View Today's Route
          </button>
          <button className="btn btn-secondary" id="reportIssueBtn" onClick={() => alert('Opening issue reporting form')}>
            <i className="fas fa-exclamation-circle"></i> Report Issue
          </button>
        </div>

        {/* Map Section */}
        <div className="map-container">
          <div id="pickupMap" style={{ width: '100%', height: '300px' }}></div>
          <div className="map-legend">
            <div><span className="legend-icon start"></span> Start Point</div>
            <div><span className="legend-icon school"></span> School</div>
            <div><span className="legend-icon pickup"></span> Pickup Location</div>
          </div>
        </div>

        {/* Pickup List */}
        <div className="pickup-list-container">
          <div className="filter-controls">
            <select id="statusFilter" className="form-control" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All Pickups</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="missed">Missed</option>
            </select>
            <input type="date" id="dateFilter" className="form-control" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
          </div>

          <div className="pickup-list">
            {filteredPickups.map((pickup) => (
              <div key={pickup.id} className={`pickup-card ${pickup.status}`}>
                <div className="pickup-info">
                  <h3>{pickup.id}</h3>
                  <p><i className="fas fa-user"></i> Student: {pickup.student}</p>
                  <p><i className="fas fa-map-marker-alt"></i> Address: {pickup.address}</p>
                  <p><i className="fas fa-clock"></i> Time: {pickup.time}</p>
                  <p><i className="fas fa-school"></i> School: {pickup.school}</p>
                </div>
                {pickup.status === 'pending' ? (
                  <div className="pickup-actions">
                    <button className="btn btn-sm btn-confirm" onClick={() => confirmPickup(pickup.id)}>
                      <i className="fas fa-check"></i> Confirm Pickup
                    </button>
                    <button className="btn btn-sm btn-contact" onClick={() => contactParent(pickup.student)}>
                      <i className="fas fa-phone"></i> Contact Parent
                    </button>
                  </div>
                ) : (
                  <div className="pickup-status">
                    <span className="status-badge completed">
                      <i className="fas fa-check-circle"></i> Completed
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer>
        &copy; 2025 Mom2School. All rights reserved.<br />
        mom2school@gmail.com | +4642324546 |<br />
        Follow us on
        <div className="social-icons">
          <a href="https://www.instagram.com/" target="_blank" aria-label="Instagram">
            <i className="fab fa-instagram" style={{ color: '#e1306c' }}></i>
          </a>
          <a href="https://www.facebook.com/" target="_blank" aria-label="Facebook">
            <i className="fab fa-facebook" style={{ color: '#1877f2' }}></i>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default RiderMyPickups;
