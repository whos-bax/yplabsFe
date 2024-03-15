import {createSlice} from '@reduxjs/toolkit';
import {ItemType} from './todoDetailSlice.ts';
import todoListSlice from './todoListSlice.ts';

interface initialType {
  list: ItemType[];
  loading: boolean;
  error: string;
}

const initialState: initialType = {
  list: [],
  loading: false,
  error: '',
};

const todoSagaSlice = createSlice({
  name: 'todoSagaSlice',
  initialState,
  reducers: {
    getTodoSaga(state) {
      state.loading = true;
    },
    setTodoSaga(state, action) {
      state.list = action.payload;
      state.loading = false;
    },
    failedGetTodo(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export default todoSagaSlice;
