import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const registerProduct = createAsyncThunk(
  "product/register",
  async (
    { nombre, descripcion, precio, stockAct, stockMin, subcategoria, imageFile },
    { getState, rejectWithValue }
  ) => {
    const { token } = getState().user;
    if (!token) {
      return rejectWithValue("No autorizado");
    }

    try {
      const resSub = await fetch(
        `http://localhost:1273/sub_categories/name/${encodeURIComponent(subcategoria)}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!resSub.ok) {
        throw new Error(`Error subcat: ${resSub.status}`);
      }
      const id_sub_category = await resSub.json();

      const formData = new FormData();
      formData.append("product_name", nombre.trim());
      formData.append("price", precio);
      formData.append("description", descripcion.trim());
      formData.append("discount_state", "false");
      formData.append("discount", 0);
      formData.append("id_sub_category", id_sub_category);
      formData.append("photo_url", imageFile);

      const resProd = await fetch("http://localhost:1273/product", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!resProd.ok) {
        const errText = await resProd.text();
        throw new Error(`Error crear producto: ${errText}`);
      }
      const prodData = await resProd.json();

      const stockPayload = {
        id: prodData.id_product,
        stock_entry: stockAct,
        shop: getState().userShops.selectedShopId, // o como tengas guardado el shopId
        stock_warning: stockMin,
      };
      const resStock = await fetch("http://localhost:1273/stock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(stockPayload),
      });
      if (!resStock.ok) {
        const errText = await resStock.text();
        throw new Error(`Error crear stock: ${errText}`);
      }

      return prodData;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const registerSlice = createSlice({
  name: "registerProduct",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetRegister(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (b) => {
    b.addCase(registerProduct.pending, (s) => {
      s.loading = true;
      s.error = null;
      s.success = false;
    })
     .addCase(registerProduct.fulfilled, (s) => {
       s.loading = false;
       s.success = true;
     })
     .addCase(registerProduct.rejected, (s, a) => {
       s.loading = false;
       s.error = a.payload || a.error.message;
     });
  },
});

export const { resetRegister } = registerSlice.actions;
export default registerSlice.reducer;

