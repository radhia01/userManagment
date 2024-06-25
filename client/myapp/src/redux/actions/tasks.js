import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// get all tasks  by project
export const getTasksByProject = createAsyncThunk(
  "task/getTasksByProject",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://task-forge-backend.vercel.app/tasks/projects/${payload.id}`,
        {
          headers: {
            Authorization: `Bearer ${payload.token}`,
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
// add new task
export const addTask = createAsyncThunk(
  "task/addTask",
  async (payload, thunkAPI) => {
   
    try {
      const response = await axios.post(
        `https://task-forge-backend.vercel.app/tasks`,
        payload.data,
        {
          headers: {
            Authorization: `Bearer ${payload.token}`,
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
// delete task
export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (payload, thunkAPI) => {
  
    try {
      const response = await axios.delete(
        `https://task-forge-backend.vercel.app/tasks/${payload.id}`,
        {
          headers: {
            Authorization: `Bearer ${payload.token}`,
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
// // update task
export const updateTask = createAsyncThunk(
  "task/updateTask",
  async (payload, thunkAPI) => {
   
    try {
      const response = await axios.put(
        `https://task-forge-backend.vercel.app/tasks/${payload.id}`,
        payload.data,
        {
          headers: {
            Authorization: `Bearer ${payload.token}`,
          },
        }
      );
      const res = await response.data;

      return res;
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get all tasks
export const getTasks = createAsyncThunk(
  "task/getTasks",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://task-forge-backend.vercel.app/tasks/`,
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
