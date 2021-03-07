import React from 'react'

const MessageBox = ({left}) => {
    
    return (
        <div style={{justifyContent:left?'flex-start':'flex-end'}} className="messageBoxContainer">
                {left&&<img src="http://kittenboo.com/blog/wp-content/uploads/2020/03/Patrick_Jackson_007arw.jpg"></img>}
                
                <div>
                    <p>{`${left?'Evan Scott':'You'}, 11:25Am`}</p>
                    <p style={{backgroundColor:left?'#fff':'rgb(221, 219, 219)',fontSize:'0.9rem'}} className="msg-highlight">this is the main msg this is the main msgthis is the main msgthis is the main msg</p>
                </div>
            {!left&&<img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"></img>}
        </div>
    )
}

export default MessageBox
