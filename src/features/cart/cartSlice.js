import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
// IMPORTAR la acción logout del userSlice
import { logout } from "../user/userSlice"; // Ajusta la ruta según tu estructura de carpetas

const initialState = {
  items: [],
  total: 0,
  stockValidation: {
    isValid: true,
    invalidProducts: [],
    loading: false,
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { item, extraFlag } = action.payload;
      const existing = state.items.find(
        (i) => i.id_product === item.id_product
      );

      if (existing) {
        if (extraFlag) {
          existing.amount += item.amount || 1;
        } else {
          existing.amount += 1;
        }
      } else {
        if (extraFlag) {
          const itemWithAmount = { ...item, amount: item.amount || 1 };
          state.items.push(itemWithAmount);
        } else {
          state.items.push({ ...item, amount: 1 });
        }
      }

      state.total = state.items.reduce((acc, i) => acc + i.price * i.amount, 0);
      
      toast.success("Se agregó el producto al carrito exitosamente", {
        autoClose: 2500,
        theme: "colored",
      });
    },

    // Incrementar cantidad con validación de stock
    incrementCartItem(state, action) {
      const { id, maxStock } = action.payload;
      const item = state.items.find((i) => i.id_product === id);
      
      if (item && item.amount < maxStock) {
        item.amount += 1;
        state.total = state.items.reduce((acc, i) => acc + i.price * i.amount, 0);
      } else if (item && item.amount >= maxStock) {
        toast.warning(`No hay más stock disponible para este producto (máximo: ${maxStock})`, {
          autoClose: 2500,
        });
      }
    },

    decrementFromCart(state, action) {
      const id = action.payload;
      const item = state.items.find((i) => i.id_product === id);

      if (item) {
        item.amount--;
        if (item.amount <= 0) {
          state.items = state.items.filter((i) => i.id_product !== id);
        }
      }

      state.total = state.items.reduce((acc, i) => acc + i.price * i.amount, 0);
    },

    deleteProduct(state, action) {
      const id = action.payload;
      state.items = state.items.filter((i) => i.id_product !== id);
      
      state.total = state.items.reduce((acc, i) => acc + i.price * i.amount, 0);
    },

    clearCart(state) {
      state.items = [];
      state.total = 0;
      state.stockValidation = {
        isValid: true,
        invalidProducts: [],
        loading: false,
      };
    },

    // Acciones para validación de stock
    setStockValidationLoading(state, action) {
      state.stockValidation.loading = action.payload;
    },

    setStockValidationResult(state, action) {
      const { isValid, invalidProducts } = action.payload;
      state.stockValidation.isValid = isValid;
      state.stockValidation.invalidProducts = invalidProducts;
      state.stockValidation.loading = false;
    },

    // Actualizar cantidad específica de un item
    updateCartItemQuantity(state, action) {
      const { id, quantity, maxStock } = action.payload;
      const item = state.items.find((i) => i.id_product === id);
      
      if (item) {
        if (quantity <= maxStock && quantity > 0) {
          item.amount = quantity;
          state.total = state.items.reduce((acc, i) => acc + i.price * i.amount, 0);
        } else if (quantity > maxStock) {
          item.amount = maxStock;
          state.total = state.items.reduce((acc, i) => acc + i.price * i.amount, 0);
          toast.warning(`Cantidad ajustada al stock disponible: ${maxStock}`, {
            autoClose: 2500,
          });
        }
      }
    },
  },

  // NUEVO: extraReducers para escuchar la acción logout del userSlice
  extraReducers: (builder) => {
    builder
      .addCase(logout, (state) => {
        // Limpiar carrito automáticamente cuando el usuario hace logout
        console.log("🛒 Limpiando carrito por logout del usuario");
        state.items = [];
        state.total = 0;
        state.stockValidation = {
          isValid: true,
          invalidProducts: [],
          loading: false,
        };
      });
  },
});

export const { 
  addToCart, 
  incrementCartItem,
  decrementFromCart, 
  clearCart, 
  deleteProduct,
  setStockValidationLoading,
  setStockValidationResult,
  updateCartItemQuantity
} = cartSlice.actions;

export default cartSlice.reducer;
