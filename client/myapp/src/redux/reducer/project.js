import { createSlice } from "@reduxjs/toolkit";
import {
  addProject,
  deleteProject,
  getProject,
  getProjects,
  addUserToProject,
  getUsersFromProject,
  updateProject,
  removeUserFromProject,
} from "../actions/project";
export const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
    isLoading: false,
    message: null,
    project: null,
    participants: null,
    users: null,
    error:null
  },
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // add new project
    builder.addCase(addProject.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addProject.fulfilled, (state, action) => {
      state.isLoading = false;
      state.projects = [...state.projects, action.payload.data];
      state.message = action.payload.message;
    });
    builder.addCase(addProject.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // get project by id
    builder.addCase(getProject.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProject.fulfilled, (state, action) => {
      state.isLoading = false;
      state.project = action.payload.data;
    });
    builder.addCase(getProject.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // get projects
    builder.addCase(getProjects.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProjects.fulfilled, (state, action) => {
      state.isLoading = false;
      state.projects = action.payload.data;
    });
    builder.addCase(getProjects.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // delete project
    builder.addCase(deleteProject.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProject.fulfilled, (state, action) => {
      state.isLoading = false;
      state.projects = state.projects.filter(
        (element) => element._id !== action.payload.data._id
      );
  });
    builder.addCase(deleteProject.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // add user to project
    builder.addCase(addUserToProject.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addUserToProject.fulfilled, (state, action) => {
      state.isLoading = false;
      state.participants = [...state.participants, action.payload.data];
      state.message = action.payload.message;
    });
    builder.addCase(addUserToProject.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // get users affected to a project
    builder.addCase(getUsersFromProject.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUsersFromProject.fulfilled, (state, action) => {
      state.isLoading = false;
      state.participants = action.payload.data;
    });
    builder.addCase(getUsersFromProject.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // update project
    builder.addCase(updateProject.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateProject.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
      state.projects = state.projects.map((element) =>
        element._id === action.payload.data._id ? action.payload.data : element
      );
    });
    builder.addCase(updateProject.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // remove user from project
    builder.addCase(removeUserFromProject.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(removeUserFromProject.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload.message);
      state.message = action.payload.message;
      state.participants = state.participants.filter(
        (element) => element._id !== action.payload.data._id
      );
    });
    builder.addCase(removeUserFromProject.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default projectSlice.reducer;
export const { resetMessage,resetError } = projectSlice.actions;
