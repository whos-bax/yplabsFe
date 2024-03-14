import React from 'react';
import {useSelector} from 'react-redux';
import TodoDetail from '../components/TodoDetail.tsx';
import {RootState} from '../redux/RootReducer.ts';

const TodoDetailScreen = (): React.JSX.Element => {
  const todo = useSelector((state: RootState) => state.todos);
  console.log('=====', todo);
  return <TodoDetail {...todo} />;
};
export default TodoDetailScreen;
