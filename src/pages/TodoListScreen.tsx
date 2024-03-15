import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {Alert, SafeAreaView, StyleSheet} from 'react-native';

import TodoList from '../components/TodoList';
import TodoModal from './../components/TodoModal';
import {useAppDispatch} from '../redux/store';
import todoDetailSlice, {
  ItemType,
} from '../redux/store/slice/todoDetailSlice.ts';
import commonSlice from '../redux/store/slice/commonSlice.ts';
import LoadingComponent from '../components/LoadingComponent.tsx';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store/rootReducer.ts';
import todoListSlice from '../redux/store/slice/todoListSlice.ts';
import api from '../api/apiService.ts';
import {useIsFocused} from '@react-navigation/native';
import {getData, storeData} from '../hook/asyncStorage.ts';
import todoSagaSlice from '../redux/store/slice/todoSagaSlice.ts';

export type TodoListPropsType = {
  memoList: ItemType[];
  refreshing: boolean;
  onRefresh: () => void;
  onEndReached: () => void;
  handleListToggle: (value: boolean, item: ItemType) => void;
  todoStatusProps: {
    handleTodoUpdate: (item: ItemType, handleModalVisible: () => void) => void;
    handleTodoDelete: (item: ItemType, handleModalVisible: () => void) => void;
  };
};

export type TodoModalPropsType = {
  modalVisible: boolean;
  setModalVisible: (show: boolean) => void;
  todoValue: string;
  handleTodoValue: (text: string) => void;
  submitTodo: () => void;
  isEdit?: boolean;
};

function TodoListScreen(): React.JSX.Element {
  // const usedispatch = useDispatch(); // saga를 이용한
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const isLoading = useSelector((state: RootState) => state.common.loading);

  const todoList = useSelector((state: RootState) => state.todoList.list);
  const detail = useSelector((state: RootState) => state.todoDetail);
  const todoSagaList = useSelector((state: RootState) => state.todoSaga);

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const [totalList, setTotalList] = useState<ItemType[]>([]);
  const [totalSize, setTotalSize] = useState<number>(0);

  const [currPage, setCurrPage] = useState(1);
  const pageSize = 10;

  const [memoList, setMemoList] = useState<ItemType[]>([]);

  const [todoValue, setTodoValue] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);

  const [isEdit, setIsEdit] = useState(false);

  /**
   * 전체 메모 가져오기
   */
  const getMemoListAll = async () => {
    dispatch(commonSlice.actions.setIsLoading(true));
    const res = await api.getTodoAll();
    // async storage 완료 데이터 적용
    getData('id-list').then(result => {
      // console.log('todoSagaList');
      let idList: number[] = [];
      if (result) {
        idList = JSON.parse(result);
      }
      let list = res
        .map((item: ItemType) => {
          if (idList.includes(item.id)) {
            return {
              ...item,
              is_finished: true,
            };
          } else {
            return item;
          }
        })
        .sort((a: ItemType, b: ItemType) => b.id - a.id);
      setTotalList(list);
      setTotalSize(list.length);
      setMemoList(list.slice(0, pageSize));
      dispatch(todoListSlice.actions.setList(list.slice(0, pageSize)));
      // dispatch(commonSlice.actions.setIsLoading(false));
      setRefreshing(false);
    });
  };

  /**
   * 전체 메모 slice by pageSize
   * totalList.slice(0, pageSize)
   */
  const getMemoList = () => {
    // async storage 완료 데이터 적용
    getData('id-list').then(result => {
      dispatch(commonSlice.actions.setIsLoading(true));
      let idList: number[] = [];
      if (result) {
        idList = JSON.parse(result);
      }
      let list = totalList
        .map((item: ItemType) => {
          return {
            ...item,
            is_finished: idList.includes(item.id),
          };
        })
        .slice(0, currPage * pageSize);
      setMemoList(list);
      dispatch(todoListSlice.actions.setList(list));
      dispatch(commonSlice.actions.setIsLoading(false));
      setRefreshing(false);
    });
  };

  /**
   * 상단 새로고침 시 currPage = 1
   */
  const onRefresh = () => {
    setRefreshing(true);
    if (currPage === 1) {
      getMemoList();
    } else {
      setCurrPage(1);
    }
  };

  /**
   * 바닥에 도달 시 totalSize와 현재 개수 비교 하여 currPage 증가
   */
  const onEndReached = () => {
    if (totalSize >= pageSize * currPage && !isLoading) {
      dispatch(commonSlice.actions.setIsLoading(true));
      setCurrPage(currPage + 1);
    }
  };

  /**
   * 데이터 fetch
   */
  useEffect(() => {
    dispatch(todoSagaSlice.actions.getTodoSaga()); // saga를 이용한 데이터 fetch
    getMemoListAll();
  }, [isFocused]);

  /**
   * 1) 화면 표기시 2) currPage 변동 시
   */
  useEffect(() => {
    getMemoList();
  }, [totalList, isFocused, currPage]);

  /**
   * 토글 스위치 수정 (완료|미완료) for list
   * @param value
   * @param item
   */
  const handleListToggle = (value: boolean, item: ItemType) => {
    dispatch(commonSlice.actions.setIsLoading(true));
    let list = [...todoList];
    let idx = list.findIndex((todo: ItemType) => todo.id === item.id);

    item.is_finished = value;
    list.splice(idx, 1, item);
    dispatch(todoDetailSlice.actions.setTodoDetail(item));
    dispatch(todoListSlice.actions.setList(list));
    storeIdList(item.id, value);
  };

  /**
   * 완료 리스트 id asyncStorage 저장
   * @param id
   * @param value
   */
  const storeIdList = async (id: number, value: boolean) => {
    let idList =
      (await getData('id-list')) !== null
        ? JSON.parse(await getData('id-list'))
        : [];
    if (value) {
      if (!idList.includes(id)) {
        idList.push(id);
        storeData('id-list', JSON.stringify(idList)).then(() => {
          const timer = setTimeout(() => {
            getMemoList();
          }, 100);
          return () => clearTimeout(timer);
        });
      }
    } else {
      if (idList.includes(id)) {
        let idx = idList.findIndex((todoId: number) => todoId === id);
        if (idx >= 0) {
          // idList.splice(idx, 1);
          let arr = idList.filter((v: number, i: number) => i !== idx);
          storeData('id-list', JSON.stringify(arr)).then(() => {
            const timer = setTimeout(() => {
              getMemoList();
            }, 100);
            return () => clearTimeout(timer);
          });
        }
      }
    }
  };

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
          getMemoListAll();
          handleCreateInitialize();
        }
      }
      // create
      else {
        const res = await api.createTodo(param);
        if (res.id) {
          getMemoListAll();
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
          if (currPage === 1) {
            getMemoListAll();
          } else {
            setCurrPage(1);
          }
        },
      },
    ]);
  };

  const todoStatusProps = {
    handleTodoUpdate,
    handleTodoDelete,
  };

  const todoListProps = {
    memoList,
    refreshing,
    onRefresh,
    onEndReached,
    handleListToggle,
    todoStatusProps,
  };

  const modalProps = {
    modalVisible,
    setModalVisible,
    todoValue,
    handleTodoValue,
    submitTodo,
    todoStatusProps,
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <LoadingComponent />}
      <TodoList {...todoListProps} />
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
