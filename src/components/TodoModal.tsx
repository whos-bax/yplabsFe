import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {TodoModalProps} from '../pages/TodoListScreen.tsx';

const {width, height} = Dimensions.get('window');

const TodoModal = ({todoValue, handleTodoListCreate}: TodoModalProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const handleModalClose = (e: any) => {
    // if (e.target !== e.currentTarget) return;
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
        <Pressable
          style={styles.centeredView}
          // onPress={handleModalClose}
        >
          <View style={styles.modalView}>
            <TextInput
              style={styles.modalInput}
              placeholder="할 일을 작성해 주세요."
              autoFocus
              editable
              multiline
              onChangeText={handleTodoListCreate}
              value={todoValue}
            />
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.button}
                // hitSlop={10}
                onPress={handleModalClose}>
                <Text style={styles.buttonText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonActive]}
                // hitSlop={10}
                onPress={handleModalClose}>
                <Text style={styles.buttonText}>작성</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
      <Pressable
        style={styles.fixedButton}
        onPress={() => setModalVisible(true)}></Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    paddingTop: 22,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    marginTop: height * 0.1,
    // alignItems: 'center',
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
    maxHeight: 150,
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
    fontSize: 14,
  },
  fixedButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    bottom: 20,
    right: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3d67fc',
  },
});

export default TodoModal;
