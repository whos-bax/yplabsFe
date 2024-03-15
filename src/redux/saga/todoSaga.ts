import {takeEvery, call, put} from 'redux-saga/effects';
import {getTodoAllSaga} from '../../api/apiService.ts';

function* fetch() {
  try {
    const employees = yield call(getTodoAllSaga);
    yield put({
      type: 'EMPLOYEES_FETCH_SUCCESS',
      payload: {employees: employees.data},
    });
  } catch (e) {
    yield put({type: 'EMPLOYEES_FETCH_FAILURE', payload: {message: e.message}});
  }
}

export default function* sagas() {
  yield takeEvery('EMPLOYEES_FETCH_REQUEST', fetch);
}
