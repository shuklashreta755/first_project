import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "./features/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    number: "",
    role: "User",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      age: Number(formData.age),
      number: formData.number ? Number(formData.number) : undefined,
    };
    const result = await dispatch(registerUser(payload));   // it will go inside authSlice 
    if (registerUser.fulfilled.match(result)) {
      navigate("/login");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Fill in your details to register</p>

        <form onSubmit={handleSubmit} style={styles.form}>

          {/* Name */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name *</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              style={styles.input}
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address *</label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              style={styles.input}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password *</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              style={styles.input}
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Age */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Age *</label>
            <input
              type="number"
              name="age"
              placeholder="18"
              style={styles.input}
              value={formData.age}
              onChange={handleChange}
              min="18"
              max="100"
              required
            />
          </div>

          {/* Phone Number */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Phone Number (10 digits)</label>
            <input
              type="text"
              name="number"
              placeholder="9876543210"
              style={styles.input}
              value={formData.number}
              onChange={handleChange}
              maxLength={10}
            />
          </div>

          {/* Role */}
          {/* <div style={styles.inputGroup}>
            <label style={styles.label}>Role *</label>
            <select
              name="role"
              style={{ ...styles.input, cursor: "pointer" }}
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div> */}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Registering…" : "Create Account"}
          </button>
        </form>

        <p style={styles.footerText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f7f6",
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    padding: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    width: "100%",
    maxWidth: "440px",
    textAlign: "center",
  },
  title: { margin: "0 0 8px 0", color: "#1a1a1a", fontSize: "26px", fontWeight: "700" },
  subtitle: { color: "#666", marginBottom: "28px", fontSize: "14px" },
  form: { display: "flex", flexDirection: "column", gap: "16px" },
  inputGroup: { textAlign: "left" },
  label: { display: "block", fontSize: "13px", marginBottom: "5px", color: "#444", fontWeight: "600" },
  input: {
    width: "100%", padding: "11px 14px", borderRadius: "10px",
    border: "1px solid #e0e0e0", fontSize: "15px", boxSizing: "border-box",
    backgroundColor: "#fafafa", outline: "none",
  },
  button: {
    backgroundColor: "#4f46e5", color: "white", padding: "13px",
    borderRadius: "10px", border: "none", fontSize: "16px",
    fontWeight: "600", cursor: "pointer", marginTop: "6px",
  },
  footerText: { marginTop: "22px", fontSize: "14px", color: "#777" },
  link: { color: "#4f46e5", textDecoration: "none", fontWeight: "600" },
};

export default Register;
