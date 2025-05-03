// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import storyReducer from "../features/storySlice";

export const store = configureStore({
  reducer: {
    story: storyReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types:
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;