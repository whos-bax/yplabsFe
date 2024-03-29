import {createSlice} from '@reduxjs/toolkit';
import {ItemType} from './todoDetailSlice.ts';

type ListType = {
  list: ItemType[];
};

const initialState: ListType = {
  list: [],
};

const todoDetailSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    setList(state, action) {
      state.list = action.payload;
    },
  },
});

export default todoDetailSlice;
