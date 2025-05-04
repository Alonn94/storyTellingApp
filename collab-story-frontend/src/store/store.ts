// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import storyReducer from "../features/storySlice";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    story: storyReducer,
    user: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types:
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;