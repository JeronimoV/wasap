"use client";

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import saveChatData from "./slices/chatSlices";

export default configureStore({
  reducer: {
    saveChatInfo: saveChatData,
  },
});
