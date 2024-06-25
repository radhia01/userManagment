import { createSlice } from "@reduxjs/toolkit";
import {
  getUsers,
  addUser,
  getRoles,
  deleteUser,
  getUser,
  updateUser,
  login,
  updatePassword,
  updateProfile,
} from "../actions/user";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    isLoading: false,
    roles: null,
    message: "",
    user: null,
    error: null,
    token: null,
    success: false,
    userInfo: null
  },
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
    resetError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.success = false;
      state.userInfo = null;
      state.token=null
    },
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.token = action.payload.token;
      state.success = action.payload.success;
      state.userInfo = action.payload.user;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // get all users
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload.data;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // add new user
    builder.addCase(addUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = [...state.users, action.payload.data];
      state.message = action.payload.message;
      state.success = true;
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // get roles
    builder.addCase(getRoles.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getRoles.fulfilled, (state, action) => {
      state.isLoading = false;
      state.roles = action.payload.data;
    });
    builder.addCase(getRoles.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // delete user
    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = state.users.filter(
        (element) => element._id !== action.payload.data._id
      );
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // get user
    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.data;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // update user profile
    builder.addCase(updateProfile.pending, (state) => {
      state.isLoading = true;
      state.message = null;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = state.users.map((element) =>
        element._id === action.payload.data._id ? action.payload.data : element
      );
      state.userInfo=action.payload.data
      state.message = action.payload.message;

    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    //  // update user
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
      state.message = null;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = state.users.map((element) =>
        element._id === action.payload.data._id ? action.payload.data : element
      );
      state.message = action.payload.message;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // update password
    builder.addCase(updatePassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updatePassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = state.users.map((el) =>
        el._id === action.payload.data._id ? action.payload : el
      );
      state.user = action.payload.data;
      state.message = action.payload.message;
      localStorage.setItem("userData", JSON.stringify(state.user));
    });
    builder.addCase(updatePassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function

export default userSlice.reducer;
export const { resetMessage, resetError, logout } = userSlice.actions;
