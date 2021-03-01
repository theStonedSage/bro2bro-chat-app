import React from 'react';
import './index.css';

const Message = ({message:{user,text},name}) => {
    // console.log(name);
    
    let isSentByCurrentUser = false;
     
    const trimmedName = user.trim().toLowerCase();
    
    if(trimmedName===name){
        isSentByCurrentUser = true;
    }
    return (
        isSentByCurrentUser?(
            <div className="messageContainer justifyEnd" >
                <p className="sentText pr-10">{trimmedName}</p>
                <div className="messageBox backgroundBlue">
                     <p  className="messageText colorWhite">{text}</p>
                </div>
            </div>
        ):(
            <div className="messageContainer justifyStart" >
                
                <div className="messageBox backgroundLight">
                    <p  className="messageText colorDark">{text}</p>
                </div>
                <p className="sentText pl-10">{user}</p>
            </div>
        )
    )
}

export default Message
