import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RiderProfileSetup.css';

const RiderProfileSetup = () => {
  const [experienceFields, setExperienceFields] = useState([{ company: '', duration: '' }]);
  // const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  // Add experience rows
  const handleAddExperience = () => {
    if (experienceFields.length < 3) {
      setExperienceFields([...experienceFields, { company: '', duration: '' }]);
    } else {
      alert('Maximum of 3 experience entries allowed');
    }
  };

  // Handle typing in experience inputs
  const handleExperienceChange = (index, field, value) => {
    const updated = [...experienceFields];
    updated[index][field] = value;
    setExperienceFields(updated);
  };

  // Handle form submission
 const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = {
  personal: {
    fullName: document.getElementById("fullName").value,
    mobile: document.getElementById("mobile").value,
    email: document.getElementById("email").value,
    dob: new Date(document.getElementById("dob").value),       // convert to Date
    city: document.getElementById("city").value,
    area: document.getElementById("area").value,
    languages: document.getElementById("languages").value
      ? document.getElementById("languages").value.split(",").map(l => l.trim())
      : [],
  },
  vehicle: {
    type: document.getElementById("vehicleType").value,
    model: document.getElementById("vehicleModel").value,
    regNumber: document.getElementById("regNumber").value,
    licenseNumber: document.getElementById("licenseNumber").value,
    licenseValid: new Date(document.getElementById("licenseValid").value), // convert to Date
  },
  experience: experienceFields,
  expertise: document.getElementById("expertise").value
    ? document.getElementById("expertise").value.split(",").map(e => e.trim())
    : [],
  skills: Array.from(document.querySelectorAll('input[name="skills"]:checked')).map(s => s.value),
  otherSkills: document.getElementById("otherSkills").value || "",
  documents: {
    aadhar: document.getElementById("aadhar").files[0]?.name || "",
    pan: document.getElementById("pan").files[0]?.name || "",
    licenseCopy: document.getElementById("licenseCopy").files[0]?.name || "",
    vehicleRC: document.getElementById("vehicleRC").files[0]?.name || "",
  },
};


  try {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/api/rider", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log("✅ Rider profile stored successfully!");
      navigate("/rider-dashboard");
    } else {
      const data = await response.json();
      alert("Error: " + data.message);
    }
  } catch (err) {
    console.error("Error saving rider profile:", err);
    alert("Something went wrong. Check console for details.");
  }
};

 

  return (
    <div>
      {/* Header */}
      <header className="navbar">
        <h1 className="logo">Mom2School</h1>
      </header>

      {/* Main Body */}
      <main className="main-content">
        <div className="profile-container">
          <div className="profile-header">
            <h2><i className="fas fa-user-cog"></i> Rider Profile Setup</h2>
          </div>
          <p className="setup-info">Complete your profile to start accepting deliveries</p>

          <form className="profile-form" onSubmit={handleSubmit} noValidate>
            {/* Personal Information */}
            <fieldset className="form-section">
              <legend><i className="fas fa-user"></i> Personal Information</legend>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name*</label>
                  <input type="text" id="fullName" name="fullName" required placeholder="Full Name" />
                </div>
                <div className="form-group">
                  <label htmlFor="mobile">Mobile Number*</label>
                  <input type="tel" id="mobile" name="mobile" required placeholder="xxxxxxxxxx" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email ID*</label>
                  <input type="email" id="email" name="email" required placeholder="xxx@example.com" />
                </div>
                <div className="form-group">
                  <label htmlFor="dob">Date of Birth*</label>
                  <input type="date" id="dob" name="dob" required />
                </div>
                <div className="form-group">
                  <label htmlFor="city">City*</label>
                  <input type="text" id="city" name="city" required placeholder="Hyderabad" />
                </div>
                <div className="form-group">
                  <label htmlFor="area">Area/Locality*</label>
                  <input type="text" id="area" name="area" required placeholder="Kukatpally" />
                </div>
                <div className="form-group full-width">
                  <label htmlFor="languages">Languages Spoken* (comma separated)</label>
                  <input type="text" id="languages" name="languages" required placeholder="Telugu, Hindi, English" />
                </div>
              </div>
            </fieldset>

            {/* Vehicle Information */}
            <fieldset className="form-section">
              <legend><i className="fas fa-motorcycle"></i> Vehicle Information</legend>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="vehicleType">Vehicle Type*</label>
                  <select id="vehicleType" name="vehicleType" required>
                    <option value="">Select Vehicle</option>
                    <option value="bike">Bike</option>
                    <option value="scooter">Scooter</option>
                    <option value="ebike">E-Bike</option>
                    <option value="escooter">E-Scooter</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="vehicleModel">Vehicle Model*</label>
                  <input type="text" id="vehicleModel" name="vehicleModel" required placeholder="Hero Splendor" />
                </div>
                <div className="form-group">
                  <label htmlFor="regNumber">Registration Number*</label>
                  <input type="text" id="regNumber" name="regNumber" required placeholder="TS09AB1234" />
                </div>
                <div className="form-group">
                  <label htmlFor="licenseNumber">Driving License Number*</label>
                  <input type="text" id="licenseNumber" name="licenseNumber" required placeholder="TS-2020-1234567890" />
                </div>
                <div className="form-group">
                  <label htmlFor="licenseValid">License Valid Till*</label>
                  <input type="date" id="licenseValid" name="licenseValid" required />
                </div>
              </div>
            </fieldset>

            {/* Work Experience */}
            <fieldset className="form-section">
              <legend><i className="fas fa-briefcase"></i> Work Experience</legend>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Previous Delivery Experience (Add up to 3)</label>
                  {experienceFields.map((exp, index) => (
                    <div className="experience-entry" key={index}>
                      <input
                        type="text"
                        placeholder="Company (e.g., Swiggy)"
                        value={exp.company}
                        onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Duration (e.g., 2 Years)"
                        value={exp.duration}
                        onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
                      />
                      {index === experienceFields.length - 1 && (
                        <button type="button" className="add-experience" onClick={handleAddExperience}>
                          <i className="fas fa-plus"></i>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="form-group full-width">
                  <label htmlFor="expertise">Area Expertise* (comma separated)</label>
                  <input type="text" id="expertise" name="expertise" required placeholder="Madhapur, Kukatpally, Ameerpet" />
                </div>
              </div>
            </fieldset>

            {/* Documents */}
            <fieldset className="form-section">
              <legend><i className="fas fa-file-alt"></i> Documents Upload</legend>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="aadhar">Aadhar Card*</label>
                  <input type="file" id="aadhar" name="aadhar" accept="image/*,.pdf" required />
                </div>
                <div className="form-group">
                  <label htmlFor="pan">PAN Card*</label>
                  <input type="file" id="pan" name="pan" accept="image/*,.pdf" required />
                </div>
                <div className="form-group">
                  <label htmlFor="licenseCopy">Driving License Copy*</label>
                  <input type="file" id="licenseCopy" name="licenseCopy" accept="image/*,.pdf" required />
                </div>
                <div className="form-group">
                  <label htmlFor="vehicleRC">Vehicle RC Copy*</label>
                  <input type="file" id="vehicleRC" name="vehicleRC" accept="image/*,.pdf" required />
                </div>
              </div>
            </fieldset>

            {/* Skills */}
            <fieldset className="form-section">
              <legend><i className="fas fa-star"></i> Skills</legend>
              <div className="skills-container">
                <div className="skills-checkboxes">
                  <label><input type="checkbox" name="skills" value="Route Planning" /> Route Planning</label>
                  <label><input type="checkbox" name="skills" value="GPS Navigation" /> GPS Navigation</label>
                  <label><input type="checkbox" name="skills" value="Time Management" /> Time Management</label>
                  <label><input type="checkbox" name="skills" value="Basic Repairs" /> Basic Vehicle Repairs</label>
                  <label><input type="checkbox" name="skills" value="Communication" /> Good Communication</label>
                  <label><input type="checkbox" name="skills" value="Safety" /> Safety Conscious</label>
                </div>
                <div className="form-group">
                  <label htmlFor="otherSkills">Other Skills</label>
                  <input type="text" id="otherSkills" name="otherSkills" placeholder="Add any other skills you have" />
                </div>
              </div>
            </fieldset>

            

            {/* Submit */}
            <div className="form-actions">
              <button type="submit" className="submit-profile">Save Profile</button>
            </div>
          </form>
        </div>
      </main>

      {/* Modal */}
      {/* {modalVisible && (
        <div className="modal-overlay" onClick={() => setModalVisible(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3><i className="fas fa-check-circle"></i> Success</h3>
            </div>
            <div className="modal-body">
              <p>Profile setup complete!</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn ok-btn" onClick={handleModalClose}>OK</button>
            </div>
          </div>
        </div>
      )} */}

      {/* Footer */}
      <footer>
        &copy; 2025 Mom2School. All rights reserved.<br />
        mom2school@gmail.com | +4642324546 |<br />
        Follow us on
        <div className="social-icons">
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram" style={{ color: '#e1306c' }}></i></a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook" style={{ color: '#1877f2' }}></i></a>
        </div>
      </footer>
    </div>
  );
};

export default RiderProfileSetup;
