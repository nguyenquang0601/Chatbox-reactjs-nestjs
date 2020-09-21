import React, { useRef, useEffect } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import './join.css'
import { useSelector, useDispatch } from 'react-redux'
import { actions } from '../../store/slice/messages'
import { selectMe } from '../../store/seletor/authSelector'
import { selectIdRoom } from '../../store/seletor/messageSelector'
import { selectSocket } from '../../store/seletor/socketSeletor'

const Join = () => {
  const history = useHistory()
  const socket = useSelector(selectSocket)
  const roomRef = useRef()
  const dispatch = useDispatch()
  const { username: name } = useSelector(selectMe)
  const idRoom = useSelector(selectIdRoom)
  console.log(idRoom)
  useEffect(() => {
    
  }, [])
  const handleJoin = (e) => {
    console.log(e)
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