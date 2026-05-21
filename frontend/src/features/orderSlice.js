import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getOrdersAPI,
  createOrderAPI,
  updateOrderAPI,
  deleteOrderAPI,
} from "../apiService";

export const fetchOrders = createAsyncThunk(
  "orders/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getOrdersAPI();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Fetch orders failed");
    }
  }
);

export const createOrder = createAsyncThunk(
  "orders/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createOrderAPI(data);
      return res.data.data ?? res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Create order failed");
    }
  }
);

export const updateOrder = createAsyncThunk(
  "orders/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateOrderAPI(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Update order failed");
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "orders/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteOrderAPI(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Delete order failed");
    }
  }
);

const initialState = { items: [], loading: false, error: null };

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending,   (state)         => { state.loading = true; state.error = null; })
      .addCase(fetchOrders.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchOrders.rejected,  (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(createOrder.fulfilled, (state, action) => { state.items.push(action.payload); })
      .addCase(updateOrder.fulfilled, (state, action) => {
        const idx = state.items.findIndex((i) => i._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.items = state.items.filter((i) => i._id !== action.payload);
      });
  },
});

export default orderSlice.reducer;
