import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./features/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials));
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/home");
  }, [isAuthenticated, navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Please enter your details to login</p>

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              style={styles.input}
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              style={styles.input}
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Logging in…" : "Login"}
          </button>
        </form>

        <p style={styles.footerText}>
          Don't have an account?{" "}
          <Link to="/" style={styles.link}>Register here</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh", display: "flex", justifyContent: "center",
    alignItems: "center", backgroundColor: "#f4f7f6",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    backgroundColor: "#fff", padding: "40px", borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)", width: "100%", maxWidth: "400px", textAlign: "center",
  },
  title:    { margin: "0 0 10px 0", color: "#333", fontSize: "28px", fontWeight: "bold" },
  subtitle: { color: "#777", marginBottom: "30px", fontSize: "14px" },
  form:     { display: "flex", flexDirection: "column", gap: "20px" },
  inputGroup: { textAlign: "left" },
  label:  { display: "block", fontSize: "14px", marginBottom: "5px", color: "#555", fontWeight: "500" },
  input:  { width: "100%", padding: "12px 15px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "16px", boxSizing: "border-box" },
  button: { backgroundColor: "#4f46e5", color: "white", padding: "12px", borderRadius: "8px", border: "none", fontSize: "16px", fontWeight: "600", cursor: "pointer", marginTop: "10px" },
  footerText: { marginTop: "20px", fontSize: "14px", color: "#666" },
  link: { color: "#4f46e5", textDecoration: "none", fontWeight: "600" },
};

export default Login;
