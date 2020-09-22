import React from 'react'
import './Message.css'
import ScrollToBottom from 'react-scroll-to-bottom'
import Message from '../Message'
import { useSelector } from 'react-redux'
import { selectMessages } from '../../store/seletor/messageSelector'
import { selectMe } from '../../store/seletor/authSelector'
const Messages = () => {
  const messages = useSelector(selectMessages)
  const { id } = useSelector(selectMe)
  return (
    <ScrollToBottom className="messages">
      {messages.map((message, i) => <div key={i}><Message message={message} idCurrentUser={id} /></div>)}
    </ScrollToBottom>
  )
}
export default Messages