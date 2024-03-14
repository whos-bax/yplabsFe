import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import TodoDetail from '../components/TodoDetail.tsx';
import {RootState} from '../redux/rootReducer.ts';

const TodoDetailScreen = (): React.JSX.Element => {
  const todoProps = useSelector((state: RootState) => state.todoDetail);
  const list = useSelector((state: RootState) => state.todoList);
  console.log(list);
  // const state = useSelector((state: RootState) => state);
  const [todoDetail, setTodoDetail] = useState({
    ...todoProps,
  });
  return <TodoDetail {...todoDetail} />;
};
export default TodoDetailScreen;
