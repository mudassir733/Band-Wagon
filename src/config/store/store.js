import { configureStore } from "@reduxjs/toolkit"
import profileScreen from "./features/ProfileSlice/profileScreen"
// import headerReducer from "./features/HeaderSlice/header"


export const store = configureStore({
    reducer: {
        profile: profileScreen,
        // profileHeader: headerReducer,
    }
})

export default store;