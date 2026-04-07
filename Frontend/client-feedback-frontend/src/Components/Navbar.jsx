import { useNavigate, useLocation, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");

  let userName = "User";

  if (token) {
    try {
      const decoded = jwtDecode(token);
      userName = decoded.name || "User";
    } catch (err) {
      console.log("Invalid token");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 20px",
      background: "rgba(15, 23, 42, 0.8)",
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      flexWrap: "wrap",
    },

    left: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
    },

    logo: {
      color: "#3b82f6",
      fontWeight: "700",
      fontSize: "20px",
    },

    links: {
      display: "flex",
      gap: "20px",
    },

    mobileLinks: {
      display: menuOpen ? "flex" : "none",
      flexDirection: "column",
      width: "100%",
      marginTop: "10px",
      gap: "10px",
    },

    link: (active) => ({
      color: active ? "#22c55e" : "#cbd5f5",
      textDecoration: "none",
      fontWeight: "500",
    }),

    right: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },

    userBox: {
      background: "rgba(255,255,255,0.05)",
      padding: "5px 10px",
      borderRadius: "8px",
      color: "#e5e7eb",
      fontSize: "13px",
    },

    logout: {
      padding: "6px 12px",
      borderRadius: "6px",
      border: "none",
      background: "#ef4444",
      color: "#fff",
      cursor: "pointer",
    },

    menuBtn: {
      display: "none",
      fontSize: "20px",
      color: "#fff",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.navbar}>
      {/* Left */}
      <div style={styles.left}>
        <h2 style={styles.logo}>FeedbackPro 🚀</h2>

        {/* Desktop Links */}
        <div className="desktop-links" style={styles.links}>
          <Link to="/" style={styles.link(location.pathname === "/")}>
            Dashboard
          </Link>
          <Link to="/feedback" style={styles.link(location.pathname === "/feedback")}>
            Feedback
          </Link>
        </div>
      </div>

      {/* Right */}
      <div style={styles.right}>
        <motion.div
          style={styles.userBox}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {userName}
        </motion.div>

        <button style={styles.logout} onClick={handleLogout}>
          Logout
        </button>

        {/* Mobile Menu Button */}
        <div
          style={styles.menuBtn}
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>
      </div>

      {/* Mobile Links */}
      <div style={styles.mobileLinks}>
        <Link to="/" style={styles.link(location.pathname === "/")}>
          Dashboard
        </Link>
        <Link to="/feedback" style={styles.link(location.pathname === "/feedback")}>
          Feedback
        </Link>
      </div>

      {/* Responsive CSS */}
      <style>
        {`
        @media (max-width: 768px) {
          .desktop-links {
            display: none;
          }
          .menu-btn {
            display: block !important;
          }
        }
        `}
      </style>
    </div>
  );
};

export default Navbar;