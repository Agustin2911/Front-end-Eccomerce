import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  id_usuario: null,
  image_path: null,
  type: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.id_usuario = action.payload.id_usuario;
      console.log(state.id_usuario);
      state.image_path = action.payload.image_path;
      console.log(state.image_path);
      state.type = action.payload.type;
      console.log(state.type);
      state.token = action.payload.token;
      console.log(state.token);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.id_usuario = null;
      state.image_path = null;
      state.type = null;
      state.token = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
