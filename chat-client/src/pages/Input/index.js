import React, { useRef } from 'react'
import './Message.css'
import { useDispatch } from 'react-redux'
import { actions } from '../../store/slice/messages'
const Input = () => {
  const inputRef = useRef()
  const dispatch = useDispatch()

  const sendMessage = (e) => {
    e.preventDefault()
    dispatch(actions.sendMessage(inputRef.current.value))
  }
  return (
    <form className="form">
      <input
        className="input"
        type="text"
        placeholder="Type a message.."
        ref={inputRef}
        onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
      />
      <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
    </form>
  )
}
export default Input