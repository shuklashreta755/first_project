import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "./features/authSlice";
import { useNavigate } from "react-router-dom";

const ADMIN_LINKS = [
  { key: "users", label: "All Users", icon: "👥" },
  { key: "products", label: "All Products", icon: "📦" },
  { key: "orders", label: "All Orders", icon: "🛒" },
  { key: "Chat", label: "Chat HUb", icon: "👨‍👩‍👧" },
];

const USER_LINKS = [
  { key: "products", label: "All Products", icon: "📦" },
  { key: "orders", label: "My Orders", icon: "🧾" },
  { key: "Chat", label: "Chat HUb", icon: "👨‍👩‍👧" },
];

export default function Sidebar({ activeTab, onTabChange }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  const isAdmin = user?.role === "Admin";
  const links = isAdmin ? ADMIN_LINKS : USER_LINKS;

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <aside style={styles.sidebar}>
      {/* Brand */}
      <div style={styles.brand}>
        <span style={styles.brandIcon}>{isAdmin ? "⚙️" : "🛍️"}</span>
        <span style={styles.brandText}>
          {isAdmin ? "Admin Panel" : "My Shop"}
        </span>
      </div>
      <div style={styles.divider} />

      {/* Nav links */}
      <nav style={styles.nav}>
        <p style={styles.navLabel}>MENU</p>
        {links.map((link) => {
          const active = activeTab === link.key;
          return (
            <button
              key={link.key}
              onClick={() => onTabChange(link.key)}
              style={active ? styles.linkActive : styles.link}
            >
              <span style={styles.linkIcon}>{link.icon}</span>

              <span>{link.label}</span>

              {active && <span style={styles.activeDot} />}
            </button>
          );
        })}
      </nav>

      {/* User chip */}
      <div style={styles.userChip}>
        <div style={styles.avatar}>{user?.name?.[0]?.toUpperCase() ?? "?"}</div>
        <div style={styles.userInfo}>
          <p style={styles.userName}>{user?.name}</p>
          <span style={styles.roleBadge}>{user?.role}</span>
        </div>
      </div>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: "240px",
    minHeight: "100vh",
    backgroundColor: "#0f0f23",
    display: "flex",
    flexDirection: "column",
    position: "sticky",
    top: 0,
    height: "100vh",
    flexShrink: 0,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "24px 20px 16px",
  },
  brandIcon: { fontSize: "22px" },
  brandText: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: "0.3px",
  },
  userChip: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    margin: "0 12px",
    padding: "12px",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: "12px",
  },
  avatar: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    backgroundColor: "#4f46e5",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "15px",
    flexShrink: 0,
  },
  userInfo: { overflow: "hidden" },
  userName: {
    margin: 0,
    color: "#ffffff",
    fontSize: "13px",
    fontWeight: "600",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  roleBadge: {
    display: "inline-block",
    marginTop: "3px",
    fontSize: "10px",
    fontWeight: "700",
    color: "#a5b4fc",
    backgroundColor: "rgba(99,102,241,0.2)",
    padding: "1px 7px",
    borderRadius: "20px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  divider: {
    height: "1px",
    backgroundColor: "rgba(255,255,255,0.08)",
    margin: "16px 20px",
  },
  nav: { flex: 1, padding: "0 12px" },
  navLabel: {
    fontSize: "10px",
    fontWeight: "700",
    color: "#4a5568",
    letterSpacing: "1px",
    padding: "0 8px",
    marginBottom: "6px",
    margin: "0 0 8px 0",
  },
  link: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "11px 12px",
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "10px",
    color: "#718096",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    textAlign: "left",
    position: "relative",
    marginBottom: "2px",
  },
  linkActive: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "11px 12px",
    backgroundColor: "rgba(79,70,229,0.18)",
    border: "none",
    borderRadius: "10px",
    color: "#a5b4fc",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    textAlign: "left",
    position: "relative",
    marginBottom: "2px",
    boxShadow: "inset 3px 0 0 #4f46e5",
  },
  linkIcon: { fontSize: "17px" },
  activeDot: {
    position: "absolute",
    right: "12px",
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: "#4f46e5",
  },
  logout: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: "12px",
    padding: "11px 14px",
    backgroundColor: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "10px",
    color: "#718096",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    width: "calc(100% - 24px)",
  },
};
