import { configureStore } from "@reduxjs/toolkit"
import profileScreen from "./slices/profileScreen"
import headerReducer from "./slices/header"


export const store = configureStore({
    reducer: {
        profile: profileScreen,
        profileHeader: headerReducer,
    }
})

export default store;