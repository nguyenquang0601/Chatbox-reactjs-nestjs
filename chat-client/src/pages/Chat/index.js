import React, { useEffect } from 'react'
import './chat.css'
import InfoBar from '../InfoBar'
import Input from '../Input'
import Messages from '../Messages'
import { useInjectSaga } from 'redux-injectors'
import { sliceKey, actions } from '../../store/slice/messages'
import { useDispatch, useSelector } from 'react-redux'
import { messageSaga } from '../../store/saga/messageSaga'
import { selectSocket } from '../../store/seletor/socketSeletor'
import { selectRoom } from '../../store/seletor/messageSelector'
import { selectMe } from '../../store/seletor/authSelector'
const Chat = () => {
  const dispatch = useDispatch()
  const socket = useSelector(selectSocket)
  useInjectSaga({ key: sliceKey, saga: messageSaga })
  const room = useSelector(selectRoom) || window.location.pathname?.split('/')[window.location.pathname?.split('/').length - 1]
  const { username: name } = useSelector(selectMe)
  useEffect(() => {
    dispatch(actions.joinRoom({ name, room }))
    // eslint-disable-next-line 
  }, [])
  useEffect(() => {
    socket.on('message', messagesInRoom => {
      // console.log(messagesInRoom)
      dispatch(actions.loadingMessages({
        id: messagesInRoom.idRoom,
        messages: [...messagesInRoom.messages]
      }))
    })
    socket.on('loadingMessages', messagesInRoom => {
      // console.log(messagesInRoom)
      dispatch(actions.loadingMessages({
        id: messagesInRoom.idRoom,
        messages: [...messagesInRoom.messages]
      }))
    })
    // eslint-disable-next-line 
  }, [])

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar />
        <Messages />
        <Input />
      </div>
    </div>
  )
}
export default Chat