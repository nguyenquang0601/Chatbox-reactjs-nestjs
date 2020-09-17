import React, { useEffect, useState } from 'react'
import './chat.css'
import queryString from 'query-string'
import io from 'socket.io-client'
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Message'
import Messages from '../Messages/Messages'
let ENDPOINT = 'localhost:3000'
let socket
const Chat = ({ location }) => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState()
  useEffect(() => {
    const { name, room } = queryString.parse(location.search)
    socket = io(ENDPOINT)
    setName(name)
    setRoom(room)
    socket.emit('join', { name, room }, ({ error }) => {
      alert(error)
    })
    return () => {
      socket.emit('disconect')
      socket.off()
    }
  }, [ENDPOINT, location.search])
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [...messages, message])
    })
    socket.on('loadingMessages', messages => {
      console.log(messages)
      setMessages([...messages])
    })
  }, [])
  
  const sendMessage = e => {
    e.preventDefault()
    if (message) {
      socket.emit('sendMessage', message)
    }
  }
  
  console.log(message, messages)

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  )
}
export default Chat