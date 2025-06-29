import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 1) Thunk para obtener todos los stocks
export const fetchAllStocks = createAsyncThunk(
  "stocks/fetchAll",
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().user;
    if (!token) {
      return rejectWithValue("No autorizado: sin token");
    }
    try {
      const res = await fetch("http://localhost:1273/stock/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const txt = await res.text();
        return rejectWithValue(txt || `Error ${res.status}`);
      }
      const data = await res.json();
      return data; // espero un array de { id_product, amount, stock_warning, shop, ... }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const stocksSlice = createSlice({
  name: "stocks",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearStocks(state) {
      state.items = [];
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllStocks.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchAllStocks.fulfilled, (s, action) => {
        s.loading = false;
        s.items = action.payload;
      })
      .addCase(fetchAllStocks.rejected, (s, action) => {
        s.loading = false;
        s.error = action.payload || action.error.message;
      });
  },
});

export const { clearStocks } = stocksSlice.actions;
export default stocksSlice.reducer;

