import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../user/userSlice";

export const registerUser = createAsyncThunk(
  "register/send",
  async ({ userType, formData }, { dispatch, rejectWithValue }) => {
    const url =
      userType === "seller"
        ? "http://localhost:1273/api/v1/auth/register/seller_user"
        : "http://localhost:1273/api/v1/auth/register/buyer_user";

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        return rejectWithValue(errorText);
      }

      const result = await response.json();

      if (result.access_token) {
        dispatch(
          login({
            id_usuario: result.id_user,
            image_path: result.photo_url,
            type: result.type,
            token: result.access_token,
          })
        );
        return "success";
      } else {
        return rejectWithValue("Registro fallido: faltan datos");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState: {
    userType: "buyer",
    loading: false,
    error: null,
    result: null,
  },
  reducers: {
    setUserType(state, action) {
      state.userType = action.payload;
    },
    resetRegister(state) {
      state.userType = "buyer";
      state.loading = false;
      state.error = null;
      state.result = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.result = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.result = "success";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error desconocido";
      });
  },
});

export const { setUserType, resetRegister } = registerSlice.actions;
export default registerSlice.reducer;
