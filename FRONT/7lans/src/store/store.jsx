import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./chatSlice";
import chooseGameSlice from "./chooseGameSlice";
import gugudanSlice from "./gugudanSlice";
import quizSlice from "./quizSlice";
import wordsSlice from "./wordsSlice";
import changeCompoSlice from "./changeCompoSlice";
import isPlayGameNow from "./isPlayGameNow";

const store = configureStore({
  reducer: {
    chat: chatSlice,
    chooseGame: chooseGameSlice,
    gugudan: gugudanSlice,
    quiz: quizSlice,
    words: wordsSlice,
    changecompo: changeCompoSlice,
    isPlayGameNow: isPlayGameNow,
  },
});

export default store;
