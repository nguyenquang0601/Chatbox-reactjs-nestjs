import React, { useEffect, useCallback } from 'react'
import './chat.css'
import InfoBar from '../InfoBar'
import Input from '../Input'
import Messages from '../Messages'
import { actions } from '../../store/slice/messages'
import { useDispatch, useSelector } from 'react-redux'
import { selectSocket } from '../../store/seletor/socketSeletor'
import { selectIdRoom } from '../../store/seletor/messageSelector'
import { selectMe } from '../../store/seletor/authSelector'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'
/* eslint-disable */
const Chat = () => {
  const dispatch = useDispatch()
  const socket = useSelector(selectSocket)
  const idRoom = useSelector(selectIdRoom) || window.location.pathname?.split('/')[window.location.pathname?.split('/').length - 1]
  const { username: name } = useSelector(selectMe)
  useEffect(() => {
    dispatch(actions.joinRoom({ name, room: '1', idRoom }))
  }, [])
  useEffect(() => {
    socket.on('message', messagesInRoom => {
      dispatch(actions.loadingMessages({
        id: messagesInRoom.idRoom,
        messages: [...messagesInRoom.messages]
      }))
    })
    socket.on('loadingMessages', messagesInRoom => {
      dispatch(actions.loadingMessages({
        id: messagesInRoom.idRoom,
        messages: [...messagesInRoom.messages]
      }))
    })
    // eslint-disable-next-line 
  }, [])

  const getAllRooms = useCallback(() => {
    Axios.get('http://localhost:3000/room').then(res => {
      dispatch(actions.getAllRoom(res.data))
    })
  }, [])
  useEffect(() => {
    getAllRooms()
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
export default withRouter(Chat)