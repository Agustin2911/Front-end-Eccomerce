// src/features/seller/sellerSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 1) Creamos el thunk para cargar los datos del seller
export const fetchSellerData = createAsyncThunk(
  "seller/fetchData",
  async (_, { getState, rejectWithValue }) => {
    const { token, id_usuario } = getState().user;
    if (!token) {
      return rejectWithValue("No autorizado: sin token");
    }

    const sellerId = Number(id_usuario);
    if (isNaN(sellerId)) {
      return rejectWithValue("ID de vendedor inválido");
    }

    try {
      const res = await fetch(
        `http://localhost:1273/seller_user/${sellerId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) {
        const text = await res.text();
        return rejectWithValue(
          text || `Error al cargar datos del seller: ${res.status}`
        );
      }
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const sellerSlice = createSlice({
  name: "seller",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    // opcional: para limpiar los datos al hacer logout, por ejemplo
    clearSellerData(state) {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSellerData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error al cargar datos del seller";
      });
  },
});

export const { clearSellerData } = sellerSlice.actions;
export default sellerSlice.reducer;

