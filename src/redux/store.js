import { configureStore } from "@reduxjs/toolkit";
import { default as authSliceReducer } from "./slices/authSlice";
import { default as pilotSliceReducer } from "./slices/dashboardSlice";

 const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    pilot: pilotSliceReducer,

  },
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
