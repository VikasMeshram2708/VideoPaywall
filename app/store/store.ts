import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user/userSlice";

export const store = configureStore({
  reducer: {
    [userSlice.reducerPath]: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(userSlice.middleware);
  },
});
