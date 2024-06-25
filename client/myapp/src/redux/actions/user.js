import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// login
export const login = createAsyncThunk(
  "user/login",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post("https://task-forge-backend.vercel.app/login", payload);
      return response.data;
    } catch (error) {
      if (error.response.data.message) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);
// get users list
export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get("https://task-forge-backend.vercel.app/users", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      return response.data;
    } catch (error) {
      if (error.response.data.message) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);
// add new user
export const addUser = createAsyncThunk(
  "user/addUser",
  async (payload, thunkAPI) => {
    console.log(payload)
    const token = payload.token;
    try {
      const response = await axios.post(
        "https://task-forge-backend.vercel.app/users",
        payload.userDetails,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
  }
);
// get all roles
export const getRoles = createAsyncThunk(
  "user/getRoles",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get("https://task-forge-backend.vercel.app/roles", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response.data.message) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);
// delete user
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (payload, thunkAPI) => {
    const token = payload.token;
    try {
      const response = await axios.delete(
        `https://task-forge-backend.vercel.app/users/${payload.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// get user by id
export const getUser = createAsyncThunk(
  "user/getUser",
  async (payload, thunkAPI) => {
    const token = payload.token;
    try {
      const response = await axios.get(
        `https://task-forge-backend.vercel.app/users/${payload.id}`,
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
  }
);
// update user
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (payload, thunkAPI) => {
    const token = payload.token;
    try {
      const response = await axios.patch(
        `https://task-forge-backend.vercel.app/users/${payload.id}`,
        payload.userdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
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
  }
);
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (payload, thunkAPI) => {
    const token = payload.token;
    try {
      const response = await axios.patch(
        `https://task-forge-backend.vercel.app/users/${payload.id}`,
        payload.userdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data)
      return response.data;
    } catch (error) {
      if (error.response.data.message) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

// update password
export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (payload, thunkAPI) => {
    const token = payload.token;
    try {
      const response = await axios.patch(
        `https://task-forge-backend.vercel.app/users/update/password/${payload.id}`,
        payload.data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
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
  }
);
