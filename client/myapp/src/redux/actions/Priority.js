import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPriorities = createAsyncThunk(
  "priority/getPriorities",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://task-forge-backend.vercel.app/priorities`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      const res = await response.data;
      return res;
    } catch (error) {
      if (error.response.data.message) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);
