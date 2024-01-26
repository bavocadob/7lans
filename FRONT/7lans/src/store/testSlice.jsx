import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: " ",
};

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    test: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { test } = testSlice.actions;
export default testSlice.reducer;
