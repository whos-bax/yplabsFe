import {combineReducers, configureStore} from '@reduxjs/toolkit';
import TodoListSlice from './slice/todoListSlice.ts';
import createSagaMiddleware from 'redux-saga';

const reducers = combineReducers({
  dark: TodoListSlice.reducer,
});
const sagaMiddleware = createSagaMiddleware();

const createStore = () => {
  const store = configureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(sagaMiddleware),
  });
  sagaMiddleware.run(rootSaga);
  return store;
};

export type RootState = ReturnType<typeof reducers>;
export default createStore;
