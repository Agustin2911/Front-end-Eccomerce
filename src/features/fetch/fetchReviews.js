import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to fetch reviews for a specific product
export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (id_product, { rejectWithValue }) => {
    try {
      const resReviews = await fetch(
        `http://localhost:1273/review/${id_product}`
      );

      if (resReviews.ok) {
        const reviewJson = await resReviews.json();
        return reviewJson;
      } else if (resReviews.status === 412) {
        return []; // Return empty array for 412 status
      } else {
        const txt = await resReviews.text();
        return rejectWithValue(txt || `Error ${resReviews.status}`);
      }
    } catch (err) {
      console.warn("No se pudo obtener reviews. Asumiendo array vacío:", err);
      return []; // Return empty array on error, matching your current logic
    }
  }
);

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearReviews(state) {
      state.items = [];
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearReviews } = reviewsSlice.actions;
export default reviewsSlice.reducer;
