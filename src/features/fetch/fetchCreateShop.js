// src/features/fetch/fetchCreateShop.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk para crear una tienda
export const createShop = createAsyncThunk(
  "shops/createShop",
  async (
    { city, street },
    { getState, rejectWithValue }
  ) => {
    const { token, id_usuario } = getState().user;
    if (!token) {
      return rejectWithValue("No autorizado: sin token");
    }

    try {
      const payload = {
        id_user: id_usuario,
        city: city.trim(),
        street: street.trim(),
      };

      const res = await fetch("http://localhost:1273/shops", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        return rejectWithValue(
          errorText || `Error al crear la tienda: ${res.status}`
        );
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const createShopSlice = createSlice({
  name: "createShop",
  initialState: {
    loading: false,
    error: null,
    success: false,
    shop: null,
  },
  reducers: {
    resetCreateShop(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.shop = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createShop.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createShop.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.shop = action.payload;
      })
      .addCase(createShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetCreateShop } = createShopSlice.actions;
export default createShopSlice.reducer;

