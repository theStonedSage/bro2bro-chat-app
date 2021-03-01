const users = [];
const rooms = [];

const addUser = ({id,name,room})=>{
    if(users.length>100) users = [];
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    
    const existingUserIndex = users.findIndex((user)=>user.room === room&&user.name === name);
    const user = {id,room,name};
    if(existingUserIndex>=0){
        // console.log(existingUser);
        users[existingUserIndex] = user
        return {user:users[existingUserIndex]}
    }

    // const user = {id,room,name};
    console.log(user,'user saved');
    users.push(user);

    return {user};
}

const updateRoom = ({room,remove})=>{
    const index = rooms.findIndex((r)=>r==room);

    if(index>=0){
        //found
        if(remove){
            //remove room only if there are no members in it
            rooms.splice(index,1);
            
        }
    }
    else{
        if(!remove){
            rooms.push(room);
        }
    }

    console.log(rooms);
}

const removeUser = (id)=>{
    const index = users.findIndex((user)=>user.id===id );

    if(index!=-1){
        return users.splice(index,1)[0];
    }
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room)=>{
    return users.filter((user)=>user.room===room)
}

const getAllUsers = ()=>{
    return users;
}

module.exports = {addUser,removeUser,getUser,getUsersInRoom,getAllUsers,updateRoom};