import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './rootReducer.ts';
import logger from 'redux-logger';
import {useDispatch} from 'react-redux';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const createStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware(), sagaMiddleware],
    // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
  });
  sagaMiddleware;
};

export default createStore;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
