// src/features/fetch/fetchDeleteProduct.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Thunk para eliminar un producto
export const deleteProductFetch = createAsyncThunk(
  "product/deleteProduct",
  async (
    id,
    { getState, rejectWithValue }
  ) => {
    const { token } = getState().user;
    if (!token) {
      toast.error("No autorizado: sin token", { autoClose: 2500 });
      return rejectWithValue("No autorizado: sin token");
    }

    try {
      const res = await fetch(`http://localhost:1273/product/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        toast.error(
          "Ocurrió un error al eliminar el producto. Revisa la consola para más detalles.",
          { autoClose: 2500 }
        );
        return rejectWithValue(
          errorText || `Error al eliminar producto: ${res.status}`
        );
      }

      toast.success("¡Producto eliminado con éxito!", { autoClose: 2500 });
      // Devolvemos el id para poder limpiar la lista en el store
      return id;
    } catch (err) {
      toast.error("Hubo un problema de conexión al eliminar el producto.", { autoClose: 2500 });
      return rejectWithValue(err.message);
    }
  }
);

const deleteProductSlice = createSlice({
  name: "deleteProductFetch",
  initialState: {
    loading: false,
    error: null,
    success: false,
    deletedId: null,
  },
  reducers: {
    resetDeleteProduct(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.deletedId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteProductFetch.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.deletedId = null;
      })
      .addCase(deleteProductFetch.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.deletedId = action.payload;
      })
      .addCase(deleteProductFetch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetDeleteProduct } = deleteProductSlice.actions;
export default deleteProductSlice.reducer;

