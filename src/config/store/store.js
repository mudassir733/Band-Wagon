import { configureStore } from "@reduxjs/toolkit"
import profileScreen from "./slices/profileScreen"


export const store = configureStore({
    reducer: {
        profile: profileScreen,
    }
})

export default store;