import {combineReducers} from '@reduxjs/toolkit';
import {TodoSlice} from './slice/TodoSlice.ts';

const RootReducer = combineReducers({
  Todo: TodoSlice,
});

export type RootState = ReturnType<typeof RootReducer>;

export default RootReducer;
