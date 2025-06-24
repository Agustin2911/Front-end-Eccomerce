import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchOrdersByUser = createAsyncThunk(
  "orders/fetchByUser",
  async (idUser) => {
    const response = await fetch(
      `http://localhost:1273/delivery-status/orders/${idUser}`
    );
    const data = await response.json();
    return data;
  }
);

// Función auxiliar para separar entregados y en progreso
const agruparPorEstado = (ordenes) => {
  const agrupadoPorPedido = {};

  ordenes.forEach((orden) => {
    const id = orden.id_sale;
    if (!agrupadoPorPedido[id]) agrupadoPorPedido[id] = [];
    agrupadoPorPedido[id].push(orden);
  });

  const entregados = [];
  const enProgreso = [];

  Object.values(agrupadoPorPedido).forEach((pedido) => {
    const todosEntregados = pedido.every(
      (item) => item.delivery_status.toLowerCase() === "entregado"
    );
    if (todosEntregados) entregados.push(pedido);
    else enProgreso.push(pedido);
  });

  return { entregados, enProgreso };
};

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    delivered: [],
    inProgress: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersByUser.fulfilled, (state, action) => {
        const { entregados, enProgreso } = agruparPorEstado(action.payload);
        state.delivered = entregados;
        state.inProgress = enProgreso;
        state.loading = false;
      })
      .addCase(fetchOrdersByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = "Error al obtener órdenes";
      });
  },
});

export default ordersSlice.reducer;
