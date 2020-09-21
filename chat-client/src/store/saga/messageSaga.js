import { takeLatest, select } from 'redux-saga/effects'
import { actions } from '../slice/messages'
import { selectRoom, selectMessage } from '../seletor/messageSelector'
import { selectSocket } from '../seletor/socketSeletor'
import { selectMe } from '../seletor/authSelector'
export function* joinRoom() {
  const socket = yield select(selectSocket)
  const { username: name } = yield select(selectMe)
  const room = yield select(selectRoom)
  yield socket.emit('join', { name, room })
  return () => {
    socket.emit('disconect')
    socket.off()
  }
}
export function* sendMessage() {
  const socket = yield select(selectSocket)
  const message = yield select(selectMessage)
  yield socket.emit('sendMessage', message)
}
export function* messageSaga() {
  yield takeLatest(actions.joinRoom.type, joinRoom)
  yield takeLatest(actions.sendMessage.type, sendMessage)
}