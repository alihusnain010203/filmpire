import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:{},
    isAuth:false,
    session_id:""
}

const AuthSlice = createSlice({
    name:'user',
    initialState:initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload;
            state.isAuth = true;
            state.session_id =localStorage.getItem('session_id');
            localStorage.setItem('accountId',action.payload.id);
        }
    }
})

export const {setUser} = AuthSlice.actions;
export default AuthSlice.reducer;
export const selectUser = (state)=>state.user;