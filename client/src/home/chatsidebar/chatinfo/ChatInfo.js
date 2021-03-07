import React from 'react'
import {IoIosArrowDropdown} from 'react-icons/io';
import {AiOutlineDown} from 'react-icons/ai'
import { BiSearch} from 'react-icons/bi'
import '../chatsidebar.css'

const ChatInfo = () => {
    return (
        <div className="chatInfoWrapper">
            <div style={{position:'relative'}}>
                <div className="online-icon" />
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="" />
            </div>
            <h2>Jontray Arnorld</h2> 
            <div className="dropdown">
                <p>availible</p>
                <AiOutlineDown style={{fontSize:'1rem'}} />
            </div>
            <div className="search">
                <input type="text" placeholder="Search .." />
                <button >
                    <BiSearch />
                </button>
            </div>
        </div>
    )
}

export default ChatInfo
