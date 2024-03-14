import {createSlice} from '@reduxjs/toolkit';

const initialState = {
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
