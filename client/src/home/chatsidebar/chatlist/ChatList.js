import React, { useState } from 'react'
import {AiOutlinePlus} from 'react-icons/ai'
import {BiDotsVerticalRounded} from 'react-icons/bi'
import ChatBox from '../chatbox/ChatBox'

const ChatList = () => {
    const [active,setActive] = useState(0);
    return (
        <div className="chatList">
            <div className="last">
                <span>Last Chats</span>
                <span className="options">
                    <span className="icon-s">
                        <AiOutlinePlus />
                    </span>
                    <span >
                        <BiDotsVerticalRounded />
                    </span>
                </span>
            </div>
            <div className="chatScroler" >
                {[1,2,3,4,5,6,7].map((e,i)=>(
                    <ChatBox onClick={()=>console.log('clicked')} key={i} active={active==i&&"true"}  />
                ))}
                
                {/* <ChatBox />
                <ChatBox />
                <ChatBox />
                <ChatBox />
                <ChatBox />
                <ChatBox /> */}
            </div>
        </div>
    )
}

export default ChatList
