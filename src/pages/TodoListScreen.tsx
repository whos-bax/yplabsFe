import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import TodoList from '../components/TodoList';
import TodoModal from './../components/TodoModal';

export type MemoType = {
  id: number;
  content: string;
  create_at: string;
  update_at: string;
};

export type MemoProps = {
  memoList: MemoType[];
};

export type TodoModalProps = {
  todoValue: string;
  handleTodoListCreate: (text: string) => void;
};

function TodoListScreen(): React.JSX.Element {
  const [memoList, setMemoList] = useState<MemoType[]>([]);

  useEffect(() => {
    getMemoList();
  }, []);

  const getMemoList = async () => {
    // const res = await api.getMemoAll();
    // console.log(res)
    setMemoList([
      {
        id: 220,
        content:
          'ㄹㅁㄴㅇㄴㅇㄹㅁㅣㅣ;ㅡ;ㅣㅢ;ㅡ;ㅣㅡ;ㅡ;ㅣㅡ;ㅣㅡ;ㅣㅡ\n\n\n\n;ㅣㅡ;ㅣㅡ;ㅣㅡ;ㅣㅡ\n\n\n\n;ㅣㅡ;ㅣㅡfasdfsadfdfsasddsafasdfsadfsadfasfdasdfasdfdsaadsfadsfdasfdsfadsafdfdfsaasdfnnn.ㅏㅏ',
        update_at: '2024-02-29T05:49:22.162371Z',
        create_at: '2023-06-19T02:03:36.672979Z',
      },
      {
        id: 221,
        content:
          'ㄹㅁㄴㅇㄴㅇㄹㅁㅣㅣ;ㅡ;ㅣㅢ;ㅡ;ㅣㅡ;ㅡ;ㅣㅡ;ㅣㅡ;ㅣㅡ\n\n\n\n;ㅣㅡ;ㅣㅡ;ㅣㅡ;ㅣㅡ\n\n\n\n;ㅣㅡ;ㅣㅡfasdfsadfdfsasddsafasdfsadfsadfasfdasdfasdfdsaadsfadsfdasfdsfadsafdfdfsaasdfnnn.ㅏㅏ',
        update_at: '2024-02-29T05:49:22.162371Z',
        create_at: '2023-06-19T02:03:36.672979Z',
      },
      {
        id: 223,
        content:
          'ㄹㅁㄴㅇㄴㅇㄹㅁㅣㅣ;ㅡ;ㅣㅢ;ㅡ;ㅣㅡ;ㅡ;ㅣㅡ;ㅣㅡ;ㅣㅡ\n\n\n\n;ㅣㅡ;ㅣㅡ;ㅣㅡ;ㅣㅡ\n\n\n\n;ㅣㅡ;ㅣㅡfasdfsadfdfsasddsafasdfsadfsadfasfdasdfasdfdsaadsfadsfdasfdsfadsafdfdfsaasdfnnn.ㅏㅏ',
        update_at: '2024-02-29T05:49:22.162371Z',
        create_at: '2023-06-19T02:03:36.672979Z',
      },
      {
        id: 224,
        content:
          'ㄹㅁㄴㅇㄴㅇㄹㅁㅣㅣ;ㅡ;ㅣㅢ;ㅡ;ㅣㅡ;ㅡ;ㅣㅡ;ㅣㅡ;ㅣㅡ\n\n\n\n;ㅣㅡ;ㅣㅡ;ㅣㅡ;ㅣㅡ\n\n\n\n;ㅣㅡ;ㅣㅡfasdfsadfdfsasddsafasdfsadfsadfasfdasdfasdfdsaadsfadsfdasfdsfadsafdfdfsaasdfnnn.ㅏㅏ',
        update_at: '2024-02-29T05:49:22.162371Z',
        create_at: '2023-06-19T02:03:36.672979Z',
      },
      {
        id: 225,
        content:
          'ㄹㅁㄴㅇㄴㅇㄹㅁㅣㅣ;ㅡ;ㅣㅢ;ㅡ;ㅣㅡ;ㅡ;ㅣㅡ;ㅣㅡ;ㅣㅡ\n\n\n\n;ㅣㅡ;ㅣㅡ;ㅣㅡ;ㅣㅡ\n\n\n\n;ㅣㅡ;ㅣㅡfasdfsadfdfsasddsafasdfsadfsadfasfdasdfasdfdsaadsfadsfdasfdsfadsafdfdfsaasdfnnn.ㅏㅏ',
        update_at: '2024-02-29T05:49:22.162371Z',
        create_at: '2023-06-19T02:03:36.672979Z',
      },
    ]);
  };

  const [todoValue, setTodoValue] = useState<string>('');
  const handleTodoListCreate = (text: string) => {
    setTodoValue(text);
  };

  const TodoListProps = {
    memoList,
  };

  const modalProps = {
    todoValue,
    handleTodoListCreate,
  };
  return (
    <SafeAreaView style={styles.container}>
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
