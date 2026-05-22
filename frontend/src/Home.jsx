import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { logoutUser } from "./features/authSlice";
import ChatSidebar from "./components/chat/ChatSidebar";
import ChatHub from "./pages/ChatHub";
import Checkout from "./Checkout";
import { fetchUsers, deleteUsers } from "./features/userSlice";

import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./features/productSlice";
import {
  fetchOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} from "./features/orderSlice";

//  Modal
const Modal = ({ title, onClose, children }) => (
  <div style={modal.overlay}>
    <div style={modal.box}>
      <div style={modal.header}>
        <h3 style={{ margin: 0, fontSize: "16px", color: "#1a1a2e" }}>
          {title}
        </h3>
        <button onClick={onClose} style={modal.closeBtn}>
          ✕
        </button>
      </div>
      {children}
    </div>
  </div>
);

const modal = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  box: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "28px",
    width: "100%",
    maxWidth: "440px",
    boxShadow: "0 24px 64px rgba(0,0,0,0.2)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  closeBtn: {
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    color: "#999",
  },
};

const inp = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1.5px solid #e5e7eb",
  fontSize: "14px",
  boxSizing: "border-box",
  marginBottom: "12px",
  backgroundColor: "#fafafa",
  outline: "none",
};

// Products Panel
const ProductsPanel = ({ isAdmin }) => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((s) => s.products);

  // const checkoutRef = useRef();

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    image: "",
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const resetForm = () =>
    setForm({ name: "", description: "", price: "", quantity: "", image: "" });

  const [selectedFile, setSelectedFile] = useState(null);

  const [showOrderModal, setShowOrderModal] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [orderQuantity, setOrderQuantity] = useState(1);
  const checkoutRef = useRef();

  const handleAdd = async () => {
    if (!form.name || !form.price) {
      return alert("Name and Price are required");
    }

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("quantity", form.quantity);

    // image file
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    await dispatch(createProduct(formData));

    resetForm();

    setSelectedFile(null);

    setShowAdd(false);
  };

  const openEdit = (p) => {
    setForm({
      name: p.name,
      description: p.description || "",
      price: p.price,
      quantity: p.quantity,
      image: p.image || "",
    });
    setShowEdit(p);
  };

  const handleEdit = async () => {
    await dispatch(
      updateProduct({
        id: showEdit._id,
        data: {
          ...form,
          price: Number(form.price),
          quantity: Number(form.quantity),
        },
      }),
    );
    resetForm();
    setShowEdit(null);
  };
  <Checkout ref={checkoutRef} />;

  return (
    <div>
      {isAdmin && (
        <div style={{ marginBottom: "20px" }}>
          <button
            style={btn.primary}
            onClick={() => {
              resetForm();
              setShowAdd(true);
            }}
          >
            + Add Product
          </button>
        </div>
      )}

      {loading && (
        <p style={{ textAlign: "center", color: "#888", padding: "40px" }}>
          Loading…
        </p>
      )}
      {!loading && items.length === 0 && (
        <div style={{ textAlign: "center", color: "#aaa", marginTop: "60px" }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>📦</div>
          <p>No products found.</p>
        </div>
      )}

      <Checkout ref={checkoutRef} />

      <div style={grid}>
        {items.map((p) => (
          <div key={p._id} style={card}>
            {p.image ? (
              <img
                src={p.image}
                alt={p.name}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "contain",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  backgroundColor: "#f5f5f5",
                  padding: "10px",
                }}
              />
            ) : (
              <div style={imgPlaceholder}>📦</div>
            )}

            <h3
              style={{ margin: "0 0 4px", fontSize: "15px", color: "#1a1a2e" }}
            >
              {p.name}
            </h3>
            <p
              style={{
                margin: "0 0 6px",
                fontSize: "13px",
                color: "#777",
                flex: 1,
              }}
            >
              {p.description}
            </p>
            <p
              style={{
                margin: "0 0 4px",
                fontWeight: "700",
                color: "#4f46e5",
                fontSize: "16px",
              }}
            >
              ₹{p.price}
            </p>
            <p style={{ margin: "0 0 12px", fontSize: "12px", color: "#aaa" }}>
              Qty: {p.quantity}
            </p>

            {isAdmin ? (
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  style={{ ...btn.edit, flex: 1 }}
                  onClick={() => openEdit(p)}
                >
                  Edit
                </button>

                <button
                  style={{ ...btn.danger, flex: 1 }}
                  onClick={() => dispatch(deleteProduct(p._id))}
                >
                  Delete
                </button>
              </div>
            ) : (
              // <button
              //   style={{ ...btn.primary, width: "100%" }}
              //   onClick={() =>
              //     dispatch(
              //       createOrder({
              //         productId: p._id,
              //         quantity: 1,
              //       }),
              //     )
              //   }
              // >
              //   Buy Now
              // </button>

              <button
                style={{ ...btn.primary, width: "100%" }}
                onClick={() => {
                  setSelectedProduct(p);
                  setOrderQuantity(1);
                  setShowOrderModal(true);
                }}
              >
                Buy Now
              </button>

              // <Checkout ref={checkoutRef} />
            )}
          </div>
        ))}
      </div>

      {showAdd && (
        <Modal title="Add Product" onClose={() => setShowAdd(false)}>
          {["name", "description", "price", "quantity"].map((f) => (
            <input
              key={f}
              style={inp}
              placeholder={f[0].toUpperCase() + f.slice(1)}
              value={form[f]}
              onChange={(e) => setForm({ ...form, [f]: e.target.value })}
            />
          ))}
          <button style={{ ...btn.primary, width: "100%" }} onClick={handleAdd}>
            Save Product
          </button>
        </Modal>
      )}

      {showEdit && (
        <Modal title="Edit Product" onClose={() => setShowEdit(null)}>
          {["name", "description", "price", "quantity", "image"].map((f) => (
            <input
              key={f}
              style={inp}
              placeholder={f[0].toUpperCase() + f.slice(1)}
              value={form[f]}
              onChange={(e) => setForm({ ...form, [f]: e.target.value })}
            />
          ))}
          <button
            style={{ ...btn.primary, width: "100%" }}
            onClick={handleEdit}
          >
            Update Product
          </button>
        </Modal>
      )}

      {showOrderModal && selectedProduct && (
        <Modal title="Confirm Order" onClose={() => setShowOrderModal(false)}>
          <div style={{ marginBottom: "15px" }}>
            <h3 style={{ marginBottom: "10px" }}>{selectedProduct.name}</h3>

            <p style={{ color: "#666" }}>
              Price per item: ₹{selectedProduct.price}
            </p>
          </div>

          {/* Quantity */}

          <label style={labelStyle}>Quantity</label>

          <input
            type="number"
            min="1"
            max={selectedProduct.quantity}
            value={orderQuantity}
            onChange={(e) => setOrderQuantity(Number(e.target.value))}
            style={inp}
          />

          {/* Total Price */}

          <div
            style={{
              marginBottom: "20px",
              fontSize: "18px",
              fontWeight: "700",
              color: "#4f46e5",
            }}
          >
            Total Price: ₹{selectedProduct.price * orderQuantity}
          </div>

          {/* Buttons */}

          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            {/* 
      <button
        style={{
          ...btn.primary,
          flex: 1,
        }}

        
        onClick={() => {

          dispatch(
            createOrder({
              productId:
                selectedProduct._id,

              quantity:
                orderQuantity,
            })
          );

          setShowOrderModal(false);
        }
      }
      >
        Confirm Order
      </button>
  */}

            <button
              onClick={async () => {
                console.log(checkoutRef.current);

                const totalAmount = selectedProduct.price * orderQuantity;

                await checkoutRef.current.handlePayment({
                  amount: totalAmount,

                  productId: selectedProduct._id,

                  quantity: orderQuantity,

                  createOrderApi: async (orderData) => {
                    await dispatch(createOrder(orderData));
                  },
                });

                setShowOrderModal(false);
              }}
            >
              Confirm Order
            </button>

            <button
              style={{
                ...btn.danger,
                flex: 1,
              }}
              onClick={() => setShowOrderModal(false)}
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

// Orders Panel
const OrdersPanel = ({ isAdmin }) => {
  const dispatch = useDispatch();
  const { items: orders, loading } = useSelector((s) => s.orders);
  const { items: products } = useSelector((s) => s.products);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(null);
  const [form, setForm] = useState({ productId: "", quantity: "1" });

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAdd = async () => {
    if (!form.productId) return alert("Select a product");
    await dispatch(
      createOrder({
        productId: form.productId,
        quantity: Number(form.quantity),
      }),
    );
    setForm({ productId: "", quantity: "1" });
    setShowAdd(false);
  };

  const handleEdit = async () => {
    await dispatch(
      updateOrder({
        id: showEdit._id,
        data: { quantity: Number(form.quantity) },
      }),
    );
    setShowEdit(null);
  };

  return (
    <div>
      {loading && (
        <p style={{ textAlign: "center", color: "#888", padding: "40px" }}>
          Loading…
        </p>
      )}
      {!loading && orders.length === 0 && (
        <div style={{ textAlign: "center", color: "#aaa", marginTop: "60px" }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>🛒</div>
          <p>No orders found.</p>
        </div>
      )}

      {orders.length > 0 && (
        <div style={{ overflowX: "auto" }}>
          <table style={tbl.t}>
            <thead>
              <tr style={{ backgroundColor: "#4f46e5", color: "#fff" }}>
                {[
                  "#",
                  "Product",
                  "Qty",
                  "Total",
                  "Date",
                  "Payment",
                  "Actions",
                ].map((h) => (
                  <th key={h} style={tbl.th}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((o, i) => (
                <tr
                  key={o._id}
                  style={{ backgroundColor: i % 2 === 0 ? "#f9f9fb" : "#fff" }}
                >
                  <td style={tbl.td}>{i + 1}</td>
                  <td style={tbl.td}>
                    {o.productId?.name ?? String(o.productId).slice(-6)}
                  </td>
                  <td style={tbl.td}>{o.quantity}</td>
                  <td
                    style={{ ...tbl.td, fontWeight: "600", color: "#4f46e5" }}
                  >
                    ₹{o.totalPrice}
                  </td>
                  <td style={tbl.td}>
                    {new Date(o.createdAt).toLocaleDateString()}
                  </td>
                  <td style={tbl.td}>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button
                        style={btn.edit}
                        onClick={() => {
                          setForm({
                            productId: o.productId,
                            quantity: o.quantity,
                          });
                          setShowEdit(o);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        style={btn.danger}
                        onClick={() => dispatch(deleteOrder(o._id))}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showAdd && (
        <Modal title="Create Order" onClose={() => setShowAdd(false)}>
          <label style={labelStyle}>Select Product</label>
          <select
            style={inp}
            value={form.productId}
            onChange={(e) => setForm({ ...form, productId: e.target.value })}
          >
            <option value="">— choose product —</option>
            {products.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name} (₹{p.price})
              </option>
            ))}
          </select>
          <label style={labelStyle}>Quantity</label>
          <input
            style={inp}
            type="number"
            min="1"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          />
          <button style={{ ...btn.primary, width: "100%" }} onClick={handleAdd}>
            Place Order
          </button>
        </Modal>
      )}

      {showEdit && (
        <Modal title="Edit Order" onClose={() => setShowEdit(null)}>
          <label style={labelStyle}>Quantity</label>
          <input
            style={inp}
            type="number"
            min="1"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          />
          <button
            style={{ ...btn.primary, width: "100%" }}
            onClick={handleEdit}
          >
            Update Order
          </button>
        </Modal>
      )}
    </div>
  );
};

//  Users Panel only admin

const UsersPanel = () => {
  const dispatch = useDispatch();

  const { items: users, loading } = useSelector((s) => s.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading)
    return (
      <p style={{ textAlign: "center", color: "#888", padding: "40px" }}>
        Loading…
      </p>
    );

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={tbl.t}>
        <thead>
          <tr style={{ backgroundColor: "#4f46e5", color: "#fff" }}>
            {["#", "Name", "Email", "Age", "Role", "Joined", "Action"].map(
              (h) => (
                <th key={h} style={tbl.th}>
                  {h}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr
              key={u._id}
              style={{ backgroundColor: i % 2 === 0 ? "#f9f9fb" : "#fff" }}
            >
              <td style={tbl.td}>{i + 1}</td>
              <td style={tbl.td}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <div style={avatarSmall}>{u.name?.[0]?.toUpperCase()}</div>
                  <span style={{ fontWeight: "600" }}>{u.name}</span>
                </div>
              </td>
              <td style={tbl.td}>{u.email}</td>
              <td style={tbl.td}>{u.age}</td>
              <td style={tbl.td}>
                <span style={u.role === "Admin" ? badge.admin : badge.user}>
                  {u.role}
                </span>
              </td>
              <td style={tbl.td}>
                {new Date(u.createdAt).toLocaleDateString()}
              </td>

              <td style={tbl.td}>
                <div style={{ display: "flex", gap: "6px" }}>
                  <button
                    style={btn.danger}
                    onClick={() => dispatch(deleteUsers(u._id))}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Page title map
const PAGE_TITLE = {
  users: { emoji: "👥", label: "All Users" },
  products: { emoji: "📦", label: "All Products" },
  orders: { emoji: "🛒", label: "Orders" },
  Chat: { emoji: "💬", label: "Chat Hub" },
};

// Home
const Home = () => {
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdmin = user?.role === "Admin";

  const [tab, setTab] = useState(isAdmin ? "users" : "products");

  const { emoji, label } = PAGE_TITLE[tab] ?? {};

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "'Inter','Segoe UI',sans-serif",
        backgroundColor: "#f4f5f7",
      }}
    >
      {/* ── Sidebar ── */}
      <Sidebar activeTab={tab} onTabChange={setTab} />

      {/* ── Main ── */}
      <main style={{ flex: 1, overflowY: "auto" }}>
        {/* Top bar */}
        <div style={topBar}>
          <div>
            <h1 style={pageTitle}>
              {emoji} {label}
            </h1>
            <p style={pageSub}>
              {isAdmin ? "Admin Dashboard" : "User Dashboard"} · {user?.name}
            </p>
          </div>
          <button onClick={handleLogout} style={logoutBtn}>
            Logout
          </button>
        </div>

        {/* Panel */}
        <div style={{ padding: "0 32px 32px" }}>
          {tab === "users" && isAdmin && <UsersPanel />}

          {tab === "products" && <ProductsPanel isAdmin={isAdmin} />}

          {tab === "orders" && <OrdersPanel isAdmin={isAdmin} />}

          {tab === "Chat" && <ChatHub />}
        </div>
      </main>
    </div>
  );
};

// Shared styles
const topBar = {
  padding: "20px 32px",
  borderBottom: "1px solid #e9eaec",
  backgroundColor: "#fff",
  marginBottom: "28px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const logoutBtn = {
  backgroundColor: "#e63946",
  color: "#fff",
  border: "none",
  padding: "9px 18px",
  borderRadius: "9px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
  display: "flex",
  alignItems: "center",
  gap: "6px",
};

const pageTitle = {
  margin: 0,
  fontSize: "22px",
  fontWeight: "700",
  color: "#1a1a2e",
};
const pageSub = { margin: "4px 0 0", fontSize: "13px", color: "#888" };

const btn = {
  primary: {
    backgroundColor: "#4f46e5",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "9px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
  },
  edit: {
    backgroundColor: "#f59e0b",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "7px",
    cursor: "pointer",
    fontSize: "13px",
  },
  danger: {
    backgroundColor: "#e63946",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "7px",
    cursor: "pointer",
    fontSize: "13px",
  },
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))",
  gap: "20px",
};

const card = {
  backgroundColor: "#fff",
  borderRadius: "14px",
  padding: "16px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
  display: "flex",
  flexDirection: "column",
};

const imgPlaceholder = {
  width: "100%",
  height: "140px",
  backgroundColor: "#f0f0f8",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#bbb",
  marginBottom: "10px",
  fontSize: "36px",
};

const tbl = {
  t: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
  },
  th: {
    padding: "13px 16px",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "13px",
  },
  td: {
    padding: "12px 16px",
    fontSize: "13px",
    color: "#333",
    borderBottom: "1px solid #f0f0f2",
  },
};

const avatarSmall = {
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  backgroundColor: "#4f46e5",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "13px",
  fontWeight: "700",
  flexShrink: 0,
};

const badge = {
  admin: {
    display: "inline-block",
    padding: "2px 10px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "700",
    background: "#ede9fe",
    color: "#5b21b6",
  },
  user: {
    display: "inline-block",
    padding: "2px 10px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "700",
    background: "#e0f2fe",
    color: "#0369a1",
  },
};

const labelStyle = {
  fontSize: "13px",
  fontWeight: "600",
  color: "#444",
  display: "block",
  marginBottom: "5px",
};

export default Home;
