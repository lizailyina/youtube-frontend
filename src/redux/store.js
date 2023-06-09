import { combineReducers, configureStore } from "@reduxjs/toolkit";

import userSlice from "./slices/user";
import commentsSlice from "./slices/comments";
import videoSlice from "./slices/video";
import themeSlice from "./slices/theme";



import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer = combineReducers({
  user: userSlice, video: videoSlice, comments: commentsSlice, theme: themeSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export default store;
export const persistor = persistStore(store);