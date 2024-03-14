import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './rootReducer.ts';
import logger from 'redux-logger';
import {useDispatch} from 'react-redux';

const store = configureStore({
  reducer: rootReducer,

  // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

export default store;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
