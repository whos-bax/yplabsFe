import {combineReducers} from '@reduxjs/toolkit';
import {todoSlice} from './slice/todo.ts';

const rootReducer = combineReducers({
  todo: todoSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
