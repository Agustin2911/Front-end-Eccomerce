// src/components/features/fetch/fetchCanPostReview.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const canPostReview = createAsyncThunk(
  "canPostReview/canPostReview",
  async (id_product, { getState, rejectWithValue }) => {
    const { token, id_usuario, type } = getState().user;
    
    if (!token) {
      return rejectWithValue("No autorizado: sin token");
    }

    try {
      // Determinar el id_user según el tipo de cuenta
      let id_user;
      if (type === 'seller' || type === 'admin') {
        id_user = 0; // Enviar 0 para vendedores y admins
      } else {
        id_user = id_usuario; // Enviar el ID real para buyers
      }

      console.log("Verificando permisos para:", { id_product, id_user, type });

      const res = await fetch(
        `http://localhost:1273/review/can-post-review/${id_product}/${id_user}`,
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

      const canPostData = await res.json();
      return canPostData;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const canPostReviewSlice = createSlice({
  name: "canPostReview",
  initialState: {
    loading: false,
    error: null,
    canPost: null,
  },
  reducers: {
    resetCanPostReview(state) {
      state.loading = false;
      state.error = null;
      state.canPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(canPostReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(canPostReview.fulfilled, (state, action) => {
        state.loading = false;
        state.canPost = action.payload;
      })
      .addCase(canPostReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        state.canPost = { canPost: false, reason: "Error al verificar permisos" };
      });
  },
});

export const { resetCanPostReview } = canPostReviewSlice.actions;
export default canPostReviewSlice.reducer;
