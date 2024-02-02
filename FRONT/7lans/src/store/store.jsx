// store.jsx

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import chatSlice from "./chatSlice";
import chooseGameSlice from "./chooseGameSlice";
import gugudanSlice from "./gugudanSlice";
import quizSlice from "./quizSlice";
import wordsSlice from "./wordsSlice";
import changeCompoSlice from "./changeCompoSlice";
import isPlayGameNow from "./isPlayGameNow";
import userSlice from "./userSlice";
import childSlice from "./childSlice";
import childrenSlice from "./childrenSlice";
import dinoSlice from "./dinoSlice";

const reducers = combineReducers({
  chat: chatSlice,
  chooseGame: chooseGameSlice,
  gugudan: gugudanSlice,
  quiz: quizSlice,
  words: wordsSlice,
  changecompo: changeCompoSlice,
  isPlayGameNow: isPlayGameNow,
  user: userSlice,
  child: childSlice,
  children: childrenSlice,
  dino: dinoSlice,
})

const persistConfig = {
  key: "root",
  storage,
};


const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);

export default store;
