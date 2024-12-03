import {createSlice} from '@reduxjs/toolkit';

const  initialState = {
    user:null,
    isAdmin:false,
    loader:true,
}
const authSLice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        userExists:(state,action)=>{
            state.user=action.payload;
            state.loader=false;
        },
        userNotExists:(state)=>{
            state.user=null;
            state.loader=false;
        }
    }
})
export default authSLice;
export  const{userExists,userNotExists}=authSLice.actions;