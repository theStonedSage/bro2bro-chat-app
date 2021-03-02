const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const jwtSecret = require('../config/jwtConfig');
const {getUsersInRoom,updateRoom} = require('../users');
const cors = require('cors');

const jwt = require('jsonwebtoken');
require('../config/passport');

const options = {
    origin:'http://localhost:3000',
    optionsSuccessStatus:200
}

router.get('/createRoom/:room',cors(options),async (req,res,next)=>{
    passport.authenticate('jwt',{session:false},(err,user,info)=>{
        console.log('entered');
        if(err){
            console.log(err);
        }
        if(info){
            console.log(user);
            res.send(info)
        }
        else{
            console.log('user found');
            User.findOne({name:user.name}).then(async (u)=>{
                console.log('user is this',u,req.params.room);
                const sameIndex = u.rooms.findIndex((r)=>r==req.params.room) ;

                if(sameIndex<0){
                    u.rooms.push({
                        name:req.params.room,
                        messages:[]
                    });
                    await u.save();
                    res.status(200).send({
                        auth:true,
                        change:true,
                        name:user.name,
                        rooms:u.rooms,
                        msg:'room added succesfully'
                    })
                }
                else{
                    res.status(200).send({
                        auth:true,
                        change:false,
                    })
                }
                
            }).catch(err=>{
                res.status(500).send({
                    auth:true,
                    name:user.name,
                    rooms:user.rooms,
                    msg:'error occured'
                })
            })
            
        }
    })(req,res,next)
})

router.get('/deleteRoom/:room',cors(options),async (req,res,next)=>{
    passport.authenticate('jwt',{session:false},(err,user,info)=>{
        console.log('entered');
        if(err){
            console.log(err);
        }
        if(info){
            console.log(user);
            res.send(info)
        }
        else{
            console.log('user found');
            User.findOne({name:user.name}).then(async (u)=>{
                // console.log('user is this',u,req.params.room);
                const index = u.rooms.findIndex((r)=>r.name==req.params.room) ;

                if(index>=0){
                    u.rooms.splice(index,1);
                    console.log(u.rooms);
                    await u.save();

                    const num = getUsersInRoom(req.params.room).length;
                    if(num==1) updateRoom({room:req.params.room,remove:true});
                    res.status(200).send({
                        auth:true,
                        change:true,
                        name:user.name,
                        rooms:u.rooms,
                        msg:'room deleted'
                    })
                }
                else{
                    res.status(200).send({
                        auth:true,
                        change:false,
                    })
                }
                
            }).catch(err=>{
                res.status(500).send({
                    auth:true,
                    name:user.name,
                    rooms:user.rooms,
                    msg:'error occured'
                })
            })
            
        }
    })(req,res,next)
})

router.post('/savemessage/:room',cors(options),async (req,res,next)=>{
    passport.authenticate('jwt',{session:false},(err,user,info)=>{
        console.log('entered');
        if(err){
            console.log(err);
        }
        if(info){
            console.log(user);
            res.send(info)
        }
        else{
            console.log('user found');
            User.findOne({name:user.name}).then(async (u)=>{
                // console.log('user is this',u,req.params.room);
                const index = u.rooms.findIndex((r)=>r.name==req.params.room) ;

                if(index>=0){
                    console.log('begining');
                    console.log(u.rooms[index].messages)
                    // if(u.rooms[index].messages[0]==null) u.rooms[index].messages=[];
                    const msg = req.body.messages[req.body.messages.length-1];
                    if(msg){
                        u.rooms[index].messages.push(msg);
                        console.log('modified');
                        console.log(u.rooms[index].messages);
                        await u.save();
                    }
                    
                    // console.log('messages saved');
                    res.status(200).send({
                        auth:true,
                        change:true,
                        name:u.name,
                        rooms:u.rooms,
                        messages:u.rooms[index].messages,
                        msg:'message saved'
                    })
                }
                else{
                    res.status(200).send({
                        auth:true,
                        change:false,
                    })
                }
                
            }).catch(err=>{
                console.log(err);
                res.status(500).send({
                    auth:true,
                    name:user.name,
                    rooms:user.rooms,
                    msg:'error occured'
                })
            })
            
        }
    })(req,res,next)
})


router.get('/getmessages/:room',cors(options),async (req,res,next)=>{
    passport.authenticate('jwt',{session:false},(err,user,info)=>{
        console.log('entered');
        if(err){
            console.log(err);
        }
        if(info){
            console.log(user);
            res.send(info)
        }
        else{
            console.log('user found');
            User.findOne({name:user.name}).then(async (u)=>{
                // console.log('user is this',u,req.params.room);
                const index = u.rooms.findIndex((r)=>r.name==req.params.room) ;

                if(index>=0){
                    
                    res.status(200).send({
                        auth:true,
                        change:true,
                        name:u.name,
                        messages:u.rooms[index].messages,
                        msg:'message saved'
                    })
                }
                else{
                    res.status(200).send({
                        auth:true,
                        change:false,
                        messages:null
                    })
                }
                
            }).catch(err=>{
                console.log(err);
                res.status(500).send({
                    auth:true,
                    name:user.name,
                    rooms:user.rooms,
                    msg:'error occured'
                })
            })
            
        }
    })(req,res,next)
})





module.exports = router;