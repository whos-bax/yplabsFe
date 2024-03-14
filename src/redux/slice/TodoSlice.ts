import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  id: null,
  content: '',
  create_at: '',
  update_at: '',
};

/**
 * TemplateSlice에서 관리할 상태를 지정합니다.
 */
export const TodoSlice = createSlice({
  name: 'todoDetail',
  initialState,
  reducers: {
    // 모든 사용자 정보를 상태에 저장합니다.
    setTodoDetail(state, action) {
      state.id = action.payload.id;
      state.content = action.payload.content;
      state.create_at = action.payload.create_at;
      state.update_at = action.payload.update_at;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setTodoDetail} = TodoSlice.actions;

export default TodoSlice.reducer;
