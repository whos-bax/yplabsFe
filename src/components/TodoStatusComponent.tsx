import {
  Alert,
  Button,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

export type TodoStatusType = {
  handleTodoDelete: () => void;
};
const TodoStatusComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalVisible = () => {
    setModalVisible(!modalVisible);
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
            <TouchableOpacity style={styles.modalButton}>
              <Text>수정</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              // onPress={handleTodoDelete}
            >
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
