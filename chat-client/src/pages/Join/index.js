import React, { useRef } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import './join.css'
import { useSelector, useDispatch } from 'react-redux'
import { actions } from '../../store/slice/messages'
import { selectMe } from '../../store/seletor/authSelector'

const Join = () => {
  const history = useHistory()
  const roomRef = useRef()
  const dispatch = useDispatch()
  const { username: name } = useSelector(selectMe)
  const handleJoin = (e) => {
    e.preventDefault()
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