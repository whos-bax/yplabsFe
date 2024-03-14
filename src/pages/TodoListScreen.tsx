import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import TodoList from '../components/TodoList';
import TodoModal from './../components/TodoModal';
import {useAppDispatch} from '../redux/store.ts';
import todoDetailSlice from '../redux/slice/todoDetailSlice.ts';
import commonSlice from '../redux/slice/commonSlice.ts';
import LoadingComponent from '../components/LoadingComponent.tsx';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/rootReducer.ts';
import todoListSlice from '../redux/slice/todoListSlice.ts';

export type MemoType = {
  id: number;
  content: string;
  create_at: string;
  update_at: string;
};

export type MemoProps = {
  memoList: MemoType[];
  getMemoList: () => void;
};

export type TodoModalProps = {
  todoValue: string;
  handleTodoListCreate: (text: string) => void;
};

function TodoListScreen(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const isLoading = useSelector((state: RootState) => state.common.loading);

  const [memoList, setMemoList] = useState<MemoType[]>([]);

  // const [pageSize, setPageSize] = useState<number>(10);

  useEffect(() => {
    getMemoList();
  }, []);

  const test = {
    id: 220,
    content: '12',
    update_at: '2024-02-29T05:49:22.162371Z',
    create_at: '2023-06-19T02:03:36.672979Z',
  };
  const getMemoList = async () => {
    dispatch(commonSlice.actions.setIsLoading(true));
    // const res = await api.getMemoAll();
    // console.log(res)
    const timer = setTimeout(() => {
      let list = Array.from({length: 8}).map((v, i) => {
        return {
          ...test,
          id: test.id + i,
          content: test.content + i,
        };
      });
      setMemoList(list);
      dispatch(todoListSlice.actions.setList(list));
      dispatch(commonSlice.actions.setIsLoading(false));
    }, 500);
    return () => clearTimeout(timer);
  };

  const [todoValue, setTodoValue] = useState<string>('');
  const handleTodoListCreate = (text: string) => {
    setTodoValue(text);
  };

  const TodoListProps = {
    memoList,
    getMemoList,
  };

  const modalProps = {
    todoValue,
    handleTodoListCreate,
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <LoadingComponent />}
      <TodoList {...TodoListProps} />
      <TodoModal {...modalProps} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: 'white',
  },
});

export default TodoListScreen;
