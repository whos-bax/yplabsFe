import axios from 'axios';
const baseUrl = `http://3.35.194.197:8000`;

export type TodoType = {
  id?: number;
  content?: string;
};

async function getTodoAll() {
  try {
    const response = await axios.get(`${baseUrl}/todo/`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}

async function createTodo(param: TodoType) {
  try {
    const response = await axios.post(`${baseUrl}/todo/`, param);
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}

async function deleteTodo(param: TodoType) {
  try {
    const response = await axios.delete(`${baseUrl}/todo/${param.id}`);
    console.log(response, response.status);
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}

const api = {
  getTodoAll,
  createTodo,
};
export default api;
