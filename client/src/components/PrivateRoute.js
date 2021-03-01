import React, { useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
// import Cookies from 'js-cookie';
import { Route, Redirect } from 'react-router-dom'
import axios from 'axios';
import { UserContext } from '../contexts/userContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    console.log('entered2');
    const [cookies] = useCookies(['token']);
    const [dummy,setDummy] = useState(1);
    const {user,saveUser} = useContext(UserContext);
    const [isAuthenticated,setIsAuthenticated] = useState(null)

    useEffect(()=>{
        // console.log(isAuthenticated);
        console.log(user);
    },[user])

    useEffect(()=>{
        
        const token = cookies.token;
        axios.get('http://localhost:4000/getData',{
            headers:{
                Authorization: 'JWT ' + token
            }
        }).then(res=>{
            console.log(res);
            // setIsAuthenticated(true);
            if(res.data.auth){
                saveUser({
                    data:true,
                    fetching:false,
                    info:res.data,
                    currentRoom:'main'
                })
                
                setIsAuthenticated(true);
            }
            else{
                setIsAuthenticated(false);
            }
        }).catch(err=>{
            console.log(err)
            setIsAuthenticated(false);
        });
    },[dummy])

    

    if(isAuthenticated===null){
        return <></>
    }

    return (
    <Route {...rest} render={props =>
        !isAuthenticated ? (
            <Redirect to="/login" />
        ) : (
            <Component {...props} />
        )
        }
    />
    )
}

export default PrivateRoute
