import { createSlice } from "@reduxjs/toolkit";

const Logo = createSlice({
  name: "logo",
  initialState: {
    logoList: [],
  },
  reducers: {
    editLogo: (state, action) => {
      state.logoList = action.payload;
    },
  },
});

export const { editLogo } = Logo.actions;

export default Logo.reducer;
