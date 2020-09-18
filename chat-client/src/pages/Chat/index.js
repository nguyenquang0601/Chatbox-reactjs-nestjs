import React, { useEffect } from 'react'
import './chat.css'
import queryString from 'query-string'
import InfoBar from '../InfoBar'
import Input from '../Input'
import Messages from '../Messages'
import { useInjectSaga } from 'redux-injectors'
import { sliceKey, actions } from '../../store/slice/messages'
import { useDispatch, useSelector } from 'react-redux'
import { messageSaga } from '../../store/saga/messageSaga'
// import { selectMessages, selectMessage } from '../../store/seletor/messageSelector'
import { selectSocket } from '../../store/seletor/socketSeletor'
import { selectRoom, selectName } from '../../store/seletor/messageSelector'
const Chat = (props) => {
  const dispatch = useDispatch()
  const socket = useSelector(selectSocket)
  useInjectSaga({ key: sliceKey, saga: messageSaga })
  // const messages = useSelector(selectMessages)
  console.log(window.location)
  // const message = useSelector(selectMessage)
  const room = useSelector(selectRoom) || window.location.pathname?.split('/')[window.location.pathname?.split('/').length - 1]
  const name = useSelector(selectName) || 'admin'

  useEffect(() => {
    // const { name, room } = queryString.parse(location.search)
    dispatch(actions.joinRoom({ name, room }))
    // eslint-disable-next-line 
  }, [])
  useEffect(() => {
    socket.on('message', messages => {
      dispatch(actions.loadingMessages([...messages]))
    })
    socket.on('loadingMessages', messages => {
      dispatch(actions.loadingMessages([...messages]))
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