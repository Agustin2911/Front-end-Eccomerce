import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: "",
  verifyAddress: false,
  takeawayType: "local",
  selectedStore: "",
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
  cardType: "",
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setAddress(state, action) {
      state.address = action.payload;
    },
    setVerifyAddress(state, action) {
      state.verifyAddress = action.payload;
    },
    setTakeawayType(state, action) {
      state.takeawayType = action.payload;
    },
    setSelectedStore(state, action) {
      state.selectedStore = action.payload;
    },
    setCardName(state, action) {
      state.cardName = action.payload;
    },
    setCardNumber(state, action) {
      state.cardNumber = action.payload;
    },
    setExpiry(state, action) {
      state.expiry = action.payload;
    },
    setCvv(state, action) {
      state.cvv = action.payload;
    },
    setCardType(state, action) {
      state.cardType = action.payload;
    },
    resetCheckout(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setAddress,
  setVerifyAddress,
  setTakeawayType,
  setSelectedStore,
  setCardName,
  setCardNumber,
  setExpiry,
  setCvv,
  setCardType,
  resetCheckout,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
