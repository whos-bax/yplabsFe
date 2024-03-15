import {createSlice} from '@reduxjs/toolkit';

export type ItemType = {
  id: number;
  content: string;
  create_at: string;
  update_at: string;
  is_finished?: boolean;
};

const initialState: ItemType = {
  id: 0,
  content: '',
  create_at: '',
  update_at: '',
  is_finished: false,
};

const todoDetailSlice = createSlice({
  name: 'todoDetail',
  initialState,
  reducers: {
    setTodoDetail(state, action) {
      state.id = action.payload.id;
      state.content = action.payload.content;
      state.create_at = action.payload.create_at;
      state.update_at = action.payload.update_at;
      state.is_finished = action.payload.is_finished;
    },
  },
});

export default todoDetailSlice;
