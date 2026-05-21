import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getMessageAPI } from "../apiService";

const initialState = {
  selectedUser: null,
  messages: [],
  loading: false,
  error: null,
};


// GET MESSAGES


export const getMessages = createAsyncThunk(
  "chat/getMessages",

  async ({ senderId, receiverId }, thunkAPI) => {
    try {
      const res = await getMessageAPI(senderId, receiverId);
      console.log(res);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);

const chatSlice = createSlice({
  name: "chat",

  initialState,

  reducers: {
    // SELECT USER

    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },

    // REALTIME NORMAL MESSAGE

    addRealtimeMessage: (state, action) => {
      console.log(action.payload);
      state.messages.push(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder

      // GET MESSAGES

      .addCase(
        getMessages.pending,

        (state) => {
          state.loading = true;
        },
      )

      .addCase(
        getMessages.fulfilled,

        (state, action) => {
          state.loading = false;

          state.messages = action.payload;
        },
      )

      .addCase(
        getMessages.rejected,

        (state, action) => {
          state.loading = false;

          state.error = action.payload;
        },
      );
  },
});

export const {
  setSelectedUser,

  addRealtimeMessage,

  //addBroadcastMessage,
} = chatSlice.actions;

export default chatSlice.reducer;
