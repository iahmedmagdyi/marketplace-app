import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
  },
  reducers: {
    SetUsers: (state, action) => {
      state.user = action.payload;
    },
  },
});
export const { SetUsers } = userSlice.actions;
