import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {TodoModalPropsType} from '../pages/TodoListScreen.tsx';

const {height} = Dimensions.get('window');

const TodoModal = ({
  modalVisible,
  setModalVisible,
  todoValue,
  handleTodoValue,
  submitTodo,
  isEdit,
}: TodoModalPropsType) => {
  const handleModalClose = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.modalInput}
              placeholder="할 일을 작성해 주세요."
              autoFocus
              editable
              multiline
              onChangeText={handleTodoValue}
              value={todoValue}
            />
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleModalClose}>
                <Text style={styles.buttonText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonActive]}
                onPress={submitTodo}>
                <Text style={styles.buttonText}>완료</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {!isEdit && (
        <TouchableOpacity
          style={styles.fixedButton}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.fixedButtonText}>+</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    paddingTop: 22,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    marginTop: height * 0.1,
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
  modalInput: {
    textAlign: 'left',
    fontSize: 16,
    height: 150,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    gap: 16,
  },
  button: {
    backgroundColor: 'gray',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  buttonActive: {
    backgroundColor: '#3d67fc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  fixedButton: {
    width: 46,
    height: 46,
    borderRadius: 25,
    position: 'absolute',
    bottom: 16,
    right: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: '#3d67fc',
    borderWidth: 1,
  },
  fixedButtonText: {
    color: '#3d67fc',
    fontSize: 20,
  },
});

export default TodoModal;
