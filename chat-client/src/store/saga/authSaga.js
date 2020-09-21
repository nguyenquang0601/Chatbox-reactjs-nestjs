import { takeLatest, put, call } from 'redux-saga/effects'
import { actions } from '../slice/auth'
import Axios from 'axios'
function* me() {
  const response = yield call(() => {
    return Axios.get('http://localhost:3000/me')
  })
  yield put(actions.loadMe(response.data))
}

export function* authSaga() {
  yield takeLatest(actions.loadPage.type, me)
}