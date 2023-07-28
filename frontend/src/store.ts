import { configureStore } from "@reduxjs/toolkit";
import isAuthenticateReducer from "./feature/AuthSlice"

export const store = configureStore({
  reducer: {
    //isAuthenticateReducer: AuthSlice.jsでexportしたSliceを受け取る変数
    //isLogin: 任意の名前
    isLogin :isAuthenticateReducer,
  },
})

// AppDispatchに型を代入
export type AppDispatch = typeof store.dispatch;

export type RootState=ReturnType<typeof store.getState>;
