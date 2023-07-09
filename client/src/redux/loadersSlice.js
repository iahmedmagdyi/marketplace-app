import { createSlice } from "@reduxjs/toolkit";

export const loaderSlice = createSlice({
  name: "loaders",
  initialState: {
    loading: "false",
  },
  reducers: {
    SetLoaders: (state, action) => {
      state.loading = action.payload;
    },
  },
});
export const { SetLoaders } = loaderSlice.actions;
