import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './rootReducer.ts';
import logger from 'redux-logger';
import {useDispatch} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {watcherSaga} from '../saga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(watcherSaga);
export default store;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
