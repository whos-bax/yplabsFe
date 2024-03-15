import {combineReducers} from '@reduxjs/toolkit';
import commonSlice from './slice/commonSlice.ts';
import todoListSlice from './slice/todoListSlice.ts';
import todoDetailSlice from './slice/todoDetailSlice.ts';
import todoSagaSlice from './slice/todoSagaSlice.ts';

const rootReducer = combineReducers({
  todoDetail: todoDetailSlice.reducer,
  todoList: todoListSlice.reducer,
  common: commonSlice.reducer,
  todoSaga: todoSagaSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
