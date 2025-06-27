import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk para obtener productos
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    console.log("rrrrrrrr");
    try {
      const response = await fetch("http://localhost:1273/product");

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.message || "Error al obtener productos"
        );
      }

      const data = await response.json();
      console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa: " + data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Error de red");
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    filtered: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearProducts: (state) => {
      state.items = [];
      state.filtered = [];
      state.loading = false;
      state.error = null;
    },

    filterByCategory: (state, action) => {
      const categoryId = action.payload;
      state.filtered = state.items.filter((product) =>
        product.sub_categoryProductList.some(
          (subcat) => subcat.sub_category.category.id_category === categoryId
        )
      );
    },

    filterBySubcategory: (state, action) => {
      const subcategoryId = action.payload;
      state.filtered = state.items.filter((product) =>
        product.sub_categoryProductList.some(
          (subcat) => subcat.sub_category.id_sub_category === subcategoryId
        )
      );
    },

    updateProduct: (state, action) => {
      const updatedProduct = action.payload;
      const index = state.items.findIndex(
        (p) => p.id_product === updatedProduct.id_product
      );
      if (index !== -1) {
        state.items[index] = updatedProduct;
      }
    },
    showAllProducts: (state) => {
      state.filtered = state.items;
    },

    addProduct: (state, action) => {
      const newProduct = action.payload;
      state.items.push(newProduct);
    },

    deleteProduct: (state, action) => {
      const idToDelete = action.payload;
      console.log(action.payload)
      state.items = state.items.filter((p) => p.id_product !== idToDelete);
    },
    applyFilters: (state, action) => {
      const { order, minPrice, maxPrice } = action.payload;
      let filtered = [...state.items];

      if (minPrice) {
        filtered = filtered.filter((p) => p.price >= parseFloat(minPrice));
      }
      if (maxPrice) {
        filtered = filtered.filter((p) => p.price <= parseFloat(maxPrice));
      }
      if (order?.[0] === "asc") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (order?.[0] === "desc") {
        filtered.sort((a, b) => b.price - a.price);
      }

      state.filtered = filtered;
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
        console.log("se guardo bien la data de los productos:" + state.items);
        state.filtered = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error inesperado";
      });
  },
});

export const {
  clearProducts,
  filterByCategory,
  filterBySubcategory,
  updateProduct,
  addProduct,
  deleteProduct,
  showAllProducts,
  applyFilters,
} = productsSlice.actions;

export default productsSlice.reducer;
