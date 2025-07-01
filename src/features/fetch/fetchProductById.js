// src/features/fetch/fetchProductById.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk para obtener un producto por ID
export const fetchProductById = createAsyncThunk(
  "productById/fetchProductById",
  async (productId, { rejectWithValue }) => {
    try {
      console.log("🔍 Fetching product with ID:", productId);
      const res = await fetch(
        `http://localhost:1273/product/productById/${productId}`
      );
      if (!res.ok) {
        const txt = await res.text();
        return rejectWithValue(txt || `Error ${res.status}`);
      }
      const data = await res.json();
      console.log("✅ Product data received:", data);
      return data;
    } catch (err) {
      console.error("❌ Error fetching product:", err);
      return rejectWithValue(err.message);
    }
  }
);

// Thunk para obtener categoría y subcategoría de un producto
export const fetchProductCategorySubcategory = createAsyncThunk(
  "productById/fetchCategorySubcategory",
  async (productId, { rejectWithValue }) => {
    try {
      console.log("🔍 Fetching category/subcategory for product:", productId);
      const res = await fetch(
        `http://localhost:1273/product/category-subCategory/${productId}`
      );
      if (!res.ok) {
        const txt = await res.text();
        return rejectWithValue(txt || `Error ${res.status}`);
      }
      const data = await res.json();
      console.log("✅ Category/Subcategory data received:", data);
      return data;
    } catch (err) {
      console.error("❌ Error fetching category/subcategory:", err);
      return rejectWithValue(err.message);
    }
  }
);

// Thunk para obtener productos relacionados por categoría
export const fetchRelatedProducts = createAsyncThunk(
  "productById/fetchRelated",
  async (categoryId, { rejectWithValue }) => {
    try {
      console.log("🔍 Fetching related products for category:", categoryId);
      const res = await fetch(
        `http://localhost:1273/product/byCategoryid/${categoryId}`
      );
      if (!res.ok) {
        const txt = await res.text();
        return rejectWithValue(txt || `Error ${res.status}`);
      }
      const data = await res.json();
      console.log("✅ Related products data received:", data);
      return data;
    } catch (err) {
      console.error("❌ Error fetching related products:", err);
      return rejectWithValue(err.message);
    }
  }
);

const productByIdSlice = createSlice({
  name: "productById",
  initialState: {
    product: null,
    categorySubcategory: null,
    relatedProducts: [],
    loading: false,
    error: null,
    loadingCategorySubcategory: false,
    loadingRelated: false,
  },
  reducers: {
    clearProduct(state) {
      state.product = null;
      state.categorySubcategory = null;
      state.relatedProducts = [];
      state.loading = false;
      state.error = null;
      state.loadingCategorySubcategory = false;
      state.loadingRelated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProductById
      .addCase(fetchProductById.pending, (state) => {
        console.log("⏳ fetchProductById pending");
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        console.log("✅ fetchProductById fulfilled with:", action.payload);
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        console.error("❌ fetchProductById rejected:", action.payload);
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // fetchProductCategorySubcategory
      .addCase(fetchProductCategorySubcategory.pending, (state) => {
        state.loadingCategorySubcategory = true;
      })
      .addCase(fetchProductCategorySubcategory.fulfilled, (state, action) => {
        state.loadingCategorySubcategory = false;
        state.categorySubcategory = action.payload;
      })
      .addCase(fetchProductCategorySubcategory.rejected, (state, action) => {
        state.loadingCategorySubcategory = false;
        state.error = action.payload || action.error.message;
      })
      // fetchRelatedProducts
      .addCase(fetchRelatedProducts.pending, (state) => {
        state.loadingRelated = true;
      })
      .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
        state.loadingRelated = false;
        state.relatedProducts = action.payload;
      })
      .addCase(fetchRelatedProducts.rejected, (state, action) => {
        state.loadingRelated = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearProduct } = productByIdSlice.actions;
export default productByIdSlice.reducer;
