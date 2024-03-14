import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import TodoDetail from '../components/TodoDetail.tsx';
import {RootState} from '../redux/rootReducer.ts';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import LoadingComponent from '../components/LoadingComponent.tsx';
import TodoModal from '../components/TodoModal.tsx';
import api from '../api/apiService.ts';

const TodoDetailScreen = (): React.JSX.Element => {
  const isLoading = useSelector((state: RootState) => state.common.loading);

  const detail = useSelector((state: RootState) => state.todoDetail);
  const list = useSelector((state: RootState) => state.todoList.list);
  // console.log(list);
  // const state = useSelector((state: RootState) => state);
  const [todoDetail, setTodoDetail] = useState({
    ...detail,
  });

  const [todoValue, setTodoValue] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (list.length > 0 && detail.id) {
      setTodoValue(detail.content);
    }
  }, [list, detail]);

  /**
   * 할일 작성/수정
   * @param text
   */
  const handleTodoValue = (text: string) => {
    setTodoValue(text);
  };

  /**
   * 할일 등록/수정
   */
  const submitTodo = async () => {
    const param = {
      content: todoValue,
    };
    const res = await api.createTodo(param);
    if (res.id) {
      // getMemoListAll();
      handleCreateInitialize();
    }
  };

  /**
   * 할일 리스트 추가 초기화
   */
  const handleCreateInitialize = () => {
    setTodoValue('');
    setModalVisible(false);
  };

  const modalProps = {
    modalVisible,
    setModalVisible,
    todoValue,
    handleTodoValue,
    submitTodo,
  };
  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <LoadingComponent />}
      <TodoDetail {...todoDetail} />
      <TodoModal {...modalProps} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: 'white',
  },
});
export default TodoDetailScreen;
