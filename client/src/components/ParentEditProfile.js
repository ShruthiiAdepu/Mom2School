import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaCalendarDay,
  FaClipboardList,
  FaUser,
  FaUserEdit,
  FaSignOutAlt,
  FaChild,
  FaSchool,
  FaGraduationCap,
  FaUsers,
  FaUserTie,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCrosshairs,
  FaCrown,
  FaCalendarAlt,
  FaRupeeSign,
  FaStar,
  FaCheckCircle,
  FaBicycle,
  FaMedal,
  FaBriefcase,
  FaIdCard,
  FaHistory,
  FaTrophy,
  FaFileAlt,
  FaCar,
  FaEdit,
  FaUserCircle,
} from "react-icons/fa";
import "../styles/ParentEditProfile.css";

const initialProfile = {
  childName: "Aanya Sharma",
  childSchool: "Delhi Public School",
  childClass: "5",
  childSection: "B",
  parentName: "Aditi Sharma",
  parentContact: "+91 9876543210",
  parentEmail: "parent@example.com",
  pickupStreet: "xyz",
  pickupLocality: "xyz",
};

const ParentEditProfile = () => {
  const [profile, setProfile] = useState({ ...initialProfile });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({ ...initialProfile });
  const [notification, setNotification] = useState("");

  useEffect(() => {
  const fetchParentProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("http://localhost:5000/api/parent", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        console.error("Failed to fetch parent profile");
        return;
      }

      const data = await res.json();
      console.log("Fetched parent profile:", data);
      setProfile(data);
      setEditForm(data); // preload in modal too
    } catch (err) {
      console.error("Error fetching parent profile:", err);
    }
  };

  fetchParentProfile();
}, []);


  const handleEditOpen = () => {
    setEditForm({ ...profile });
    setEditModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm((f) => ({ ...f, [name]: value }));
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    setProfile({ ...editForm });
    setEditModalOpen(false);
    setNotification("Profile updated successfully!");
    setTimeout(() => setNotification(""), 3000);
    document.body.style.overflow = "auto";
  };

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div>
      {/* Header */}
      <header className="navbar">
        <h1 className="logo">Mom2School</h1>
        <nav>
          <ul className="nav-links">
            <li>
              <a href="/parent-dashboard">
                <FaHome /> Home
              </a>
            </li>
            <li>
              <a href="/parent-todays-pickup">
                <FaCalendarDay /> Today's Pickup
              </a>
            </li>
            <li>
              <a href="/parent-primary">
                <FaClipboardList /> Primary
              </a>
            </li>
            <li className="profile-menu">
              <button className="profile-btn">
                <FaUser />
              </button>
              <div className="profile-dropdown">
                <a href="/parent-editprofile" className="dropdown-item">
                  <FaUserEdit /> Edit Profile
                </a>
                <a href="/logout" className="dropdown-item">
                  <FaSignOutAlt /> Sign Out
                </a>
              </div>
            </li>
          </ul>
        </nav>
      </header>

      {/* Profile Overview */}
      <main className="profile-container">
        <div className="profile-header">
          <h2>
            <FaUserCircle /> Parent & Child Profile Overview
          </h2>
          <button className="edit-btn" onClick={handleEditOpen}>
            <FaEdit /> Edit Profile
          </button>
        </div>
        <div className="profile-content">
          {/* Left Column */}
          <div className="profile-column">
            <section className="profile-section">
              <div className="section-header">
                <FaChild />
                <h3>Child Details</h3>
              </div>
              <div className="detail-item child-name">
                <FaUser />
                <p><strong>Child Name:</strong> {profile.child?.name}</p>
              </div>
              <div className="detail-item child-school">
                <FaSchool />
                <p><strong>School Name:</strong> {profile.child?.schoolName}</p>
              </div>
              <div className="detail-item child-class">
                <FaGraduationCap />
                <p><strong>Class:</strong> {profile.child?.class}</p>
              </div>
              <div className="detail-item child-section">
                <FaUsers />
                <p><strong>Section:</strong> {profile.child?.section}</p>
              </div>
            </section>
            <section className="profile-section">
              <div className="section-header">
                <FaUserTie />
                <h3>Parent Details</h3>
              </div>
              <div className="detail-item parent-name">
                <FaUser />
                <p><strong>Parent Name:</strong> {profile.parentContact?.name}</p>
              </div>
              <div className="detail-item parent-contact">
                <FaPhone />
                <p><strong>Phone:</strong> {profile.parentContact?.phone}</p>
              </div>
              <div className="detail-item parent-email">
                <FaEnvelope />
                <p><strong>Email:</strong> {profile.parentContact?.email}</p>
              </div>
            </section>
            <section className="profile-section">
              <div className="section-header">
                <FaHome />
                <h3>Pickup Address</h3>
              </div>
              <div className="detail-item pickup-street">
                <FaMapMarkerAlt />
                <p><strong>Street Address:</strong> {profile.pickupAddress?.address1}</p>
              </div>
              <div className="detail-item pickup-locality">
                <FaCrosshairs />
                <p><strong>Locality:</strong> {profile.pickupAddress?.locality}</p>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="profile-column">
            <section className="profile-section subscription">
              <div className="section-header">
                <FaCrown />
                <h3>Subscription Details</h3>
              </div>
              <div className="detail-item">
                <FaCalendarAlt />
                <p>
                  <strong>Plan Selected:</strong> 6 Months
                </p>
              </div>
              <div className="detail-item">
                <FaRupeeSign />
                <p>
                  <strong>Cost:</strong> ₹3300
                </p>
              </div>
              <div className="detail-item">
                <FaStar />
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="status-active">Active</span>
                </p>
              </div>
              <div className="features">
                <h4>
                  <FaCheckCircle /> Features:
                </h4>
                <ul>
                  <li>Daily lunchbox pickup & delivery</li>
                  <li>Priority support</li>
                  <li>Monthly pickup reports</li>
                  <li>5% discount</li>
                </ul>
              </div>
            </section>
            <section className="profile-section rider-section">
              <div className="section-header">
                <FaBicycle />
                <h3>Assigned Rider</h3>
              </div>
              <div className="rider-compact-container">
                <div className="rider-compact-profile">
                  <div className="rider-photo">
                    <img
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="Rajesh Kumar"
                    />
                    <div className="rider-rating">
                      <FaStar /> 4.8
                    </div>
                  </div>
                  <div className="rider-main-info">
                    <h4>
                      Rajesh Kumar{" "}
                      <span className="verified-badge">
                        <FaCheckCircle /> Verified
                      </span>
                    </h4>
                    <div className="rider-stats">
                      <span>
                        <FaBicycle /> Bike
                      </span>
                      <span>
                        <FaMedal /> 98% Trust
                      </span>
                      <span>
                        <FaBriefcase /> 5 yrs
                      </span>
                    </div>
                  </div>
                </div>
                <div className="rider-details-grid">
                  <div className="detail-item">
                    <FaIdCard />
                    <div>
                      <p className="detail-label">DL Number</p>
                      <p>DL0420150032456</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <FaBicycle />
                    <div>
                      <p className="detail-label">Vehicle</p>
                      <p>Bike (DL 4S AB 1234)</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <FaTrophy />
                    <div>
                      <p className="detail-label">Deliveries</p>
                      <p>250+ with Mom2School</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <FaHistory />
                    <div>
                      <p className="detail-label">Experience</p>
                      <p>Since 2017 (7 years)</p>
                    </div>
                  </div>
                </div>
                <div className="rider-documents-compact">
                  <h4>
                    <FaFileAlt /> Documents
                  </h4>
                  <div className="documents-horizontal">
                    <div className="document-compact">
                      <div className="doc-icon">
                        <FaIdCard />
                      </div>
                      <p>Driver License</p>
                    </div>
                    <div className="document-compact">
                      <div className="doc-icon">
                        <FaCar />
                      </div>
                      <p>Vehicle RC</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      {/* Edit Profile Modal */}
      {editModalOpen && (
        <div className="modal" onClick={handleEditClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span
              className="close-modal"
              style={{ cursor: "pointer" }}
              onClick={handleEditClose}
            >
              &times;
            </span>
            <h2>
              <FaUserEdit /> Edit Profile
            </h2>
            <form onSubmit={handleProfileSave}>
              <div className="modal-columns">
                <div className="modal-column">
                  <h3>
                    <FaChild /> Child Details
                  </h3>
                  <div className="form-group">
                    <label htmlFor="child-name">Name:</label>
                    <input
                      type="text"
                      id="child-name"
                      name="childName"
                      value={editForm.childName}
                      onChange={handleEditFormChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="child-school">School:</label>
                    <input
                      type="text"
                      id="child-school"
                      name="childSchool"
                      value={editForm.childSchool}
                      onChange={handleEditFormChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="child-class">Class:</label>
                    <input
                      type="text"
                      id="child-class"
                      name="childClass"
                      value={editForm.childClass}
                      onChange={handleEditFormChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="child-section">Section:</label>
                    <input
                      type="text"
                      id="child-section"
                      name="childSection"
                      value={editForm.childSection}
                      onChange={handleEditFormChange}
                    />
                  </div>
                </div>
                <div className="modal-column">
                  <h3>
                    <FaUserTie /> Parent Details
                  </h3>
                  <div className="form-group">
                    <label htmlFor="parent-name">Name:</label>
                    <input
                      type="text"
                      id="parent-name"
                      name="parentName"
                      value={editForm.parentName}
                      onChange={handleEditFormChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="parent-contact">Contact Number:</label>
                    <input
                      type="tel"
                      id="parent-contact"
                      name="parentContact"
                      value={editForm.parentContact}
                      onChange={handleEditFormChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="parent-email">Email:</label>
                    <input
                      type="email"
                      id="parent-email"
                      name="parentEmail"
                      value={editForm.parentEmail}
                      onChange={handleEditFormChange}
                    />
                  </div>
                  <h3>
                    <FaHome /> Pickup Address
                  </h3>
                  <div className="form-group">
                    <label htmlFor="pickup-street">Street Address:</label>
                    <input
                      type="text"
                      id="pickup-street"
                      name="pickupStreet"
                      value={editForm.pickupStreet}
                      onChange={handleEditFormChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pickup-locality">Locality:</label>
                    <input
                      type="text"
                      id="pickup-locality"
                      name="pickupLocality"
                      value={editForm.pickupLocality}
                      onChange={handleEditFormChange}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-buttons">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleEditClose}
                >
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  <FaCheckCircle /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {notification && (
        <div className="notification show">
          <FaCheckCircle />
          {notification}
          <button className="close-btn" onClick={() => setNotification("")}>
            &times;
          </button>
        </div>
      )}
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

export default ParentEditProfile;
