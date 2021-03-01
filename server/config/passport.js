const bcrypt = require('bcrypt');
const jwtSecret = require('./jwtConfig');

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const jwtStrategy = require('passport-jwt').Strategy;
const User = require('../models/User');
const extractJwt = require('passport-jwt').ExtractJwt;

passport.use('register',new localStrategy({
    usernameField:'email',
    passwordField:'password',
    session:false
},(username,passowrd,done)=>{
    try{
        User.findOne({name:username},(err,usr)=>{
            // console.log(res);
            if(usr){
                //user alreadt exists
                return done(null,false,{msg:'username already taken'});
            }
            else{
                bcrypt.hash(passowrd,10).then((pwd)=>{
                    const u = new User({
                        name:username,
                        password:pwd,
                        rooms:[]
                    })
                    u.save((err)=>{
                        // console.log('user saved');
                        return done(null,u);
                    });
                })
            }
        })
    }catch(err){
        done(err);
    }
}))


passport.use('login',new localStrategy({
    usernameField:'email',
    passwordField:'password',
    session:false
},(username,password,done)=>{
    try{
        User.findOne({name:username},(err,user)=>{
            if(user==null){
                return done(null,false,{msg:'Username not found'});
            }else{
                bcrypt.compare(password,user.password).then(res=>{
                    if(!res) return done(null,false,{msg:'Incorrect password'});
                    else{
                        return done(null,user);
                    }
                })
            }
        })
    }catch(err){
        done(err);
    }
}));

opts = {
    jwtFromRequest:extractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey:jwtSecret.secret,
}

passport.use('jwt',new jwtStrategy(opts,(jwt_payload,done)=>{
    try{
        console.log(jwt_payload);
        User.findOne({name:jwt_payload.id},(err,usr)=>{
            if(err) console.log(err);
            if(!usr){
                return done(null,false,{msg:'user not found in db'});
            }
            else{
                return done(null,usr);
            }
        })
    }catch(err){
        done(err)
    }
}))

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});