import React from 'react'
import './Message.css'
import ScrollToBottom from 'react-scroll-to-bottom'
import Message from '../Message'
import { useSelector } from 'react-redux'
import { selectMessages, selectName } from '../../store/seletor/messageSelector'
const Messages = () => {
  const messages = useSelector(selectMessages)
  const name = useSelector(selectName)
  return (
    <ScrollToBottom className="messages">
      {messages.map((message, i) => <div key={i}><Message message={message} name={name} /></div>)}
    </ScrollToBottom>
  )
}
export default Messages