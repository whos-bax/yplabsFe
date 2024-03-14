import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './RootReducer.ts';
import logger from 'redux-logger';

export const store = configureStore({
  reducer: rootReducer,

  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

export type rootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
