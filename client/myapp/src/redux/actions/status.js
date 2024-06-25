import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// get all status
export const getStatus = createAsyncThunk("GET_Status", async (token, thunkAPI) => {
   
  try {

    const response = await axios.get(
      `https://task-forge-backend.vercel.app/status`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response.data.message) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
});
