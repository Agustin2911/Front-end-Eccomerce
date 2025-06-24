/*import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchModifyStock = createAsyncThunk(
  "products/fetchModifyStock",
  async (_, { getState, rejectWithValue }) => {
    const {token, id_usuario} = getState().user;

    if (!token) {
      return rejectWithValue("No autorizado: sin token");
    }

    const sellerId = parseInt(id_usuario);

    try {
      const res = await fetch(
        `http://localhost:1273/seller_user/my-products/${sellerId}`,
        {
          method: "PUT",
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
  reducers: {},
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

export default sellerProductsSlice.reducer;*/
