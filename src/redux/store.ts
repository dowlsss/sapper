import {combineReducers, configureStore, Store} from "@reduxjs/toolkit";
import mineReducer from "./reducers/mineReducer";

const rootReducer = combineReducers({
    mineReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']