import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  let userName = "User";

  if (token) {
    try {
      const decoded = jwtDecode(token);
      userName = decoded.name;
    } catch (err) {
      console.log("Invalid token");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={styles.navbar}>
      <h2 style={styles.logo}>FeedbackPro 🚀</h2>

      <div style={styles.right}>
        <span style={styles.user}>Welcome {userName} 👋</span>

        <button style={styles.logout} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "#0f172a",
    borderBottom: "1px solid #1e293b",
  },

  logo: {
    color: "#3b82f6",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  user: {
    color: "#fff",
  },

  logout: {
    padding: "8px 15px",
    borderRadius: "6px",
    border: "none",
    background: "#ef4444",
    color: "#fff",
    cursor: "pointer",
  },
};

export default Navbar;