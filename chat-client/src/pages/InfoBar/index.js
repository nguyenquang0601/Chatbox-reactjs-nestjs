import React from 'react'
import './infoBar.css'
import { useSelector } from 'react-redux'
import { selectRoom } from '../../store/seletor/messageSelector'
const InfoBar = () => {
  const room = useSelector(selectRoom)
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src='https://raw.githubusercontent.com/adrianhajdin/project_chat_application/master/client/src/icons/onlineIcon.png' alt="123" />
        <h3>{room}</h3>
      </div>
      <div className="rightInnerContainer">
        <a href="/"><img src='https://raw.githubusercontent.com/adrianhajdin/project_chat_application/master/client/src/icons/closeIcon.png' alt="1231" /></a>
      </div>
    </div>
  )
}
export default InfoBar