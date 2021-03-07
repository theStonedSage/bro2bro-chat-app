import React from 'react'

const ChatBox = ({active}) => {
    return (
        <div className={`chatBoxConatiner ${active&&'chat-selected'}`}>
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="profile img" />
            <div className="details">
                <p className="heading">Real Estate Details</p>
                <p>I will soon send you the </p>
            </div>
            <p>11:45</p>
        </div>
    )
}

export default ChatBox
