import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  isAuthenticate:false
}

const authLoginSlice = createSlice({
  // sliceの名前: useSelectorで使用
  name: "authLogin",
  initialState,
  reducers: {
    setAuthLogin:(state,action)=>{
      state.isAuthenticate=action.payload
    }
  }
});

export const{setAuthLogin}=authLoginSlice.actions
export default authLoginSlice.reducer;
