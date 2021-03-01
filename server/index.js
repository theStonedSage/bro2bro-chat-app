const express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
const rootRouter = require('./routes/root')
const roomRouter = require('./routes/room')
const passport = require('passport');
const socketio = require('socket.io');
const {addUser,removeUser,getUser,getUsersInRoom,getAllUsers,updateRoom} = require('./users');


const app = express();
const server = http.createServer(app);
const io = socketio(server);
mongoose.connect("mongodb+srv://admin-amit:amit@cluster0.r4z9d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false},()=>{
    console.log('db connected');
});
mongoose.set('useCreateIndex', true);


// app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());


io.on('connection',(socket)=>{
    console.log(`user ${socket.id} has joined`);

    socket.on('join',({name,room},cb)=>{
        console.log(`user ${name} is trying to join ${room}`);
        const { error, user } = addUser({ id: socket.id, name, room });
        console.log(user);
        if(error) return cb(error);

        if(user){
            socket.join(user.room);

            socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
            socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
            updateRoom({room,remove:false});

            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
            
        } 
        
        else{
            socket.emit('message',{user:false,text:'user cannot join'})
        }
    
    })

    socket.on('sendMessage', (message, callback) => {
        console.log(getAllUsers());
        const user = getUser(socket.id);
        console.log('sending msg');
        console.log(socket.id);
        console.log(user);
        if(user) io.to(user.room).emit('message', { user: user.name, text: message });
        else socket.emit('message', { user: 'admin', text: `cannot send message`});
    
        callback();
    });

    socket.on('disconnect',()=>{
        console.log(`user ${socket.id}  has left`);
    })
})

app.use("/",rootRouter);
app.use("/room",roomRouter);


server.listen(4000||process.env.PORT,()=>{
    console.log(`server started at port 4000`);
})