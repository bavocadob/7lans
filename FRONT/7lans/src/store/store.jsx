import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./chatSlice";
import chooseGameSlice from "./chooseGameSlice";
import gugudanSlice from "./gugudanSlice";
import quizSlice from "./quizSlice";
import wordsSlice from "./wordsSlice";

const store = configureStore({
    reducer: {
        chat: chatSlice,
        chooseGame: chooseGameSlice,
        gugudan: gugudanSlice,
        quiz: quizSlice,
        words: wordsSlice,
    },
})

export default store
