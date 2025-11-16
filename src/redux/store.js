import { configureStore } from "@reduxjs/toolkit";
import { default as authSliceReducer } from "./slices/authSlice";

 const store = configureStore({
  reducer: {
    auth: authSliceReducer

  },
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
