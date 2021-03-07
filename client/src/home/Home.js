import React, { useState } from 'react'
import CircularIcon from './icons/CircularIcon';
import {FcBriefcase,} from 'react-icons/fc'
import {AiOutlineClockCircle,AiOutlineFileDone,AiFillEye,AiOutlineUsergroupAdd} from 'react-icons/ai'
import './home.css'
import ChatSidebar from './chatsidebar/ChatSidebar';
import Chat from './chat/Chat';



const HomeMain = () => {
    const [toggle,setToggle] = useState(true);
    const [selectedIcon,setSelectedIcon] = useState(0);
    return (
        <div style={{gridTemplateColumns:toggle?'7% 25% 68%':'7% 0% 93%'}}  className="mainWrapper-1">
            <div className="iconWrapper">
                {/* logo */}
                <FcBriefcase className="icon" />
                
                {/* <button onClick={()=>setToggle((p)=>!p)}>collapse</button> */}
                <div className="iconLong">

                    {[<AiOutlineClockCircle />,<AiOutlineFileDone />,<AiFillEye />,<AiOutlineUsergroupAdd />].map((e,i)=>(
                        <div onClick={()=>{setSelectedIcon(i); setToggle(true); }} style={{borderRight:selectedIcon===i?'4px solid #00a389':''}} key={i} className="iconContainer0 icon">
                            <div className={selectedIcon===i?`selected`:'normal'}>
                                {e}
                            </div>
                        </div>
                    ))}


                </div>

                {/* profile image  */}
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" className="circularIcon" alt="profile" />
                
            </div>
            <div className="toggleContainer">
                
                <div  className={`iconSidebar`} >
                    <ChatSidebar setToggle={setToggle} />
                    
                </div>
                <div className={`chatWrapper ${toggle&&'w-cut'}`}>
                    <Chat />
                </div>
            </div>
            {/* <div className="rightSidebar">
                popye
            </div> */}
        </div>
    )
}
// className={`iconSidebar ${toggle&&'open'}`}
export default HomeMain
