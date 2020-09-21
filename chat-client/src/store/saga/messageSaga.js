import { takeLatest, select } from 'redux-saga/effects'
import { actions } from '../slice/messages'
import { selectRoom, selectMessage, selectIdRoom } from '../seletor/messageSelector'
import { selectSocket } from '../seletor/socketSeletor'
import { selectMe } from '../seletor/authSelector'
// const history = useHistory()
export function* joinRoom() {
  const socket = yield select(selectSocket)
  const { username: name, id: idUser } = yield select(selectMe)
  const nameroom = yield select(selectRoom)
  const idRoom = yield select(selectIdRoom)
  yield socket.emit('join', { idUser, nameroom, idRoom })
  return () => {
    socket.emit('disconect')
    socket.off()
  }
}
export function* sendMessage() {
  const socket = yield select(selectSocket)
  const { id: idUser } = yield select(selectMe)
  const room = yield select(selectRoom)
  const idRoom = yield select(selectIdRoom)
  const message = yield select(selectMessage)
  yield socket.emit('sendMessage', {
    idRoom,
    // roomname: room,
    idUser,
    message
  })
}
export function* messageSaga() {
  yield takeLatest(actions.joinRoom.type, joinRoom)
  yield takeLatest(actions.sendMessage.type, sendMessage)
}