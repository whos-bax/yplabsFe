import axios from 'axios';
import {Alert} from 'react-native';
const baseUrl = 'http://3.35.194.197:8000';

export type TodoType = {
  id?: number;
  content?: string;
};

/**
 * read
 * success: 200
 */
async function getTodoAll() {
  try {
    const response = await axios.get(`${baseUrl}/todo/`);
    if (response.status === 200) {
      return response.data;
    } else {
      Alert.alert('잠시 후 다시 시도해 주세요.');
    }
  } catch (error) {
    console.error(error);
    Alert.alert('잠시 후 다시 시도해 주세요.');
  }
}

/**
 * create
 * success: 201
 * @param param
 * @param param.content
 */
async function createTodo(param: TodoType) {
  try {
    const response = await axios.post(`${baseUrl}/todo/`, param);
    if (response.status === 201) {
      return response.data;
    } else {
      Alert.alert('잠시 후 다시 시도해 주세요.');
    }
  } catch (error) {
    console.error(error);
    Alert.alert('잠시 후 다시 시도해 주세요.');
  }
}

/**
 * delete
 * success: 204
 * @param param.id
 */
async function deleteTodo(param: TodoType) {
  try {
    const response = await axios.delete(`${baseUrl}/todo/${param.id}/`);
    if (response.status === 204) {
      return response.data;
    } else {
      Alert.alert('잠시 후 다시 시도해 주세요.');
    }
  } catch (error) {
    console.error(error);
    Alert.alert('잠시 후 다시 시도해 주세요.');
  }
}

/**
 * update
 * success: 200
 * @param param
 * @param param.id
 * @param param.content
 */
async function updateTodo(param: TodoType) {
  try {
    const response = await axios.patch(`${baseUrl}/todo/${param.id}/`, param);
    if (response.status === 200) {
      return response.data;
    } else {
      Alert.alert('잠시 후 다시 시도해 주세요.');
    }
  } catch (error) {
    console.error(error);
    Alert.alert('잠시 후 다시 시도해 주세요.');
  }
}
const api = {
  getTodoAll,
  createTodo,
  deleteTodo,
  updateTodo,
};

export default api;

export interface TodoAllType {
  id: number;
  content: string;
  create_at: string;
  update_at: string;
}
export const getTodoAllSaga = (): Promise<TodoAllType> => {
  return fetch(`${baseUrl}/todo/`).then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json() as Promise<TodoAllType>;
  });
};
