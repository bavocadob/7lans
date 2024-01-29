import { configureStore } from "@reduxjs/toolkit";
<<<<<<< HEAD
import testSlice from "./testSlice";

const store = configureStore({
  reducer: {
    test: testSlice,
  },
});

export default store;

// reducer 사용예시
// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from './userSlice';
// import chatRoomReducer from './chatRoomSlice';

// export const store = configureStore({
//     reducer: {
//         user: userReducer,
//         chatRoom: chatRoomReducer
//     }
// })
=======
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
>>>>>>> front
