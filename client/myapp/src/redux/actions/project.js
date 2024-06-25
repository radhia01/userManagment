import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// add new project
export const addProject = createAsyncThunk(
  "project/addProject",
  async (payload, thunkAPI) => {
    const token = payload.token;
    try {
      const response = await axios.post(
        "https://task-forge-backend.vercel.app/projects",
        payload.project,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
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
// get all projects
export const getProjects = createAsyncThunk(
  "project/getProjects",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://task-forge-backend.vercel.app/projects`,
        {
          headers: {
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
// get project by id
export const getProject = createAsyncThunk(
  "project/getProject",
  async (id, thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `https://task-forge-backend.vercel.app/projects/${id}`,
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

// delete project
export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/projects/${payload.id}`,
        {
          headers: {
            Authorization: `Bearer ${payload.token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
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
// add user to project
export const addUserToProject = createAsyncThunk(
  "project/addUserToProject",
  async (payload, thunkAPI) => {
    try {
    
      const response = await axios.get(
        `https://task-forge-backend.vercel.app/users/${payload.userId}/projects/${payload.id}`,
        {
          headers: {
            Authorization: `Bearer ${payload.token}`,
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
// get users affected to a project
export const getUsersFromProject = createAsyncThunk(
  "project/getUsersFromProject",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://task-forge-backend.vercel.app/users/project/${payload.id}`,
        {
          headers: {
            Authorization: `Bearer ${payload.token}`,
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
// remove participant from project
export const removeUserFromProject = createAsyncThunk(
  "project/removeUserFromProject",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.delete(
        `https://task-forge-backend.vercel.app/users/${payload.iduser}/projects/${payload.idproject}`,
        {
          headers: {
            Authorization: `Bearer ${payload.token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
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
// update project
export const updateProject = createAsyncThunk(
  "project/updateProject",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.put(
        `https://task-forge-backend.vercel.app/projects/${payload.idproject}`,
        payload.project,
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
