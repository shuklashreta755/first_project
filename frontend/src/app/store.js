import { configureStore } from "@reduxjs/toolkit";
import authReducer    from "../features/authSlice";
import productReducer from "../features/productSlice";
import orderReducer   from "../features/orderSlice";
import userReducer    from "../features/userSlice";
import chatReducer    from "../features/chatSlice";

export const store = configureStore({
  reducer: {
    auth:     authReducer,
    products: productReducer,
    orders:   orderReducer,
    users:    userReducer,
    chat:     chatReducer,
  },
});
