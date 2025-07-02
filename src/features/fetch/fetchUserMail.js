
// src/features/fetch/fetchUserMail.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* ──────────────────────────────────────────────────────────
   Thunk: POST http://localhost:1273/basic_user/mail
   Envía { mail } y devuelve lo que el endpoint responda
   (id del usuario u objeto, según tu backend)
   ────────────────────────────────────────────────────────── */
export const fetchUserMail = createAsyncThunk(
  "userMail/fetch",
  async (mail, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:1273/basic_user/mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mail }),
      });

      if (!res.ok) {
        const txt = await res.text();               // mensaje del backend
        return rejectWithValue(txt || `Error ${res.status}`);
      }

      const data = await res.json();                // p.ej. { id_user: 5 }
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* ─────────────────────────────
   Slice
   ───────────────────────────── */
const userMailSlice = createSlice({
  name: "userMail",
  initialState: {
    mail: null,         // resultado del endpoint
    loading: false,
    error: null,
  },
  reducers: {
    clearUserMail(state) {
      state.mail = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserMail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserMail.fulfilled, (state, action) => {
        state.loading = false;
        state.mail = action.payload;
      })
      .addCase(fetchUserMail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearUserMail } = userMailSlice.actions;
export default userMailSlice.reducer;
