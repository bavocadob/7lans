import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {

    },
})

export default store


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