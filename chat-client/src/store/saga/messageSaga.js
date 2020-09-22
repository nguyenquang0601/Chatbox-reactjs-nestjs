import { takeLatest, select, delay } from 'redux-saga/effects'
import { actions } from '../slice/messages'
import { selectMessage, selectIdRoom } from '../seletor/messageSelector'
import { selectSocket } from '../seletor/socketSeletor'
import { selectMe } from '../seletor/authSelector'
import history from '../../utils/history'
export function* joinRoom() {
  const socket = yield select(selectSocket)
  const { id: idUser } = yield select(selectMe)
  const idRoom = yield select(selectIdRoom)
  yield socket.emit('join', { idUser, nameroom: "", idRoom })
  return () => {
    socket.emit('disconect')
    socket.off()
  }
}
export function* sendMessage() {
  const socket = yield select(selectSocket)
  const { id: idUser } = yield select(selectMe)
  const idRoom = yield select(selectIdRoom)
  const message = yield select(selectMessage)
  yield socket.emit('sendMessage', {
    idRoom,
    idUser,
    message
  })
}
export function* loadPage() {
  const idRoom = yield select(selectIdRoom)
  console.log(idRoom)
  yield delay(3000)
  // yield history.push('/login')
  history.push(`/room/${idRoom}`)

  console.log('123')
}
export function* messageSaga() {
  yield takeLatest(actions.joinRoom.type, joinRoom)
  yield takeLatest(actions.sendMessage.type, sendMessage)
  // yield takeLatest(actions.loadingMessages.type, loadPage)
}