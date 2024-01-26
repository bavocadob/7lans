import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./chatSlice";
import chooseGameSlice from "./chooseGameSlice";

const store = configureStore({
    reducer: {
        chat: chatSlice,
        chooseGame: chooseGameSlice,
    },
})

export default store
