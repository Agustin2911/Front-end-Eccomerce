// src/features/fetch/fetchUserShops.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 1) thunk para cargar las shops del usuario
export const fetchUserShops = createAsyncThunk(
  "userShops/fetchUserShops",
  async (_, { getState, rejectWithValue }) => {
    const { token, id_usuario } = getState().user;
    console.log(id_usuario)
    if (!id_usuario) {
      return rejectWithValue("No autorizado: sin ID de usuario");
    }
    if (!token) {
      return rejectWithValue("No autorizado: sin token");
    }

    try {
      const res = await fetch(
        `http://localhost:1273/seller_user/shops/${id_usuario}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        const text = await res.text();
        return rejectWithValue(
          text || `Error al cargar tiendas: ${res.status}`
        );
      }
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const userShopsSlice = createSlice({
  name: "userShops",
  initialState: {
    shopsList: [],        // array de shops
    selectedShopId: null, // guardaremos el primero si existe
    loading: false,
    error: null,
  },
  reducers: {
    // opcional: para limpiar
    clearUserShops(state) {
      state.shopsList = [];
      state.selectedShopId = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserShops.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserShops.fulfilled, (state, action) => {
        state.loading = false;
        state.shopsList = action.payload;
        if (Array.isArray(action.payload) && action.payload.length > 0) {
          state.selectedShopId = action.payload[0];
        }
      })
      .addCase(fetchUserShops.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error al cargar tiendas";
      });
  },
});

export const { clearUserShops } = userShopsSlice.actions;
export default userShopsSlice.reducer;

