import { configureStore } from "@reduxjs/toolkit";
import homeSliceReducer from "./homeSlice";

const store = configureStore({
  reducer: { home: homeSliceReducer },
});

export default store;
