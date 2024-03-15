import {takeLatest, all} from 'redux-saga/effects';
import {handleGetTodoSaga} from './todoSaga.ts';
import todoSagaSlice from '../store/slice/todoSagaSlice.ts';

export function* watcherSaga() {
  yield takeLatest(todoSagaSlice.actions.getTodoSaga.type, handleGetTodoSaga);
}
