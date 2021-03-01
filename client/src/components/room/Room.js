import React, { useEffect } from 'react'
import Chat from '../chat/Chat';

const Room = ({myRooms,room,name,quickRooms}) => {
    useEffect(()=>{
        console.log(room);
    })
    return (
        <div>
            {
                myRooms.map((r)=>(room==r.name&&<Chat rom={r.name} nme={name}/>))
            }
            {
                quickRooms.map((r)=>(room==r&&<Chat rom={r} nme={name}/>))
            }
             
        </div>
    )
}

export default Room
