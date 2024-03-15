import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import todoDetailSlice, {
  ItemType,
} from '../redux/store/slice/todoDetailSlice.ts';
import {useAppDispatch} from '../redux/store';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store/rootReducer.ts';

export type TodoStatusType = {
  item: ItemType;
  todoStatusProps: {
    handleTodoUpdate: (item: ItemType, handleModalVisible: () => void) => void;
    handleTodoDelete: (item: ItemType, handleModalVisible: () => void) => void;
  };
  handleListToggle?: (value: boolean, item: ItemType) => void;
};

const TodoStatusComponent = ({
  item,
  todoStatusProps,
}: TodoStatusType): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const detail = useSelector((state: RootState) => state.todoDetail);

  const [modalVisible, setModalVisible] = useState(false);

  const handleModalVisible = () => {
    setModalVisible(!modalVisible);
    dispatch(todoDetailSlice.actions.setTodoDetail(item));
  };
  return (
    <View style={styles.statusChoiceView}>
      <TouchableOpacity
        onPress={handleModalVisible}
        hitSlop={{top: 10, right: 10, bottom: 10, left: 10}}>
        <Text style={styles.statusChoiceText}>⋯</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <Pressable style={styles.centeredView} onPress={handleModalVisible}>
          <View style={styles.modalView}>
            {!detail.is_finished && (
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() =>
                  todoStatusProps.handleTodoUpdate(item, handleModalVisible)
                }>
                <Text>수정</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() =>
                todoStatusProps.handleTodoDelete(item, handleModalVisible)
              }>
              <Text>삭제</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  statusChoiceView: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusChoiceText: {
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    paddingTop: 22,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

    width: '80%',
  },
  modalButton: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TodoStatusComponent;
