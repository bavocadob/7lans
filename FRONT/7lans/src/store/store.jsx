import { configureStore } from "@reduxjs/toolkit";
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
