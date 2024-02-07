// store.jsx

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import chatSlice from "./chatSlice";
import chooseGameSlice from "./chooseGameSlice";
import gugudanSlice from "./gugudanSlice";
import quizSlice from "./quizSlice";
import wordsSlice from "./wordsSlice";
import isPlayGameNow from "./isPlayGameNow";
import userSlice from "./userSlice";
import adminSelectVolSlice from "./adminSelectVolSlice";
import childSlice from "./childSlice";
import childrenSlice from "./childrenSlice";
import dinoSlice from "./dinoSlice";
import urlSlice from "./urlSlice";
import volSlice from "./volSlice";
import volsSlice from "./volsSlice";
import viewLetterSlice from "./viewLetterSlice";

const reducers = combineReducers({
  chat: chatSlice,
  chooseGame: chooseGameSlice,
  gugudan: gugudanSlice,
  quiz: quizSlice,
  words: wordsSlice,
  isPlayGameNow: isPlayGameNow,
  user: userSlice,
  adminSelectVol: adminSelectVolSlice,
  child: childSlice,
  children: childrenSlice,
  dino: dinoSlice,
  url: urlSlice,
  vol: volSlice,
  vols: volsSlice,
  viewletter: viewLetterSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
