import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { 
  FaHome, FaSignOutAlt, FaBicycle, FaMapMarkerAlt, FaSchool, 
  FaClock, FaMotorcycle, FaStar, FaCheckCircle, FaCheck, 
  FaArrowLeft, FaArrowRight 
} from "react-icons/fa";
import '../styles/ParentBookRider.css';

const ParentBookRider = () => {
  const [selectedRider, setSelectedRider] = useState("Rajesh Kumar");
  const [addresses, setAddresses] = useState({ schoolAddress: {}, pickupAddress: {} });
  const navigate = useNavigate();

  // ✅ Fetch school and pickup addresses from MongoDB
  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) return;

  fetch("http://localhost:5000/api/parent/addresses", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Fetched addresses:", data);
      setAddresses(data);
    })
    .catch((err) => console.error("Failed to load addresses:", err));
}, []);




  const riders = [
    {
      name: "Rajesh Kumar",
      vehicle: "Bike • DL 4S AB 1234",
      dl: "DL0420150032456",
      match: "95%",
      eta: "10:15 AM",
      rating: "4.8",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      experience: "5 years with Mom2School",
      trust: "98% (250+ deliveries)",
      feedback: "Always on time and careful with lunchboxes",
    },
    {
      name: "Amit Sharma",
      vehicle: "Scooter • DL 6S CD 5678",
      dl: "DL0620180045678",
      match: "85%",
      eta: "10:20 AM",
      rating: "4.6",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      experience: "3 years (2 with Mom2School)",
      trust: "94% (180+ deliveries)",
      feedback: "Polite and follows instructions well",
    },
    {
      name: "Priya Singh",
      vehicle: "Bike • DL 2S EF 9012",
      dl: "DL0220190056789",
      match: "90%",
      eta: "10:25 AM",
      rating: "4.9",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      experience: "4 years (3 with Mom2School)",
      trust: "97% (300+ deliveries)",
      feedback: "Very careful with fragile containers",
    },
  ];

  const confirmBooking = () => {
    if (!selectedRider) {
      alert("Please select a rider first!");
      return;
    }
    navigate('/parent-dashboard');
  };

  return (
    <div>
      {/* Navbar */}
      <header className="navbar">
        <h1 className="logo">Mom2School</h1>
        <nav>
          <ul className="nav-links">
            <li><a href="/"><FaHome /> Home</a></li>
            <li><a href="/"><FaSignOutAlt /> Logout</a></li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="book-rider-container">
        <div className="page-header">
          <h2><FaBicycle /> Book a Rider</h2>
          <p>Available riders for your route</p>
        </div>

        {/* ✅ Dynamic Route Info */}
        <div className="route-info">
          <div className="route-detail">
            <FaMapMarkerAlt />
            <div>
              <h4>Pickup From</h4>
              <p>
                {addresses.pickupAddress?.address1
                  ? `${addresses.pickupAddress.address1}, ${addresses.pickupAddress.locality}`
                  : "Loading pickup address..."}
              </p>
            </div>
          </div>

          <div className="route-detail">
            <FaSchool />
            <div>
              <h4>Deliver To</h4>
              <p>
                {addresses.schoolAddress?.address1
                  ? `${addresses.schoolAddress.address1}, ${addresses.schoolAddress.locality}`
                  : "Loading school address..."}
              </p>
            </div>
          </div>

          <div className="route-detail">
            <FaClock />
            <div>
              <h4>Estimated Time</h4>
              <p>10:00 AM - 10:30 AM</p>
            </div>
          </div>
        </div>

        {/* Riders */}
        <div className="riders-list">
          <h3><FaMotorcycle /> Available Riders</h3>
          {riders.map((rider, idx) => (
            <div
              key={idx}
              className={`rider-card ${selectedRider === rider.name ? "selected" : ""}`}
              onClick={() => setSelectedRider(rider.name)}
            >
              <div className="rider-info">
                <div className="rider-avatar">
                  <img src={rider.avatar} alt={rider.name} />
                  <span className="rating"><FaStar /> {rider.rating}</span>
                </div>
                <div className="rider-details">
                  <h4>{rider.name} <span className="verified-badge"><FaCheckCircle /> Verified</span></h4>
                  <p><FaBicycle /> {rider.vehicle}</p>
                  <p><i className="fas fa-id-card"></i> DL No: {rider.dl}</p>
                  <p><i className="fas fa-route"></i> Matches {rider.match} of your route</p>
                  <p><FaClock /> ETA: {rider.eta}</p>
                  <div className="rider-more-info">
                    <p><strong>Experience:</strong> {rider.experience}</p>
                    <p><strong>Trust Score:</strong> {rider.trust}</p>
                    <p><strong>Feedback:</strong> "{rider.feedback}"</p>
                  </div>
                </div>
              </div>
              <div className="rider-actions">
                <button className={`select-rider-btn ${selectedRider === rider.name ? "selected" : ""}`}>
                  {selectedRider === rider.name ? (<><FaCheckCircle /> Selected</>) : (<><FaCheck /> Select</>)}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="booking-actions">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Back
          </button>
          <button className="confirm-btn" onClick={confirmBooking}>
            Confirm Booking <FaArrowRight />
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer>
        &copy; 2025 Mom2School. All rights reserved.<br />
        <a href="mailto:mom2school@gmail.com">mom2school@gmail.com</a> | +4642324546 |<br />
        Follow us on
        <div className="social-icons">
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <i className="fab fa-instagram" style={{ color: "#e1306c" }}></i>
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <i className="fab fa-facebook" style={{ color: "#1877f2" }}></i>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default ParentBookRider;
