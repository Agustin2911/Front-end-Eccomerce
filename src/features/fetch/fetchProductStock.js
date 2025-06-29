import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 1) Thunk para obtener el stock de un solo producto
export const fetchProductStock = createAsyncThunk(
  "stock/fetchByProduct",
  async (productId, { rejectWithValue }) => {
    
    try {
      const res = await fetch(
        `http://localhost:1273/stock/${productId}`  // endpoint para un stock
        
      );
      if (!res.ok) {
        const txt = await res.text();
        return rejectWithValue(txt || `Error ${res.status}`);
      }
      const data = await res.json();
      return data; // p.ej. { id_product, stock_entry, stock_warning, ... }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const stockSlice = createSlice({
  name: "stock",
  initialState: {
    item: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearStock(state) {
      state.item = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductStock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductStock.fulfilled, (state, action) => {
        state.loading = false;
        state.item = action.payload;
      })
      .addCase(fetchProductStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearStock } = stockSlice.actions;
export default stockSlice.reducer;
