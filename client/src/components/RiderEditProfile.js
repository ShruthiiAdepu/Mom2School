import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RiderDashboard.css";
import "../styles/RiderEditProfile.css";

const RiderEditProfile = () => {
  const navigate = useNavigate();

  // ✅ State for form fields
  const [formData, setFormData] = useState({
    fullName: "Rajesh Kumar",
    mobile: "9876543210",
    email: "rakesh.rider@example.com",
    dob: "1990-05-15",
    city: "Hyderabad",
    area: "Kukatpally",
    languages: "Telugu, Hindi, English",
    vehicleType: "bike",
    vehicleModel: "Hero Splendor",
    regNumber: "TS09AB1234",
    licenseNumber: "TS-2020-1234567890",
    licenseValid: "2030-03-15",
    expertise: "Madhapur, Kukatpally, Ameerpet",
    otherSkills: "",
  });

  const [skills, setSkills] = useState([
    "Route Planning",
    "GPS Navigation",
    "Time Management",
    "Basic Repairs",
    "Communication",
  ]);

  const [experience, setExperience] = useState([
    { company: "Swiggy", duration: "2 Years" },
    { company: "Rapido", duration: "1.5 Years" },
  ]);

  const [notifications, setNotifications] = useState([]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Experience handling
  const addExperience = () => {
    if (experience.length < 3) {
      setExperience([...experience, { company: "", duration: "" }]);
    } else {
      showNotification("Maximum of 3 work experience entries allowed.", "error");
    }
  };

  const removeExperience = (index) => {
    if (experience.length > 1) {
      setExperience(experience.filter((_, i) => i !== index));
    } else {
      showNotification("You need at least one work experience entry.", "error");
    }
  };

  const updateExperience = (index, field, value) => {
    const updated = [...experience];
    updated[index][field] = value;
    setExperience(updated);
  };

  // ✅ Skill checkbox handling
  const toggleSkill = (skill) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter((s) => s !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };

  // ✅ Notification helper
  const showNotification = (message, type) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  };

  // ✅ Form validation
  const validateForm = () => {
    const requiredFields = [
      "fullName",
      "mobile",
      "email",
      "dob",
      "city",
      "area",
      "languages",
      "vehicleType",
      "vehicleModel",
      "regNumber",
      "licenseNumber",
      "licenseValid",
      "expertise",
    ];
    for (let field of requiredFields) {
      if (!formData[field] || !formData[field].trim()) {
        showNotification("Please fill all required fields", "error");
        return false;
      }
    }
    return true;
  };

  // ✅ Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      showNotification("Profile updated successfully!", "success");
      setTimeout(() => navigate("/rider-dashboard"), 1500);
    }
  };

  // ✅ Cancel handler
  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel? Changes will be lost.")) {
      navigate("/rider-dashboard");
    }
  };

  // ✅ File Upload Handler (simulated)
  const handleFileUpload = (e, docType) => {
    const file = e.target.files[0];
    if (file) {
      showNotification(`${docType} updated successfully!`, "success");
    }
  };

  return (
    <div>
      {/* Header */}
      <header className="navbar">
        <div className="logo-container">
          <div className="logo">Mom2School</div>
          <div className="rider-status">
            <span className="status-indicator active"></span>
          </div>
        </div>
        <nav>
          <ul className="nav-links">
            <li><a href="/rider-dashboard"><i className="fas fa-home"></i> Back</a></li>
            <li><a href="/r-mypickups"><i className="fas fa-box-open"></i> My Pickups</a></li>
            <li><a href="/r-earnings"><i className="fa-solid fa-indian-rupee-sign"></i> Earnings</a></li>
          </ul>
        </nav>
      </header>

      {/* Form */}
      <main className="edit-profile-container">
        <h1><i className="fas fa-user-edit"></i> Edit Profile</h1>

        <form onSubmit={handleSubmit}>
          {/* Personal Info */}
          <section className="form-section">
            <h2><i className="fas fa-user"></i> Personal Information</h2>
            <div className="form-grid">
              {[
                { label: "Full Name*", name: "fullName", type: "text" },
                { label: "Mobile Number*", name: "mobile", type: "tel" },
                { label: "Email ID*", name: "email", type: "email" },
                { label: "Date of Birth*", name: "dob", type: "date" },
                { label: "City*", name: "city", type: "text" },
                { label: "Area/Locality*", name: "area", type: "text" },
                { label: "Languages Spoken*", name: "languages", type: "text" },
              ].map((field) => (
                <div className="form-group" key={field.name}>
                  <label>{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Vehicle Info */}
          <section className="form-section">
            <h2><i className="fas fa-motorcycle"></i> Vehicle Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Vehicle Type*</label>
                <select
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Vehicle</option>
                  <option value="bike">Bike</option>
                  <option value="scooter">Scooter</option>
                  <option value="ebike">E-Bike</option>
                  <option value="escooter">E-Scooter</option>
                </select>
              </div>
              {[
                { label: "Vehicle Model*", name: "vehicleModel" },
                { label: "Registration Number*", name: "regNumber" },
                { label: "Driving License Number*", name: "licenseNumber" },
                { label: "License Valid Till*", name: "licenseValid", type: "date" },
              ].map((f) => (
                <div className="form-group" key={f.name}>
                  <label>{f.label}</label>
                  <input
                    type={f.type || "text"}
                    name={f.name}
                    value={formData[f.name]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Work Experience */}
          <section className="form-section">
            <h2><i className="fas fa-briefcase"></i> Work Experience</h2>
            {experience.map((exp, idx) => (
              <div key={idx} className="experience-entry">
                <input
                  type="text"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => updateExperience(idx, "company", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Duration"
                  value={exp.duration}
                  onChange={(e) => updateExperience(idx, "duration", e.target.value)}
                />
                <button type="button" onClick={() => removeExperience(idx)}>
                  <i className="fas fa-minus"></i>
                </button>
              </div>
            ))}
            <button type="button" onClick={addExperience} className="add-btn">
              <i className="fas fa-plus"></i> Add Experience
            </button>
            <div className="form-group full-width">
              <label>Area Expertise* (comma separated)</label>
              <input
                type="text"
                name="expertise"
                value={formData.expertise}
                onChange={handleChange}
                required
              />
            </div>
          </section>

          {/* Skills */}
          <section className="form-section">
            <h2><i className="fas fa-star"></i> Skills</h2>
            <div className="skills-checkboxes">
              {[
                "Route Planning",
                "GPS Navigation",
                "Time Management",
                "Basic Repairs",
                "Communication",
                "Safety",
              ].map((skill) => (
                <label key={skill}>
                  <input
                    type="checkbox"
                    checked={skills.includes(skill)}
                    onChange={() => toggleSkill(skill)}
                  />{" "}
                  {skill}
                </label>
              ))}
            </div>
            <div className="form-group">
              <label>Other Skills</label>
              <input
                type="text"
                name="otherSkills"
                value={formData.otherSkills}
                onChange={handleChange}
              />
            </div>
          </section>

          {/* Documents */}
          <section className="form-section">
            <h2><i className="fas fa-file-alt"></i> Documents</h2>
            {["Aadhar Card", "PAN Card", "Driving License", "Vehicle RC"].map(
              (doc) => (
                <div className="document-upload" key={doc}>
                  <label>{doc}*</label>
                  <div className="upload-container">
                    <span className="document-status verified">
                      <i className="fas fa-check-circle"></i> Verified
                    </span>
                    <input
                      type="file"
                      style={{ display: "none" }}
                      id={doc}
                      onChange={(e) => handleFileUpload(e, doc)}
                    />
                    <button
                      type="button"
                      className="upload-btn"
                      onClick={() => document.getElementById(doc).click()}
                    >
                      Update
                    </button>
                  </div>
                </div>
              )
            )}
          </section>

          {/* Actions */}
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="submit-profile">
              Save Profile Changes
            </button>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer>
        &copy; 2025 Mom2School. All rights reserved.<br />
        mom2school@gmail.com | +4642324546
      </footer>

      {/* Notifications */}
      <div className="notifications-container">
        {notifications.map((n) => (
          <div key={n.id} className={`notification ${n.type}`}>
            <i
              className={`fas ${
                n.type === "success" ? "fa-check-circle" : "fa-exclamation-circle"
              }`}
            ></i>
            <span>{n.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiderEditProfile;
