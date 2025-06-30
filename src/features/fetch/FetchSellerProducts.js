import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchSellerProducts = createAsyncThunk(
  "products/fetchSellerProducts",
  async (_, { getState, rejectWithValue }) => {
    const {token, id_usuario} = getState().user;

    if (!token) {
      return rejectWithValue("No autorizado: sin token");
    }

    const sellerId = parseInt(id_usuario);

    try {
      const res = await fetch(
        `http://localhost:1273/seller_user/my-products/${id_usuario}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const text = await res.text();
        return rejectWithValue(text || "Error al cargar productos del vendedor");
      }

      return await res.json();
    } catch (err) {
      // redirijo error de red u otro
      return rejectWithValue(err.message);
    }
  }
);

const sellerProductsSlice = createSlice({
  name: "sellerProducts",
  initialState: {

    sellerList: [],      
    sellerLoading: false,
    sellerError: null,
  },
 reducers: {
    // <-- aquí agregamos el reset
    resetList(state) {
      state.sellerList = [];
      state.sellerLoading = false;
      state.sellerError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerProducts.pending, (state) => {
        state.sellerLoading = true;
        state.sellerError = null;
      })
      .addCase(fetchSellerProducts.fulfilled, (state, action) => {
        state.sellerLoading = false;
        state.sellerList = action.payload;
       
      })
      .addCase(fetchSellerProducts.rejected, (state, action) => {
        state.sellerLoading = false;
        state.sellerError = action.payload || "Error al cargar productos del vendedor";
      });
  },
});
export const { resetList } = sellerProductsSlice.actions;
export default sellerProductsSlice.reducer;
