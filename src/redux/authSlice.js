import { createSlice } from "@reduxjs/toolkit";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";

import {
  actualAuth,
  logOutUserThunk,
  loginUserThunk,
  registerUserThunk,
  updateAuthThunk,
} from "./operations";

const authState = {
  isLoading: false,
  error: null,
  userData: null,
  token: null,
  authentificated: false,
};

const resetState = (state) => {
  state.isLoading = false;
  state.error = null;
  state.userData = null;
  state.token = null;
  state.authentificated = false;
};

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  extraReducers: (builder) =>
    builder
      // ----- REGISTER -----
      .addCase(registerUserThunk.pending, handlePending)
      .addCase(registerUserThunk.rejected, handleRejected)
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authentificated = true;
        state.error = null;
        state.userData = action.payload;
        state.token = action.payload.accessToken;
      })

      // ----- LOGIN -----
      .addCase(loginUserThunk.pending, handlePending)
      .addCase(loginUserThunk.rejected, handleRejected)
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authentificated = true;
        state.error = null;
        state.userData = action.payload;
        state.token = action.payload.accessToken;
      })

      // ----- CHANGE -----
      .addCase(actualAuth.pending, handlePending)
      .addCase(actualAuth.rejected, handleRejected)
      .addCase(actualAuth.fulfilled, (state, action) => {
        if (!action.payload) {
          return resetState(state);
        }
        state.isLoading = false;
        state.authentificated = true;
        state.error = null;
        state.userData = action.payload;
        state.token = action.payload.accessToken;
      })

      // ----- LOGOUT -----
      .addCase(logOutUserThunk.pending, handlePending)
      .addCase(logOutUserThunk.rejected, handleRejected)
      .addCase(logOutUserThunk.fulfilled, (state) => {
        resetState(state);
      })
      // ----- UPDATE -----
      .addCase(updateAuthThunk.pending, handlePending)
      .addCase(updateAuthThunk.rejected, handleRejected)
      .addCase(updateAuthThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.userData.photoURL = action.payload.photoURL;
      }),
});

const persistConfiAuth = {
  key: "auth",
  storage: AsyncStorage,
};

export const authReducer = persistReducer(persistConfiAuth, authSlice.reducer);

export const selectIsLoading = (state) => state.auth.isLoading;
export const selectIsError = (state) => state.auth.error;
export const selectToken = (state) => state.auth.token;
export const selectData = (state) => state.auth.userData;
export const selectUserId = (state) => state.auth.userData?.uid;
export const selectIsAuthentificated = (state) => state.auth.authentificated;
