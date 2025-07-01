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
    currentCategory: null,
    currentSubcategory: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearProducts: (state) => {
      state.items = [];
      state.filtered = [];
      state.currentCategory = null;
      state.currentSubcategory = null;
      state.loading = false;
      state.error = null;
    },

    filterByCategory: (state, action) => {
      const categoryId = action.payload;
      state.currentCategory = categoryId;
      state.currentSubcategory = null; // Limpiar subcategoría
      state.filtered = state.items.filter((product) =>
        product.sub_categoryProductList.some(
          (subcat) => subcat.sub_category.category.id_category === categoryId
        )
      );
    },

    filterBySubcategory: (state, action) => {
      const subcategoryId = action.payload;
      state.currentSubcategory = subcategoryId;
      state.currentCategory = null; // Limpiar categoría
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
      state.currentCategory = null;
      state.currentSubcategory = null;
      state.filtered = state.items;
    },

    addProduct: (state, action) => {
      const newProduct = action.payload;
      state.items.push(newProduct);
    },

    deleteProduct: (state, action) => {
      const idToDelete = action.payload;
      state.items = state.items.filter((p) => p.id_product !== idToDelete);
    },

    // FUNCIÓN CORREGIDA - Aplica filtros solo a productos ya filtrados por categoría/subcategoría
    applyFilters: (state, action) => {
      const { order, minPrice, maxPrice } = action.payload;
      
      console.log("Aplicando filtros:", { order, minPrice, maxPrice }); // Debug
      
      // Empezar con productos filtrados por categoría/subcategoría
      let baseProducts = [];
      
      if (state.currentSubcategory) {
        baseProducts = state.items.filter((product) =>
          product.sub_categoryProductList.some(
            (subcat) => subcat.sub_category.id_sub_category === state.currentSubcategory
          )
        );
      } else if (state.currentCategory) {
        baseProducts = state.items.filter((product) =>
          product.sub_categoryProductList.some(
            (subcat) => subcat.sub_category.category.id_category === state.currentCategory
          )
        );
      } else {
        baseProducts = state.items;
      }
      
      // Aplicar filtros de precio sobre la base filtrada
      let filteredProducts = [...baseProducts]; // Crear copia para no mutar
      
      if (minPrice && minPrice !== "") {
        filteredProducts = filteredProducts.filter((p) => p.price >= parseFloat(minPrice));
      }
      if (maxPrice && maxPrice !== "") {
        filteredProducts = filteredProducts.filter((p) => p.price <= parseFloat(maxPrice));
      }
      
      // ORDENAMIENTO CORREGIDO
      if (order) {
        console.log("Ordenando por:", order); // Debug
        if (order === "asc") {
          filteredProducts.sort((a, b) => {
            const priceA = parseFloat(a.price);
            const priceB = parseFloat(b.price);
            return priceA - priceB; // Menor a mayor
          });
        } else if (order === "desc") {
          filteredProducts.sort((a, b) => {
            const priceA = parseFloat(a.price);
            const priceB = parseFloat(b.price);
            return priceB - priceA; // Mayor a menor
          });
        }
      }

      console.log("Productos después del filtro:", filteredProducts.length); // Debug
      state.filtered = filteredProducts;
    },

    // NUEVA FUNCIÓN - Para limpiar solo filtros de precio/orden, manteniendo categoría/subcategoría
    clearPriceFilters: (state) => {
      // Volver a aplicar solo el filtro de categoría/subcategoría
      if (state.currentSubcategory) {
        state.filtered = state.items.filter((product) =>
          product.sub_categoryProductList.some(
            (subcat) => subcat.sub_category.id_sub_category === state.currentSubcategory
          )
        );
      } else if (state.currentCategory) {
        state.filtered = state.items.filter((product) =>
          product.sub_categoryProductList.some(
            (subcat) => subcat.sub_category.category.id_category === state.currentCategory
          )
        );
      } else {
        state.filtered = state.items;
      }
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
  clearPriceFilters,
} = productsSlice.actions;

export default productsSlice.reducer;
