import {call, put} from 'redux-saga/effects';
import {getTodoAllSaga} from '../../api/apiService.ts';
import todoSagaSlice from '../store/slice/todoSagaSlice.ts';

export function* handleGetTodoSaga() {
  try {
    const res: string = yield call(getTodoAllSaga);
    yield put(todoSagaSlice.actions.setTodoSaga(res));
  } catch (error) {
    yield put(todoSagaSlice.actions.failedGetTodo(error));
  }
}
