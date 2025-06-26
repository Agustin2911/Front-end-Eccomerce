import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  items: [],
  total: 0,
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
          existing.amount += item.amount;
        } else {
          existing.amount += 1;
        }
      } else {
        if (extraFlag) {
          state.items.push(item);
        } else {
          item.amount = 1;
          state.items.push(item);
        }
      }

      state.total = state.items.reduce((acc, i) => acc + i.price * i.amount, 0);
      toast.success("se agrego el producto al carrito exitosamente", {
        autoClose: 2500,
        theme: "colored",
      });
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
    },

    clearCart(state) {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, decrementFromCart, clearCart, deleteProduct } =
  cartSlice.actions;
export default cartSlice.reducer;
