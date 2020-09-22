import React, { useRef, useEffect, useCallback } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import './join.css'
import { useSelector, useDispatch } from 'react-redux'
import { actions, } from '../../store/slice/messages'
import { selectMe } from '../../store/seletor/authSelector'
import { selectRooms } from '../../store/seletor/messageSelector'
import Axios from 'axios'
/*eslint-disable*/
const Join = () => {
  const rooms = useSelector(selectRooms)
  const idRef = useRef(rooms[0] && rooms[0].id)
  const roomRef = useRef()
  const dispatch = useDispatch()
  const { username: name } = useSelector(selectMe)
  const history = useHistory()
  const handleJoin = useCallback(async (e) => {
    e.preventDefault()
    if (roomRef.current?.value.length > 0) {
      dispatch(actions.joinRoom({ name, room: roomRef.current.value, idRoom: idRef.current }))
      setTimeout(() => {
        history.push('/room/' + idRef.current)
      }, 0)
    }
  }, [])
  const getAllRooms = useCallback(() => {
    Axios.get('http://localhost:3000/room').then(res => {
      dispatch(actions.getAllRoom(res.data))
    })
  }, [])
  const changeRoom = useCallback((e) => {
    idRef.current = e.target.value
  }, [])

  useEffect(() => {
    getAllRooms()
  }, [])
  return (
    <div className="joinOuterContainer">
      <div className="joinInner">
        <h1 className="heading">Join Room</h1>
        <div><input placeholder="Room" className="joinInput" type="text" ref={roomRef} /></div>
        <div>
          <select className="joinInput" onChange={(e) => changeRoom(e)}>
            {
              rooms?.map(room => <option key={room.id} value={room.id}>{room.room}</option>)
            }
          </select>
        </div>
        <button className="button mt-20" onClick={(e) => handleJoin(e)}>Join</button>
      </div>
    </div>
  )
}
export default withRouter(Join)