import React from 'react'
import './index.css'

const Infobar = ({room}) => {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img className="onlineIcon" src="https://raw.githubusercontent.com/adrianhajdin/project_chat_application/master/client/src/icons/onlineIcon.png" alt="online" />
                <h3>{room}</h3>
            </div>
            <div className="rightInnerContainer">
                {/* leave chat */}
                <a href="/" src="https://raw.githubusercontent.com/adrianhajdin/project_chat_application/master/client/src/icons/closeIcon.png" alt="close image" />
            </div>
        </div>
    )
}

export default Infobar
