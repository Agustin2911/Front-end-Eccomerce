// src/components/features/fetch/fetchCreateReview.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const postReview = createAsyncThunk(
  "createReview/postReview",
  async ({ text, stars, id_product }, { getState, rejectWithValue }) => {
    const { token, id_usuario } = getState().user;
    if (!token) {
      return rejectWithValue("No autorizado: sin token");
    }

    try {
      const reviewPayload = {
        text: text.trim(),
        stars: parseInt(stars),
        id_product: Number(id_product),
        id_user: id_usuario
      };

      console.log("Payload a enviar:", reviewPayload);


      const res = await fetch("http://localhost:1273/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reviewPayload),
      });

      if (!res.ok) {
        const errText = await res.text();
        return rejectWithValue(errText || `Error ${res.status}`);
      }

      const newReview = await res.json();
      return newReview;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const createReviewSlice = createSlice({
  name: "createReview",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetCreateReview(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(postReview.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(postReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetCreateReview } = createReviewSlice.actions;
export default createReviewSlice.reducer;
