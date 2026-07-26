import {configureStore} from "@reduxjs/toolkit"
import AuthSlice from "./authSlice";

const store = configureStore({
    reducer :{
      auth : AuthSlice.reducer , 
    }
}) ;

export default store ;