import React from 'react';
import {useSelector} from 'react-redux';
import TodoDetail from '../components/TodoDetail.tsx';
import {RootState} from '../redux/rootReducer.ts';

const TodoDetailScreen = (): React.JSX.Element => {
  const todoProps = useSelector((state: RootState) => state.todo);
  return <TodoDetail {...todoProps} />;
};
export default TodoDetailScreen;
