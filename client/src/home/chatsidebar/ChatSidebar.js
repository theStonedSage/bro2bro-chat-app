import React from 'react'
import ChatInfo from './chatinfo/ChatInfo'
import ChatList from './chatlist/ChatList'
import {IoChevronBackSharp} from 'react-icons/io5'
import './chatsidebar.css'

const ChatSidebar = ({setToggle}) => {
    return (
        <div className="chatSidebarWrapper">
            <div className="chatSidebarHeader">
                <span onClick={()=>setToggle((p)=>!p)} className="backIcon"><IoChevronBackSharp /></span>
                
                <span style={{fontSize:'1.5rem'}} >Chat</span>
            </div>
            <ChatInfo />
            <ChatList />
        </div>
    )
}

export default ChatSidebar
