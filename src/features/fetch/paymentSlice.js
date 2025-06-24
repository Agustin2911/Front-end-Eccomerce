import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearCart } from "../cart/cartSlice";
import { useSelector } from "react-redux";

export const processPayment = createAsyncThunk(
  "payment/process",
  async (
    { user, checkout, total },
    { dispatch, rejectWithValue, getState }
  ) => {
    const state = getState();
    const cart = state.cart.items;
    const storeMap = {
      "Sucursal Centro": "Av. Siempre Viva 123",
      "Sucursal Norte": "Calle Norte 456",
      "Sucursal Sur": "Calle Sur 789",
    };

    const direccion =
      checkout.takeawayType === "delivery"
        ? checkout.address
        : storeMap[checkout.selectedStore] || "Dirección genérica";

    const saleData = {
      total_price: Math.round(total),
      id_user: user.id_usuario,
      sale_date: new Date().toISOString(),
      items: cart.map((item) => ({
        id_product: item.id_product,
        amount: -item.amount,
      })),
      id_shop: 1,
      delivery_type:
        checkout.takeawayType === "delivery" ? "Envio" : "Takeaway",
      address: direccion,
      delivery_status: "Pendiente",
    };

    console.log("info del carrito" + saleData.total_price);
    console.log("info del carrito" + saleData.id_user);
    console.log("info del carrito" + saleData.sale_date);
    console.log("info del carrito" + saleData.items);
    console.log("info del carrito" + saleData.id_shop);
    console.log("info del carrito" + saleData.delivery_type);
    console.log("info del carrito" + saleData.address);
    console.log("info del carrito" + saleData.delivery_status);
    console.log("direccion:" + direccion);
    try {
      const res = await fetch("http://localhost:1273/sale", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(saleData),
      });

      if (!res.ok) {
        const error = await res.json();
        alert("hubo un error en la compra");
        console.log("el error fue " + error);
        return rejectWithValue(error);
      }

      dispatch(clearCart());
      return await res.json();
    } catch (err) {
      return rejectWithValue({ message: "Error de red al procesar el pago" });
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    status: "idle", // 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(processPayment.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(processPayment.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Error inesperado";
      });
  },
});

export default paymentSlice.reducer;
