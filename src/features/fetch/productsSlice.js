import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk para obtener productos dinámicamente
export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async ({ categoryId, subCategoryId, searchTerm }, { rejectWithValue }) => {
    let endpoint = "";

    if (searchTerm?.trim()) {
      endpoint = `http://localhost:1273/product`;
    } else if (subCategoryId) {
      endpoint = `http://localhost:1273/product/bySubCategoryid/${subCategoryId}`;
    } else if (categoryId) {
      endpoint = `http://localhost:1273/product/byCategoryid/${categoryId}`;
    } else {
      endpoint = `http://localhost:1273/product`;
    }

    try {
      const response = await fetch(endpoint);

      const data = await response.json();

      // Si es búsqueda por nombre, filtramos en cliente
      if (searchTerm?.trim()) {
        const lower = searchTerm.toLowerCase();
        return data.filter((p) => p.product_name.toLowerCase().includes(lower));
      }

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearProducts(state) {
      state.items = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error al obtener productos";
        state.items = [];
      });
  },
});

export const { clearProducts } = productsSlice.actions;
export default productsSlice.reducer;
