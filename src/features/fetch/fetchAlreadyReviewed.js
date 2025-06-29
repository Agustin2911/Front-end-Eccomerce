// src/components/features/fetch/fetchAlreadyReviewed.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const checkAlreadyReviewed = createAsyncThunk(
  "alreadyReviewed/checkAlreadyReviewed",
  async (id_product, { getState, rejectWithValue }) => {
    const { token, id_usuario, type } = getState().user;
    
    // Solo ejecutar si tiene token y es buyer
    if (!token) {
      return rejectWithValue("No autorizado: sin token");
    }

    if (type !== 'buyer') {
      return false; // No es buyer, retornar false directamente
    }

    try {
      console.log("Verificando si ya hizo review:", { id_product, id_user: id_usuario, type });

      const res = await fetch(
        `http://localhost:1273/review/already-reviewed/${id_product}/${id_usuario}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const errText = await res.text();
        return rejectWithValue(errText || `Error ${res.status}`);
      }

      const alreadyReviewedData = await res.json();
      console.log("Respuesta already-reviewed:", alreadyReviewedData);
      return alreadyReviewedData;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
  {
    // Condición para evitar ejecutar el thunk si no hay token o no es buyer
    condition: (id_product, { getState }) => {
      const { token, type } = getState().user;
      return !!token && type === 'buyer';
    }
  }
);

const alreadyReviewedSlice = createSlice({
  name: "alreadyReviewed",
  initialState: {
    loading: false,
    error: null,
    hasReviewed: null,
  },
  reducers: {
    resetAlreadyReviewed(state) {
      state.loading = false;
      state.error = null;
      state.hasReviewed = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAlreadyReviewed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAlreadyReviewed.fulfilled, (state, action) => {
        state.loading = false;
        state.hasReviewed = action.payload;
      })
      .addCase(checkAlreadyReviewed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        state.hasReviewed = false; // En caso de error, asumir que no ha hecho review
      });
  },
});

export const { resetAlreadyReviewed } = alreadyReviewedSlice.actions;
export default alreadyReviewedSlice.reducer;
