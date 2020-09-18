import { takeLatest, select } from 'redux-saga/effects'
import { actions } from '../slice/messages'
import { selectName, selectRoom, selectMessage } from '../seletor/messageSelector'
import { selectSocket } from '../seletor/socketSeletor'
export function* joinRoom() {
  const socket = yield select(selectSocket)
  const name = yield select(selectName)
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