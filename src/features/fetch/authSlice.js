import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../user/userSlice";

export const authenticateUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:1273/api/v1/auth/authenticate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const data = await response.json();

      dispatch(
        login({
          id_usuario: data.id_user,
          image_path: data.photo_url,
          type: data.type,
          token: data.access_token,
        })
      );

      return "success";
    } catch (error) {
      return rejectWithValue(error.message || "Error desconocido");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: "",
    password: "",
    loading: false,
    error: null,
    result: null,
  },
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    resetAuth(state) {
      state.email = "";
      state.password = "";
      state.loading = false;
      state.error = null;
      state.result = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.result = null;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.result = null;
      });
  },
});

export const { setEmail, setPassword, resetAuth } = authSlice.actions;
export default authSlice.reducer;
