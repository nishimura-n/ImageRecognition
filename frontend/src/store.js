import { configureStore } from "@reduxjs/toolkit";
// import { persistReducer, persistStore } from 'redux-persist'
import isAuthenticateReducer from "./feature/AuthSlice"


// const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: {
    //isAuthenticateReducer: AuthSlice.jsでexportしたSliceを受け取る変数
    //isLogin: 任意の名前
    isLogin :isAuthenticateReducer,
  },
})

// export const persistor = persistStore(store);
