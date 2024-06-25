import { createSlice } from "@reduxjs/toolkit";

import {
  getTasksByProject,
  addTask,
  deleteTask,
  updateTask,
  getTasks,
} from "../actions/tasks";
import { getPriorities } from "../actions/Priority";
import { getStatus } from "../actions/status";
export const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: null,
    isLoading: false,
    message: null,
    status: null,
    priorities: null,
  },
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // get all tasks
    builder.addCase(getTasks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks = action.payload.data;
    });
    builder.addCase(getTasks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // get all tasks by project
    builder.addCase(getTasksByProject.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTasksByProject.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks = action.payload.data;
    });
    builder.addCase(getTasksByProject.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    //  get status
    builder.addCase(getStatus.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.data;
    });
    builder.addCase(getStatus.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    //  get priorities
    builder.addCase(getPriorities.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPriorities.fulfilled, (state, action) => {
      state.isLoading = false;
      state.priorities = action.payload.data;
    });
    builder.addCase(getPriorities.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // add task
    builder.addCase(addTask.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks = [...state.tasks, action.payload.data];
      state.message = action.payload.message;
    });
    builder.addCase(addTask.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // delete task
    builder.addCase(deleteTask.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks = state.tasks.filter(
        (el) => el._id !== action.payload.data._id
      );
      state.message = action.payload.message;
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // update task
    builder.addCase(updateTask.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks = state.tasks.map((el) =>
        el._id === action.payload.data._id ? action.payload.data : el
      );
      state.message = action.payload.message;
    });
    builder.addCase(updateTask.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default taskSlice.reducer;
export const { resetMessage } = taskSlice.actions;
