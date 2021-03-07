import React from 'react'
import './chat.css'
import ChatBar from './chatbar/ChatBar'
import MessageBox from './messagebox/MessageBox'

const Chat = () => {
    return (
        <div className="chatMainWrapper">
            <div className="chatHeadingWrapper">
                <h3>Group Chat</h3>
                <div>
                    <p className="selectedOpt">Messages</p>
                    <p>Participants</p>
                </div>
            </div>
            <div className="chatBoxWrapper">
                <MessageBox left />
                <MessageBox left />
                <MessageBox />
                <MessageBox />
                <MessageBox left />
                <MessageBox left />
                <MessageBox />
            </div>
            <div className="inputBarWrapper">
                <ChatBar />
            </div>
        </div>
    )
}

export default Chat
