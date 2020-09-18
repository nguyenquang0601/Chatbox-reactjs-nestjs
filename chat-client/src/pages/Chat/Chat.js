import React, { useEffect } from 'react'
import './chat.css'
import queryString from 'query-string'
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Message'
import Messages from '../Messages/Messages'
import { useInjectSaga } from 'redux-injectors'
import { sliceKey, actions } from '../../store/slice/messages'
import { useDispatch, useSelector } from 'react-redux'
import { messageSaga } from '../../store/saga/messageSaga'
// import { selectMessages, selectMessage } from '../../store/seletor/messageSelector'
import { selectSocket } from '../../store/seletor/socketSeletor'
const Chat = ({ location }) => {
  const dispatch = useDispatch()
  const socket = useSelector(selectSocket)
  useInjectSaga({ key: sliceKey, saga: messageSaga })
  // const messages = useSelector(selectMessages)
  // const message = useSelector(selectMessage)
  useEffect(() => {
    const { name, room } = queryString.parse(location.search)
    dispatch(actions.joinRoom({ name, room }))
    // eslint-disable-next-line 
  }, [location.search])
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