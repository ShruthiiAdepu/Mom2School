import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaCalendarDay, FaClipboardList, FaClock, FaUser, FaUserEdit, FaSignOutAlt, FaHistory, FaBell, FaMotorcycle, FaCheckCircle, FaInfoCircle, FaMapMarkerAlt, FaTimesCircle } from 'react-icons/fa';
import '../styles/ParentPrimary.css';

const ParentPrimary = () => {
  const [date, setDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('11:30');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [customAlertMessage, setCustomAlertMessage] = useState('');
  const [notificationPrefs, setNotificationPrefs] = useState({
    statusUpdates: true,
    riderAssigned: true,
    promotions: false,
    announcements: true
  });
  const [deliveryFilter, setDeliveryFilter] = useState('all');
  const deliveryNotesRef = useRef(null);

  const deliveryHistory = [
    {
      id: 1,
      date: new Date(2025,5,15),
      title: 'Lunch Delivery to School',
      timeRange: '11:30 AM - 12:45 PM',
      status: 'completed',
      statusText: 'Delivered successfully',
      riderName: 'Rajesh Kumar',
      riderImg: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: 2,
      date: new Date(2025,5,14),
      title: 'Lunch Delivery to School',
      timeRange: '11:30 AM - 12:45 PM',
      status: 'cancelled',
      statusText: 'Cancelled (School holiday)',
      riderName: 'Rajesh Kumar',
      riderImg: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: 3,
      date: new Date(2025,5,13),
      title: 'Lunch Delivery to School',
      timeRange: '11:30 AM - 12:45 PM',
      status: 'completed',
      statusText: 'Delivered successfully',
      riderName: 'Rajesh Kumar',
      riderImg: 'https://randomuser.me/api/portraits/men/32.jpg',
    }
  ];

  const filteredHistory = deliveryHistory.filter(item => {
    if (deliveryFilter === 'all') return true;
    if (deliveryFilter === 'completed') return item.status === 'completed';
    if (deliveryFilter === 'cancelled') return item.status === 'cancelled';
    if (deliveryFilter === 'month') return true;
    if (deliveryFilter === 'week') return true;
    return true;
  });

  const showCustomAlert = (message) => {
    setCustomAlertMessage(message);
  };

  const closeCustomAlert = () => {
    setCustomAlertMessage('');
  };

  const handleScheduleDelivery = () => {
    if (!date) {
      showCustomAlert('Please select a delivery date');
      return;
    }
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    const formattedTime = formatTime(deliveryTime);
    const notes = deliveryNotes || 'None';

    showCustomAlert(`Delivery scheduled for:\n\n${formattedDate} at ${formattedTime}\n\nNotes: ${notes}`);

    setDeliveryNotes('');
    if (deliveryNotesRef.current) deliveryNotesRef.current.value = '';
  };

  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':');
    const hourNum = parseInt(hours);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const handleSavePrefs = () => {
    console.log('Saved preferences:', notificationPrefs);
    showCustomAlert('Notification preferences saved successfully!');
  };

  const togglePref = (key) => {
    setNotificationPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDetailClick = (delivery) => {
    const dateStr = delivery.date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    const status = delivery.statusText;
    const rider = delivery.riderName;
    showCustomAlert(`Delivery Details:\n\nDate: ${dateStr}\nStatus: ${status}\nRider: ${rider}`);
  };

  const handleViewAllNotifications = () => {
    showCustomAlert('This would show all notifications in a separate view');
  };

  // Find minimum and maximum date for the picker
  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 14);

  const formatDateForInput = (dateObj) => {
    if (!dateObj) return '';
    const yyyy = dateObj.getFullYear();
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
    const dd = String(dateObj.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
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
        <div className="dashboard-container">
          {/* Left Column */}
          <div className="left-column">
            <section className="dashboard-section">
              <h2><FaHistory /> Delivery History</h2>
              <div className="delivery-history">
                <div className="history-filter">
                  <select id="history-filter" value={deliveryFilter} onChange={e => setDeliveryFilter(e.target.value)}>
                    <option value="all">All Deliveries</option>
                    <option value="month">This Month</option>
                    <option value="week">This Week</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="history-list">
                  {filteredHistory.map(delivery => (
                    <div key={delivery.id} className={`delivery-item ${delivery.status}`} style={{ display: 'flex' }}>
                      <div className="delivery-date">
                        <span className="day">{delivery.date.getDate()}</span>
                        <span className="month">{delivery.date.toLocaleString('en-US', { month: 'short' })}</span>
                      </div>
                      <div className="delivery-info">
                        <h3>{delivery.title}</h3>
                        <p className="delivery-time"><FaClock /> {delivery.timeRange}</p>
                        <p className="delivery-status">
                          {delivery.status === 'completed' && <FaCheckCircle />}
                          {delivery.status === 'cancelled' && <FaTimesCircle />}
                          {' '}{delivery.statusText}
                        </p>
                        <div className="delivery-rider">
                          <img src={delivery.riderImg} alt={delivery.riderName} />
                          <span>{delivery.riderName}</span>
                        </div>
                      </div>
                      <button className="details-btn" onClick={() => handleDetailClick(delivery)}>Details</button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            {/* <section className="dashboard-section">
              <h2><FaBell /> Notification Preferences</h2>
              <div className="notification-preferences">
                <div className="preference-item">
                  <label className="switch">
                    <input type="checkbox" checked={notificationPrefs.statusUpdates} onChange={() => togglePref('statusUpdates')} />
                    <span className="slider round"></span>
                  </label>
                  <span>Delivery status updates</span>
                </div>
                <div className="preference-item">
                  <label className="switch">
                    <input type="checkbox" checked={notificationPrefs.riderAssigned} onChange={() => togglePref('riderAssigned')} />
                    <span className="slider round"></span>
                  </label>
                  <span>Rider assigned notifications</span>
                </div>
                <div className="preference-item">
                  <label className="switch">
                    <input type="checkbox" checked={notificationPrefs.promotions} onChange={() => togglePref('promotions')} />
                    <span className="slider round"></span>
                  </label>
                  <span>Promotional offers</span>
                </div>
                <div className="preference-item">
                  <label className="switch">
                    <input type="checkbox" checked={notificationPrefs.announcements} onChange={() => togglePref('announcements')} />
                    <span className="slider round"></span>
                  </label>
                  <span>Service announcements</span>
                </div>
                <button className="save-btn" onClick={handleSavePrefs}>Save Preferences</button>
              </div>
            </section> */}
          </div>
          {/* Right Column */}
          <div className="right-column">
            <section className="dashboard-section">
              <h2><FaCalendarDay /> Schedule Delivery</h2>
              <div className="schedule-delivery">
                <div className="delivery-form">
                  <h3>Schedule New Delivery</h3>
                  <div className="form-group">
                    <label htmlFor="delivery-date">Date</label>
                    <input
                      id="delivery-date"
                      type="date"
                      value={date}
                      min={formatDateForInput(today)}
                      max={formatDateForInput(maxDate)}
                      onChange={e => setDate(e.target.value)}
                      className="date-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="delivery-time">Pickup Time</label>
                    <select id="delivery-time" value={deliveryTime} onChange={e => setDeliveryTime(e.target.value)}>
                      <option value="11:00">11:00 AM</option>
                      <option value="11:15">11:15 AM</option>
                      <option value="11:30">11:30 AM</option>
                      <option value="11:45">11:45 AM</option>
                      <option value="12:00">12:00 PM</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="delivery-notes">Special Instructions</label>
                    <textarea
                      id="delivery-notes"
                      placeholder="Any special instructions for the rider..."
                      value={deliveryNotes}
                      onChange={e => setDeliveryNotes(e.target.value)}
                      ref={deliveryNotesRef}
                    />
                  </div>
                  <button className="schedule-btn" type="button" onClick={handleScheduleDelivery}>Schedule Delivery</button>
                </div>
              </div>
            </section>
            <section className="dashboard-section">
              <h2><FaClipboardList /> Recent Notifications</h2>
              <div className="notifications-list">
                <div className="notification-item unread">
                  <div className="notification-icon"><FaMotorcycle /></div>
                  <div className="notification-content">
                    <h3>Rider Assigned</h3>
                    <p>Rajesh Kumar has been assigned for today's delivery</p>
                    <span className="notification-time">10:45 AM</span>
                  </div>
                </div>
                <div className="notification-item">
                  <div className="notification-icon"><FaCheckCircle /></div>
                  <div className="notification-content">
                    <h3>Delivery Completed</h3>
                    <p>Your lunch was delivered successfully to school</p>
                    <span className="notification-time">Yesterday, 12:50 PM</span>
                  </div>
                </div>
                <div className="notification-item">
                  <div className="notification-icon"><FaInfoCircle /></div>
                  <div className="notification-content">
                    <h3>Service Update</h3>
                    <p>New feature: You can now schedule deliveries 2 weeks in advance</p>
                    <span className="notification-time">Jun 12, 3:15 PM</span>
                  </div>
                </div>
                <div className="notification-item">
                  <div className="notification-icon"><FaMapMarkerAlt /></div>
                  <div className="notification-content">
                    <h3>Rider Update</h3>
                    <p>Your rider is 5 minutes away from your location</p>
                    <span className="notification-time">Jun 11, 11:25 AM</span>
                  </div>
                </div>
              </div>
              <button className="view-all-btn" type="button" onClick={handleViewAllNotifications}>View All Notifications</button>
            </section>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer>
        &copy; 2025 Mom2School. All rights reserved.<br />
        <a href="mailto:mom2school@gmail.com">mom2school@gmail.com</a> | +4642324546 |<br />
        Follow us on
        <div className="social-icons">
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram" style={{color:'#e1306c'}}></i></a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook" style={{color:'#1877f2'}}></i></a>
        </div>
      </footer>
      {/* Custom Alert Modal */}
      {customAlertMessage && (
        <div className="custom-alert" onClick={closeCustomAlert}>
          <div className="custom-alert-content" onClick={e => e.stopPropagation()}>
            <p style={{whiteSpace: 'pre-line'}}>{customAlertMessage}</p>
            <button className="custom-alert-btn" onClick={closeCustomAlert}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentPrimary;
