import React, { useState, useRef } from 'react'
import { Link, withRouter, useHistory } from 'react-router-dom'
import './join.css'
import { useSelector, useDispatch } from 'react-redux'
import { selectName } from '../../store/seletor/messageSelector'
import { actions } from '../../store/slice/messages'
// import history from '../../utils/history'

const Join = () => {
  // const [name, setName] = useState('')
  // const [room, setRoom] = useState('')
  // const roomRef = 
  const history = useHistory()
  const roomRef = useRef()
  const name = useSelector(selectName)
  const dispatch = useDispatch()
  const handleJoin = (e) => {
    e.preventDefault()
    console.log(e)
    if (roomRef.current?.value.length > 0) {
      dispatch(actions.joinRoom({ name, room: roomRef.current.value }))
      history.push(`/room/${roomRef.current.value}`)
    }
  }
  return (
    <div className="joinOuterContainer">
      <div className="joinInner">
        <h1 className="heading">Join Room</h1>
        <div><input placeholder="Room" className="joinInput" type="text" ref={roomRef} /></div>
        {/* <div><input placeholder="Roon" className="joinInput mt-20" type="text" onChange={e => setRoom(e.target.value)} /></div> */}
        {/* <Link onClick={(e) => handleJoin(e)} to={`chat?name=${name}&room=${room}`}> */}
        <button className="button mt-20" onClick={(e) => handleJoin(e)}>Join</button>
      </div>
    </div>
  )
}
export default withRouter(Join)