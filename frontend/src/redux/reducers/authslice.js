import {createSlice} from '@reduxjs/toolkit';

const  initialState = {
    user:null,
    isAdmin:false,
    loader:true,
    isAuthenticated:false,
}
const authSLice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        userExists:(state,action)=>{
            state.user=action.payload;
            state.isAdmin = action.payload?.role === "admin";
            state.isAuthenticated=true,
            state.loader=false;
        },
        userNotExists:(state)=>{
            state.user=null;
            state.isAuthenticated=false;
            state.loader=false;
        }
    }
})
export default authSLice;
export  const{userExists,userNotExists}=authSLice.actions;