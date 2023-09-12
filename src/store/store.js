import { configureStore } from "@reduxjs/toolkit";
import favorites from "./slice/favorites";




const store=configureStore({
    reducer:{
        favorites:favorites,
      
    }
})

export default store