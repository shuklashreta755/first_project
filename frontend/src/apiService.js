import axios from "axios";

const api = axios.create({
  //  baseURL: "https://first-project-a1ov.onrender.com/api",
  baseURL: "https://first-project-a1ov.onrender.com",
});

// Add token automatically in every request
api.interceptors.request.use(
  (config) => {
    // get token from localStorage
    const token = localStorage.getItem("accessToken");

    // if token exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

// AUTH
export const registerUserAPI = (data) => api.post("/user/register", data);
export const loginUserAPI = (data) => api.post("/user/login", data);
export const logoutUserAPI = () => api.post("/user/logout");
export const getUsersAPI = () => api.get("/user/all");
export const deleteUserAPI = (id) => api.delete(`/user/${id}`);

// PRODUCTS
export const getProductsAPI = () => api.get("/products");
export const getProductAPI = (id) => api.get(`/products/${id}`);
export const createProductAPI = (data) => api.post("/products", data);
export const updateProductAPI = (id, data) => api.put(`/products/${id}`, data);
export const deleteProductAPI = (id) => api.delete(`/products/${id}`);

// ORDERS
export const getOrdersAPI = () => api.get("/order");
export const getOrderAPI = (id) => api.get(`/order/${id}`);
export const createOrderAPI = (data) => api.post("/order", data);
export const updateOrderAPI = (id, data) => api.put(`/order/${id}`, data);
export const deleteOrderAPI = (id) => api.delete(`/order/${id}`);

//export const sendMessageAPI = (data) => api.post("/chat/sendMessage", data);
export const getMessageAPI = (senderId, receiverId) =>
  api.get(`/chat/${senderId}/${receiverId}`);
// export const broadcastMessageAPI = (data) => api.post("/chat/broadcast", data);

// for payment
export const createRazorpayOrderAPI = (data) =>
  api.post("/payment/createOrder", data);
