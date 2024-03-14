import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  id: null,
  content: '',
  create_at: '',
  update_at: '',
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
    },
  },
});

export default todoDetailSlice;
