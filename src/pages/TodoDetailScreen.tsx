import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import TodoDetail from '../components/TodoDetail.tsx';
import {RootState} from '../redux/rootReducer.ts';
import {SafeAreaView, StyleSheet} from 'react-native';
import LoadingComponent from '../components/LoadingComponent.tsx';
import TodoModal from '../components/TodoModal.tsx';
import api from '../api/apiService.ts';
import todoDetailSlice, {ItemType} from '../redux/slice/todoDetailSlice.ts';
import {useAppDispatch} from '../redux/store.ts';
import todoListSlice from '../redux/slice/todoListSlice.ts';
import {getData, storeData} from '../hook/asyncStorage.ts';

export type TodoDetailPropsType = {
  item: ItemType;
  handleToggleSwitch: (value: boolean) => void;
};

const TodoDetailScreen = (): React.JSX.Element => {
  const isLoading = useSelector((state: RootState) => state.common.loading);
  const dispatch = useAppDispatch();

  const detail = useSelector((state: RootState) => state.todoDetail);
  const todoList = useSelector((state: RootState) => state.todoList.list);

  const [todoDetail, setTodoDetail] = useState<ItemType>(detail);
  const [todoValue, setTodoValue] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (todoList.length > 0 && detail.id) {
      setTodoValue(detail.content);

      getData('id-list').then(res => {
        let list = JSON.parse(res);
        if (!list.includes(detail.id)) {
          setTodoDetail({...detail, is_finished: true});
        } else {
          setTodoDetail({...detail, is_finished: false});
        }
      });
    }
  }, [todoList, detail]);

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

  /**
   * 토글 스위치 수정 (완료|대기)
   * @param value
   */
  const handleToggleSwitch = (value: boolean) => {
    let item = {...detail};
    let list = [...todoList];
    let idx = list.findIndex((todo: ItemType) => todo.id === detail.id);

    item.is_finished = value;
    list.splice(idx, 1, item);
    console.log(detail.id);
    dispatch(todoDetailSlice.actions.setTodoDetail(item));
    dispatch(todoListSlice.actions.setList(list));
    storeIdList(detail.id, value);
  };

  console.log(todoDetail);

  /**
   * 완료 리스트 id asyncStorage 저장
   * @param id
   * @param value
   */
  const storeIdList = async (id: number, value: boolean) => {
    let idList =
      (await getData('id-list')) !== null ? await getData('id-list') : [];
    idList = JSON.parse(idList);
    if (value) {
      idList.push(id);
      await storeData('id-list', JSON.stringify(idList));
    } else {
      let idx = idList.findIndex((todo: ItemType) => todo.id === id);
      idList.splice(idx, 1);
      await storeData('id-list', JSON.stringify(idList));
    }
  };

  const detailProps = {
    item: todoDetail,
    handleToggleSwitch,
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
      <TodoDetail {...detailProps} />
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
