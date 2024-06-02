import {combineReducers, configureStore} from '@reduxjs/toolkit'
import authUserReducer from "./user/user.slice.js"
import conversationReducer from "./conversation/conversation.slice.js"
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  authUser: authUserReducer,
  conversation: conversationReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store);