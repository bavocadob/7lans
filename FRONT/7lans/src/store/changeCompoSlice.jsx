import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

const changeCompoSlice = createSlice({
  name: "changecompo",
  initialState,
  reducers: {
    changecompo: (state, action) => {
      state.value = !state.value;
    },
  },
});

export const { changecompo } = changeCompoSlice.actions;
export default changeCompoSlice.reducer;
