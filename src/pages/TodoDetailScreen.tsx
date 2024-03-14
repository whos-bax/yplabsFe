import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import TodoDetail from '../components/TodoDetail.tsx';
import {RootState} from '../redux/rootReducer.ts';
import {Alert, SafeAreaView, StyleSheet} from 'react-native';
import LoadingComponent from '../components/LoadingComponent.tsx';
import TodoModal from '../components/TodoModal.tsx';
import api from '../api/apiService.ts';
import todoDetailSlice, {ItemType} from '../redux/slice/todoDetailSlice.ts';
import {useAppDispatch} from '../redux/store.ts';
import todoListSlice from '../redux/slice/todoListSlice.ts';
import {getData, storeData} from '../hook/asyncStorage.ts';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../RootNavigation.tsx';
import commonSlice from '../redux/slice/commonSlice.ts';

export type TodoDetailPropsType = {
  item: ItemType;
  handleToggleSwitch: (value: boolean) => void;
  todoStatusProps: {
    handleTodoUpdate: (item: ItemType, handleModalVisible: () => void) => void;
    handleTodoDelete: (item: ItemType, handleModalVisible: () => void) => void;
  };
};

const TodoDetailScreen = (): React.JSX.Element => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const isLoading = useSelector((state: RootState) => state.common.loading);
  const dispatch = useAppDispatch();

  const todoList = useSelector((state: RootState) => state.todoList.list);
  const detail = useSelector((state: RootState) => state.todoDetail);

  const [todoValue, setTodoValue] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (todoList.length > 0 && detail.id) {
      setTodoValue(detail.content);
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
    if (todoValue.length > 0) {
      let param = {
        id: 0,
        content: todoValue,
      };
      // update
      if (isEdit) {
        param.id = detail.id;
        const res = await api.updateTodo(param);
        if (res.id) {
          dispatch(
            todoDetailSlice.actions.setTodoDetail({
              ...detail,
              content: todoValue,
            }),
          );
          handleCreateInitialize();
        }
      }
      // create
      else {
        const res = await api.createTodo(param);
        if (res.id) {
          handleCreateInitialize();
        }
      }
    } else {
      Alert.alert('내용을 입력해 주세요.');
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
   * 토글 스위치 수정 (완료|미완료)
   * @param value
   */
  const handleToggleSwitch = (value: boolean) => {
    dispatch(commonSlice.actions.setIsLoading(true));
    let item = {...detail};
    let list = [...todoList];
    let idx = list.findIndex((todo: ItemType) => todo.id === detail.id);

    item.is_finished = value;
    list.splice(idx, 1, item);
    dispatch(todoDetailSlice.actions.setTodoDetail(item));
    dispatch(todoListSlice.actions.setList(list));
    storeIdList(detail.id, value);
  };

  /**
   * 완료 리스트 id asyncStorage 저장
   * @param id
   * @param value
   */
  const storeIdList = async (id: number, value: boolean) => {
    // async storage 완료 데이터 적용
    getData('id-list').then(async result => {
      let idList: number[] = [];
      if (result) {
        idList = JSON.parse(result);
      }
      if (value) {
        if (!idList.includes(id)) {
          idList.push(id);
          await storeData('id-list', JSON.stringify(idList));
        }
      } else {
        if (idList.includes(id)) {
          let idx = idList.findIndex((todoId: number) => todoId === id);
          if (idx >= 0) {
            // idList.splice(idx, 1);
            let arr = idList.filter((v: number, i: number) => i !== idx);
            await storeData('id-list', JSON.stringify(arr));
          }
        }
      }
    });
    dispatch(commonSlice.actions.setIsLoading(false));
  };

  /**
   * 할일 수정하기
   * @param item
   * @param handleModalVisible
   */
  const handleTodoUpdate = async (
    item: ItemType,
    handleModalVisible: () => void,
  ) => {
    handleModalVisible();
    setIsEdit(true);
    setTodoValue(item.content);
    setModalVisible(true);
  };

  /**
   * 할일 삭제하기
   * @param item
   * @param handleModalVisible
   */
  const handleTodoDelete = async (
    item: ItemType,
    handleModalVisible: () => void,
  ) => {
    Alert.alert('정말 삭제하시겠습니까?', '', [
      {
        text: '취소',
      },
      {
        text: '확인',
        onPress: async () => {
          await api.deleteTodo(item);
          handleModalVisible();
          navigation.goBack();
        },
      },
    ]);
  };

  const todoStatusProps = {
    handleTodoUpdate,
    handleTodoDelete,
  };

  const detailProps = {
    item: detail,
    handleToggleSwitch,
    todoStatusProps,
  };

  const modalProps = {
    modalVisible,
    setModalVisible,
    todoValue,
    handleTodoValue,
    submitTodo,
    isEdit: true,
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
