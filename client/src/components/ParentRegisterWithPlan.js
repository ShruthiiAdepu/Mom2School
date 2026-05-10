import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChild, FaUser, FaSchool, FaHome, FaCalendarCheck, FaCreditCard, FaArrowRight, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa6';
import '../styles/ParentRegisterWithPlan.css';

const RegisterWithPlan = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('Credit/Debit Card');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const steps = [
    { number: 1, label: 'Child Information' },
    { number: 2, label: 'Choose Plan' },
    { number: 3, label: 'Payment' }
  ];

  const plans = [
    {
      value: 'monthly',
      title: 'Monthly Plan',
      price: '₹600',
      period: '/month',
      features: [
        'Daily lunchbox pickup & delivery',
        'Basic support',
        'Weekly pickup summary'
      ],
      tag: 'Flexible'
    },
    {
      value: '6months',
      title: '6-Month Plan',
      price: '₹550',
      period: '/month',
      totalPrice: '₹3,300 total (save ₹300)',
      features: [
        'Daily lunchbox pickup & delivery',
        'Priority support',
        'Monthly pickup reports',
        '5% discount'
      ],
      tag: 'Most Popular',
      popular: true
    },
    {
      value: '12months',
      title: 'Annual Plan',
      price: '₹500',
      period: '/month',
      totalPrice: '₹6,000 total (save ₹1,200)',
      features: [
        'Daily lunchbox pickup & delivery',
        'Premium support',
        'Full-year pickup analytics',
        '15% discount',
        'Free one-month extension'
      ],
      tag: 'Best Value'
    }
  ];

  const paymentMethods = [
    { icon: <i className="fab fa-cc-visa"></i>, label: 'Credit/Debit Card' },
    { icon: <i className="fas fa-wallet"></i>, label: 'UPI' },
    { icon: <i className="fas fa-university"></i>, label: 'Net Banking' }
  ];

  const validateStep = (stepIndex) => {
    // In a real implementation, you would validate form inputs here
    if (stepIndex === 1 && !selectedPlan) {
      alert('Please select a subscription plan');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleStepClick = (index) => {
    if (index < currentStep) {
      setCurrentStep(index);
    }
  };

  const handlePlanSelect = (planValue) => {
    setSelectedPlan(planValue);
  };

  const handlePaymentSelect = (method) => {
    setSelectedPayment(method);
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = {
    child: {
      name: document.getElementById("childName").value,
      schoolName: document.getElementById("schoolName").value,
      class: document.getElementById("class").value,
      section: document.getElementById("section").value
    },
    parentContact: {
      name: document.getElementById("parentName").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("contact").value
    },
    schoolAddress: {
      address1: document.getElementById("address1").value,
      address2: document.getElementById("address2").value,
      landmark: document.getElementById("landmark").value,
      locality: document.getElementById("locality").value
    },
    pickupAddress: {
      address1: document.getElementById("pickupAddress1").value,
      address2: document.getElementById("pickupAddress2").value,
      landmark: document.getElementById("pickupLandmark").value,
      locality: document.getElementById("pickupLocality").value
    },
    plan: selectedPlan,
    payment: {
      method: selectedPayment,
      cardName: document.getElementById("cardName").value,
      last4Digits: document.getElementById("cardNumber").value.slice(-4),
      expiryDate: document.getElementById("expiryDate").value
    }
  };

  try {
    // ✅ get JWT token from localStorage
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/api/parent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ include token
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log("✅ Parent profile stored successfully!");
      navigate("/parent-book-rider");
    } else {
      const data = await response.json();
      alert("Error: " + data.message);
    }
  } catch (err) {
    console.error("Error submitting parent form:", err);
    alert("Something went wrong. Check console for details.");
  }
};






  const getOrderSummary = () => {
    switch(selectedPlan) {
      case 'monthly':
        return {
          plan: 'Monthly Plan',
          subtotal: '₹600',
          discount: '-₹0',
          total: '₹600'
        };
      case '6months':
        return {
          plan: '6-Month Plan',
          subtotal: '₹3,300',
          discount: '-₹300',
          total: '₹3,000'
        };
      case '12months':
        return {
          plan: 'Annual Plan',
          subtotal: '₹6,000',
          discount: '-₹1,200',
          total: '₹4,800'
        };
      default:
        return {
          plan: '6-Month Plan',
          subtotal: '₹3,300',
          discount: '-₹300',
          total: '₹3,000'
        };
    }
  };

  const orderSummary = getOrderSummary();

  return (
    <div>
      {/* Header */}
      <header className="navbar">
        <h1 className="logo">Mom2School</h1>
        <nav>
          {/* <ul className="nav-links">
            <li><a href="M2S.html"><FaChevronLeft /> Back</a></li>
          </ul> */}
        </nav>
      </header>

      {/* Registration & Plan Form */}
      <main className="form-container">
        <div className="progress-steps">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`step ${index <= currentStep ? 'active' : ''}`}
              data-step={index + 1}
              onClick={() => handleStepClick(index)}
            >
              <div className="step-number">{step.number}</div>
              <div className="step-label">{step.label}</div>
            </div>
          ))}
        </div>

        <h2 className="main-heading">Register Your Child</h2>
        <p className="subheading">Complete these simple steps to get started with our lunch delivery service</p>
        
        <form id="registrationForm" onSubmit={handleSubmit} noValidate>
          {/* Step 1: Child Information */}
          <div className={`form-step ${currentStep === 0 ? 'active' : ''}`} id="step1">
            <div className="form-section">
              <h3><FaChild /> Child Details</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="childName">Child's Full Name*</label>
                  <input type="text" id="childName" name="childName" required placeholder="Enter child's name" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="schoolName">School Name*</label>
                  <input type="text" id="schoolName" name="schoolName" required placeholder="Enter school name" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="class">Class/Grade*</label>
                  <input type="text" id="class" name="class" required placeholder="e.g., 3rd Grade" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="section">Section</label>
                  <input type="text" id="section" name="section" placeholder="e.g., A, B, etc." />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3><FaUser /> Parent Contact Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="parentName">Parent Name*</label>
                  <input type="text" id="parentName" name="parentName" required placeholder="Enter parent's name" />
                </div>
                <div className="form-group">
                  <label htmlFor="contact">Phone Number*</label>
                  <input type="tel" id="contact" name="contact" required placeholder="+91 9876543210" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address*</label>
                  <input type="email" id="email" name="email" required placeholder="your@email.com" />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3><FaSchool /> School Address</h3>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label htmlFor="address1">Street Address*</label>
                  <input type="text" id="address1" name="address1" required placeholder="House number and street name" />
                </div>
                
                <div className="form-group full-width">
                  <label htmlFor="address2">Address Line 2</label>
                  <input type="text" id="address2" name="address2" placeholder="Apartment, suite, unit, building, floor, etc." />
                </div>
                
                <div className="form-group">
                  <label htmlFor="landmark">Landmark</label>
                  <input type="text" id="landmark" name="landmark" placeholder="Nearby prominent location" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="locality">Locality*</label>
                  <input type="text" id="locality" name="locality" required placeholder="Your neighborhood" />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3><FaHome /> Pickup Address</h3>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label htmlFor="pickupAddress1">Street Address*</label>
                  <input type="text" id="pickupAddress1" name="pickupAddress1" required placeholder="House number and street name" />
                </div>
                
                <div className="form-group full-width">
                  <label htmlFor="pickupAddress2">Address Line 2</label>
                  <input type="text" id="pickupAddress2" name="pickupAddress2" placeholder="Apartment, suite, unit, building, floor, etc." />
                </div>
                
                <div className="form-group">
                  <label htmlFor="pickupLandmark">Landmark</label>
                  <input type="text" id="pickupLandmark" name="pickupLandmark" placeholder="Nearby prominent location" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="pickupLocality">Locality*</label>
                  <input type="text" id="pickupLocality" name="pickupLocality" required placeholder="Your neighborhood" />
                </div>
              </div>
            </div>

            <div className="form-navigation">
              <button type="button" className="next-btn" onClick={handleNext}>
                Next: Choose Plan <FaArrowRight />
              </button>
            </div>
          </div>

          {/* Step 2: Subscription Plans */}
          <div className={`form-step ${currentStep === 1 ? 'active' : ''}`} id="step2">
            <h3><FaCalendarCheck /> Select a Subscription Plan</h3>
            <p>Choose the plan that works best for your family's needs</p>
            
            <div className="plans-grid">
              {plans.map((plan, index) => (
                <label key={index} className={`plan-card ${plan.popular ? 'popular' : ''}`}>
                  <input 
                    type="radio" 
                    name="plan" 
                    value={plan.value} 
                    required 
                    checked={selectedPlan === plan.value}
                    onChange={() => handlePlanSelect(plan.value)}
                  />
                  <div className="plan-content">
                    <h4>{plan.title}</h4>
                    <p className="price">{plan.price} <span>{plan.period}</span></p>
                    {plan.totalPrice && <p className="total-price">{plan.totalPrice}</p>}
                    <ul className="plan-features">
                      {plan.features.map((feature, i) => (
                        <li key={i}><FaCheckCircle /> {feature}</li>
                      ))}
                    </ul>
                    <div className="plan-footer">
                      <span className="best-value">{plan.tag}</span>
                    </div>
                  </div>
                </label>
              ))}
            </div>

            <div className="form-navigation">
              <button type="button" className="prev-btn" onClick={handlePrev}>
                <FaArrowLeft /> Back
              </button>
              <button type="button" className="next-btn" onClick={handleNext}>
                Next: Payment <FaArrowRight />
              </button>
            </div>
          </div>

          {/* Step 3: Payment */}
          <div className={`form-step ${currentStep === 2 ? 'active' : ''}`} id="step3">
            <h3><FaCreditCard /> Payment Information</h3>
            <p>Secure payment processed through Razorpay</p>
            
            <div className="payment-container">
              <div className="payment-methods">
                {paymentMethods.map((method, index) => (
                  <div 
                    key={index}
                    className={`payment-method ${selectedPayment === method.label ? 'active' : ''}`}
                    onClick={() => handlePaymentSelect(method.label)}
                  >
                    {method.icon}
                    <span>{method.label}</span>
                  </div>
                ))}
              </div>
              
              <div className="payment-form">
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input type="text" id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <input type="text" id="expiryDate" name="expiryDate" placeholder="MM/YY" />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input type="text" id="cvv" name="cvv" placeholder="123" />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="cardName">Name on Card</label>
                  <input type="text" id="cardName" name="cardName" placeholder="Your Name" />
                </div>
              </div>
              
              <div className="order-summary">
                <h4>Order Summary</h4>
                <div className="summary-item">
                  <span>Plan:</span>
                  <span id="summary-plan">{orderSummary.plan}</span>
                </div>
                <div className="summary-item">
                  <span>Subtotal:</span>
                  <span>{orderSummary.subtotal}</span>
                </div>
                <div className="summary-item">
                  <span>Discount:</span>
                  <span>{orderSummary.discount}</span>
                </div>
                <div className="summary-item total">
                  <span>Total:</span>
                  <span>{orderSummary.total}</span>
                </div>
              </div>
            </div>

            <div className="form-navigation">
              <button type="button" className="prev-btn" onClick={handlePrev}>
                <FaArrowLeft /> Back
              </button>
              <button type="button" className="submit-btn" onClick={handleSubmit}>
                Complete Registration <FaCheckCircle />
              </button>
            </div>
          </div>
        </form>
      </main>


      {/* Footer */}
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

export default RegisterWithPlan;