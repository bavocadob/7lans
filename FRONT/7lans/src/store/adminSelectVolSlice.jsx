import { createSlice } from "@reduxjs/toolkit";

export const volunteerSlice = createSlice({
  name: "volunteer",
  initialState: " ",
  reducers: {
    adminSelectVol: (state, action) => {
      return action.payload;
    },
  },
});

export const { adminSelectVol } = volunteerSlice.actions;
export const adminSelectVolState = (state) => state.volunteer;

export default volunteerSlice.reducer;
