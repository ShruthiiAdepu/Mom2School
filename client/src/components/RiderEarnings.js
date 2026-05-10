import React, { useEffect, useRef, useState } from "react";
import { FaHome, FaBoxOpen, FaUserCircle, FaCalendarDay, FaClipboardList, FaUser, FaUserEdit, FaSignOutAlt, FaStar, FaBiking, FaClock, FaTemperatureLow, FaCalendarAlt, FaQuestionCircle, FaShieldAlt, FaUserCheck, FaMapMarkerAlt, FaHandsWash, FaLock, FaCertificate, FaPlusCircle } from 'react-icons/fa';
import Chart from "chart.js/auto";
import "../styles/RiderDashboard.css";
import "../styles/RiderEarnings.css";
import { Link } from "react-router-dom";

const RiderEarnings = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const [period, setPeriod] = useState("week");
  const [typeFilter, setTypeFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState(
    `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`
  );

  // Summary data (static for demo)
  const summary = {
    total: 12450,
    thisMonth: { amount: 3250, trips: 15 },
    lastMonth: { amount: 4800, trips: 22 },
    pending: 1750,
  };

  // Transactions
  const transactions = [
    {
      type: "pickup",
      title: "Morning Pickup #PK-2023-015",
      date: "15 Oct 2023, 8:30 AM",
      details: "Completed pickup for Rohan Sharma to National Public School",
      amount: "+ ₹250",
    },
    {
      type: "bonus",
      title: "On-Time Bonus",
      date: "14 Oct 2023, 9:15 AM",
      details: "Bonus for 5 consecutive on-time pickups",
      amount: "+ ₹100",
    },
    {
      type: "pickup",
      title: "Morning Pickup #PK-2023-014",
      date: "14 Oct 2023, 8:15 AM",
      details: "Completed pickup for Priya Patel to National Public School",
      amount: "+ ₹250",
    },
    {
      type: "penalty",
      title: "Late Arrival",
      date: "12 Oct 2023, 8:45 AM",
      details: "10 minutes late to pickup point",
      amount: "- ₹50",
    },
    {
      type: "payout",
      title: "Monthly Payout",
      date: "05 Oct 2023, 11:30 AM",
      details: "Bank transfer for September earnings",
      amount: "₹4,800",
    },
  ];

  // Get chart data for selected period
  const getChartData = (p) => {
    switch (p) {
      case "week":
        return {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          data: [500, 750, 600, 800, 900, 0, 0],
        };
      case "month":
        return {
          labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
          data: [1200, 1100, 900, 1050],
        };
      case "year":
        return {
          labels: [
            "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",
          ],
          data: [3200, 2900, 3500, 4100, 3800, 4200, 4500, 4800, 5200, 3250, 0, 0],
        };
      case "all":
      default:
        return {
          labels: ["2020", "2021", "2022", "2023"],
          data: [28000, 32000, 38000, 42000],
        };
    }
  };

  // Initialize / update Chart.js
  useEffect(() => {
    if (chartInstance.current) chartInstance.current.destroy();

    const { labels, data } = getChartData(period);
    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Earnings (₹)",
            data,
            backgroundColor: "#3498db",
            borderColor: "#2980b9",
            borderWidth: 1,
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => "₹" + context.raw.toLocaleString("en-IN"),
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => "₹" + value.toLocaleString("en-IN"),
            },
            grid: { color: "rgba(0, 0, 0, 0.05)" },
          },
          x: { grid: { display: false } },
        },
      },
    });
  }, [period]);

  // Extract YYYY-MM from transaction date string
  const getMonthYearFromDate = (dateString) => {
    const parts = dateString.match(/(\d{1,2}) (\w{3}) (\d{4})/);
    if (!parts) return "";

    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const monthIndex = monthNames.indexOf(parts[2]);
    return `${parts[3]}-${String(monthIndex + 1).padStart(2, "0")}`;
  };

  // Apply filters
  const filteredTransactions = transactions.filter((t) => {
    const showByType = typeFilter === "all" || t.type === typeFilter;
    const cardMonthYear = getMonthYearFromDate(t.date);
    const showByMonth = monthFilter === "" || cardMonthYear === monthFilter;
    return showByType && showByMonth;
  });

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

      {/* Main */}
      <main className="earnings-container">
        <h1><i className="fas fa-rupee-sign"></i> My Earnings</h1>

        {/* Summary */}
        <div className="earnings-summary">
          <div className="summary-card total-earnings">
            <div className="summary-icon"><i className="fas fa-wallet"></i></div>
            <div className="summary-content">
              <h3>Total Earnings</h3>
              <p className="amount">₹{summary.total}</p>
              <p className="info">All time earnings</p>
            </div>
          </div>

          <div className="summary-card this-month">
            <div className="summary-icon"><i className="fas fa-calendar-alt"></i></div>
            <div className="summary-content">
              <h3>This Month</h3>
              <p className="amount">₹{summary.thisMonth.amount}</p>
              <p className="info">{summary.thisMonth.trips} trips completed</p>
            </div>
          </div>

          <div className="summary-card last-month">
            <div className="summary-icon"><i className="fas fa-calendar-check"></i></div>
            <div className="summary-content">
              <h3>Last Month</h3>
              <p className="amount">₹{summary.lastMonth.amount}</p>
              <p className="info">{summary.lastMonth.trips} trips completed</p>
            </div>
          </div>

          <div className="summary-card pending-payout">
            <div className="summary-icon"><i className="fas fa-clock"></i></div>
            <div className="summary-content">
              <h3>Pending Payout</h3>
              <p className="amount">₹{summary.pending}</p>
              <p className="info">Will be processed on 5th</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="earnings-controls">
          <div className="time-period-selector">
            {["week", "month", "year", "all"].map((p) => (
              <button
                key={p}
                className={`time-btn ${period === p ? "active" : ""}`}
                onClick={() => setPeriod(p)}
              >
                {p === "week" ? "This Week" : p === "month" ? "This Month" : p === "year" ? "This Year" : "All Time"}
              </button>
            ))}
          </div>
          {/* <div className="export-options">
            <button className="btn btn-export" onClick={() => alert("Exporting earnings statement...")}> 
              <i className="fas fa-file-export"></i> Export Statement
            </button>
          </div> */}
        </div>

        {/* Chart */}
        <div className="earnings-chart-container">
          <canvas ref={chartRef}></canvas>
        </div>

        {/* Transactions */}
        <div className="transactions-container">
          <h2><i className="fas fa-list"></i> Recent Transactions</h2>

          {/* <div className="transaction-filters">
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="all">All Transactions</option>
              <option value="pickup">Pickup Earnings</option>
              <option value="bonus">Bonuses</option>
              <option value="penalty">Penalties</option>
              <option value="payout">Payouts</option>
            </select>
            <input type="month" value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)} />
          </div> */}

          <div className="transactions-list">
  <div className="transaction-card pickup">
    <div className="transaction-info">
      <h3>Morning Pickup #PK-2023-015</h3>
      <p className="date"><i className="far fa-calendar-alt"></i> 15 Oct 2023, 8:30 AM</p>
      <p className="details">Completed pickup for Rohan Sharma to National Public School</p>
    </div>
    <div className="transaction-amount credit">
      + ₹250
    </div>
  </div>
  
  <div className="transaction-card bonus">
    <div className="transaction-info">
      <h3>On-Time Bonus</h3>
      <p className="date"><i className="far fa-calendar-alt"></i> 14 Oct 2023, 9:15 AM</p>
      <p className="details">Bonus for 5 consecutive on-time pickups</p>
    </div>
    <div className="transaction-amount credit">
      + ₹100
    </div>
  </div>
  
  <div className="transaction-card pickup">
    <div className="transaction-info">
      <h3>Morning Pickup #PK-2023-014</h3>
      <p className="date"><i className="far fa-calendar-alt"></i> 14 Oct 2023, 8:15 AM</p>
      <p className="details">Completed pickup for Priya Patel to National Public School</p>
    </div>
    <div className="transaction-amount credit">
      + ₹250
    </div>
  </div>
  
  <div className="transaction-card penalty">
    <div className="transaction-info">
      <h3>Late Arrival</h3>
      <p className="date"><i className="far fa-calendar-alt"></i> 12 Oct 2023, 8:45 AM</p>
      <p className="details">10 minutes late to pickup point</p>
    </div>
    <div className="transaction-amount debit">
      - ₹50
    </div>
  </div>
  
  <div className="transaction-card payout">
    <div className="transaction-info">
      <h3>Monthly Payout</h3>
      <p className="date"><i className="far fa-calendar-alt"></i> 5 Oct 2023, 11:30 AM</p>
      <p className="details">Bank transfer for September earnings</p>
    </div>
    <div className="transaction-amount payout">
      ₹4,800
    </div>
  </div>
</div>


          <button className="btn btn-load-more" onClick={() => alert("Loading more transactions...")}> 
            <i className="fas fa-plus"></i> Load More Transactions
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer>
        &copy; 2025 Mom2School. All rights reserved.<br />
        mom2school@gmail.com | +4642324546 <br />
        Follow us on
        <div className="social-icons">
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            <i className="fab fa-instagram" style={{ color: "#e1306c" }}></i>
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
            <i className="fab fa-facebook" style={{ color: "#1877f2" }}></i>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default RiderEarnings;
