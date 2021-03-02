import React, { useEffect, useState } from 'react'
import queryString from 'query-string';
import io from 'socket.io-client';
import './index.css';
import axios from 'axios';
import Input from '../input/Input';
import Infobar from './infobar/Infobar';
import Message from './message/Message';
import { useCookies } from 'react-cookie';



let socket;

const Chat = ({nme,rom}) => {
    // console.log('start');
    const [room,setRoom] = useState(rom);
    const [name,setName] = useState(nme);
    const [cookies] = useCookies(['token']);
    
    //socket states
    const [message,setMessage] = useState('');
    const [messages,setMessages] = useState([]);
    const ENDPOINT = 'localhost:4000';
    const [msgCount,setMsgCount] = useState(0);
    // const ENDPOINT = 'localhost:4000';

    useEffect(()=>{
        
        //conection established
        socket= io(ENDPOINT);

        //emmiting join event to save the user
        socket.emit('join',{name:name,room:room},()=>{
            console.log('socket connected');
        });

        

        return ()=>{
            // socket.emit('disconnect');
            socket.off();
        }

    },[ENDPOINT,rom,room]);

    useEffect(()=>{
        
    },[])

    

    useEffect(()=>{
        // console.log('inside',room);
        //get messages of room from db
        axios.get(`http://localhost:4000/room/getmessages/${rom}`,{
            headers:{
                Authorization: 'JWT ' + cookies.token
            }
            }).then(res=>{
            if(res.status==200&&res.data.change){
                
                setMessages((m)=>[...m,...res.data.messages]);
            }
                
            }).catch(err=>{
                console.log(err)
        });
    },[room])


    useEffect(()=>{
        if(msgCount<messages.length){
            setMsgCount(messages.length);
        }
        
        socket.on('message',(msg)=>{
            
            setMessages([...messages,msg]);
        })
    },[messages]);


    useEffect(()=>{

        //update messages on db
        console.log(messages);
        axios.post(`http://localhost:4000/room/savemessage/${rom}`,{messages:messages},{
            headers:{
                Authorization:`JWT ${cookies.token}`
            }
        }).then(res=>{
            // console.log(res);
            
        
        }).catch(err=>console.log(err));

        // console.log('axios end');
    },[msgCount])

    const sendMessage = (e)=>{
        // console.log('inside emit',message);
        e.preventDefault();
        if(message){
            socket.emit('sendMessage',message,()=>setMessage(''));
        }
    }

    return (
        <div className="outerContainer">
            <div className="container">
                <Infobar room={rom} />

                <div style={{maxHeight:800,overflowY:'scroll',padding:'1rem 0'}}>
                    {messages.map((message,i)=>(message&&<Message key={i} message={message} name={name} />))}
                </div>

                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    )
}

export default Chat
