import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import M2S from './components/M2S';
import Login from './components/Login';
import Signup from './components/Signup';
import ParentRegisterWithPlan from './components/ParentRegisterWithPlan';
import ParentBookRider from './components/ParentBookRider';
import ParentDashboard from './components/ParentDashboard';
import ParentTodaysPickup from './components/ParentTodaysPickup';
import ParentPrimary from './components/ParentPrimary';
import ParentEditProfile from './components/ParentEditProfile';
import RiderProfileSetup from './components/RiderProfileSetup';
import RiderDashboard from './components/RiderDashboard';
import RiderMyPickups from './components/RiderMyPickups';
import RiderEarnings from './components/RiderEarnings';
import RiderEditProfile from "./components/RiderEditProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<M2S />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/parent-register-plan" element={<ParentRegisterWithPlan />} />
        <Route path="/parent-book-rider" element={<ParentBookRider />} />
        <Route path="/parent-dashboard" element={<ParentDashboard />} />
        <Route path="/parent-todays-pickup" element={<ParentTodaysPickup />} />
        <Route path="/parent-primary" element={<ParentPrimary />} />
        <Route path="/parent-editprofile" element={<ParentEditProfile />} />
        <Route path="/rider-profile-setup" element={<RiderProfileSetup />} />
        <Route path="/rider-dashboard" element={<RiderDashboard/>} />
        <Route path="/r-mypickups" element={<RiderMyPickups />} />
        <Route path="/r-earnings" element={<RiderEarnings />} />
        <Route path="/r-editprofile" element={<RiderEditProfile />} />
      </Routes>
    </Router>
  );
}

export default App;