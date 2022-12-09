import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {coffeeShopReducer} from "./CoffeShopSliceReducer";

export const store = configureStore({
    reducer: combineReducers({
        coffeeShop: coffeeShopReducer
    })
})
