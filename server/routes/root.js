const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const jwtSecret = require('../config/jwtConfig');

const jwt = require('jsonwebtoken');
require('../config/passport');



router.get("/",(req,res)=>{
    console.log(req.user);
    res.send('api working');
})

router.post("/register",(req,res,done)=>{
    console.log(req.body);
    passport.authenticate('register',(err,user,info)=>{
        // console.log(err,user,info);
        if(err){
            console.log(err);
        }
        if(info){
            res.send({
                msg:info.msg,
                success:false
            });
        }
        else{
            User.findOne({name:req.body.name},(err,u)=>{

                if(err) res.status(500).send({msg:'internal server error'});
                res.status(200).send({
                    success:true,
                    msg:'user registered'
                });

            })
        }
    })(req,res,done);
});

router.post('/login',(req,res,next)=>{
    passport.authenticate('login',(err,user,info)=>{
        if(err){
            console.log(err);
        }
        if(info){
            res.send({
                success:false,
                msg:info.msg
            });
        }
        else{
            req.login(user, err=>{
                console.log('user logged in');
                User.findOne({name:user.name},(err,u)=>{
                    const token = jwt.sign({id:user.name},jwtSecret.secret);
                    res.status(200).send({
                        success:true,
                        auth:true,
                        token:token,
                        msg:'user found and loggen in'
                    })
                })
            })
        }
    })(req,res,next)
})

router.get('/getData',(req,res,next)=>{
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
            res.status(200).send({
                auth:true,
                name:user.name,
                rooms:user.rooms,
                msg:'user found in db'
            })
        }
    })(req,res,next)
})





module.exports = router;