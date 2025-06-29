import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast, ToastContainer } from "react-toastify";
// 1) PATCH/PUT para modificar el producto
export const modifyProduct = createAsyncThunk(
  "modify/modifyProduct",
  async (
    {
      id_product,
      product_name,
      description,
      price,
      discount_state,
      discount,
      photo_url,
    },
    { getState, rejectWithValue }
  ) => {
    const { token } = getState().user;
    if (!token) return rejectWithValue("No autorizado: sin token");
    try {
      const res = await fetch("http://localhost:1273/product", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_product,
          product_name,
          description,
          price,
          discount_state,
          discount,
          photo_url,
        }),
      });
      
        

      if (!res.ok) {
        const txt = await res.text();
        return rejectWithValue(txt || `Error ${res.status}`);
      }

      
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// 2) PATCH/PUT para modificar el stock
export const modifyStock = createAsyncThunk(
  "modify/modifyStock",
  async ({ productId, delta }, { getState, rejectWithValue }) => {
    const { token } = getState().user;
    const id_shop = getState().userShops.shopsList[0];
    console.log(getState().userShops.selectedShopId);
   
    if (!token) return rejectWithValue("No autorizado: sin token");
    if (!id_shop) return rejectWithValue("No autorizado: sin tienda");
    try {
      const res = await fetch("http://localhost:1273/stock", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: { id_shop, id_product: productId },
          stock: Number(delta),
        }),
      });
      if (!res.ok) {
        const txt = await res.text();
        return rejectWithValue(txt || `Error ${res.status}`);
      }
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const modifySlice = createSlice({
  name: "modify",
  initialState: {
    product: null,
    stock: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearModify(state) {
      state.product = null;
      state.stock = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // modifyProduct
      .addCase(modifyProduct.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(modifyProduct.fulfilled, (s, a) => {
        s.loading = false;
        s.product = a.payload;
      })
      .addCase(modifyProduct.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload || a.error.message;
      })
      // modifyStock
      .addCase(modifyStock.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(modifyStock.fulfilled, (s, a) => {
        s.loading = false;
        s.stock = a.payload;
      })
      .addCase(modifyStock.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload || a.error.message;
      });
  },
});

export const { clearModify } = modifySlice.actions;
export default modifySlice.reducer;

