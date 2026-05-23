import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsersAPI, deleteUserAPI } from "../apiService";

const initialState = { items: [], loading: false, error: null };

// Admin only
export const fetchUsers = createAsyncThunk(
  "users/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUsersAPI();
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch users failed",
      );
    }
  },
);

export const deleteUsers = createAsyncThunk(
  "products/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteUserAPI(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  },
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteUsers.fulfilled, (state, action) => {
        state.items = state.items.filter((i) => i._id !== action.payload);
      });
  },
});

export default userSlice.reducer;
