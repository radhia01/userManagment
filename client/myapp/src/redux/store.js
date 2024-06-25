import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/user";
import projectReducer from "./reducer/project"
import taskReducer from "./reducer/task"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from "./reducer/index"
const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer
});
export const persistor = persistStore(store)