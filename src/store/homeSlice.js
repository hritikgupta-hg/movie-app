import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url: {},
  genres: {},
};
const homeSlice = createSlice({
  name: "home",
  initialState: initialState,
  reducers: {
    getApiConfiguration: (state, action) => {
      state.url = action.payload;
    },
    getGenres: (state, action) => {
      state.genres = action.payload;
    },
  },
});

export default homeSlice.reducer;
export const homeActions = homeSlice.actions;
