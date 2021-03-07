import React from 'react'
import {GrEmoji,GrAttachment} from 'react-icons/gr';
import {FiSend} from 'react-icons/fi';

const ChatBar = () => {
    return (
        <div className="chatBarContainer">
            <input placeholder="Write your message ..." type="text" />
            <div>
                <button>
                    <GrEmoji />
                </button>
                <button>
                    <GrAttachment />
                </button>
                <button style={{background:'#00a389',color:'#fff'}}>
                    <FiSend />
                </button>
            </div>
        </div>
    )
}

export default ChatBar
