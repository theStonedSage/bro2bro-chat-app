import Axios from 'axios';
import React,{useEffect} from 'react';
import { useCookies } from 'react-cookie';

const UserContext = React.createContext();

const UserProvider = UserContext.Provider;

const UserContextProvider = (props)=>{
    const [user,setUser] = React.useState({data:false,fetching:true});
    
    useEffect(()=>{
        console.log(user);
    },[user]);
    
    

    const saveUser = (e)=>{
        setUser(e);
    }


    return (
        <UserProvider value = {{user,saveUser}} >
            {props.children}
        </UserProvider>
    )
}

export {UserContext,UserContextProvider};