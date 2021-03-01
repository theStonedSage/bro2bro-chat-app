import React, { useContext, useEffect, useState } from 'react'
import { useCookies,Cookies } from 'react-cookie'
import Chat from '../chat/Chat'
import { Input } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  CloseOutlined,
  LogoutOutlined,
  CopyOutlined
} from '@ant-design/icons';
import { UserContext } from '../../contexts/userContext';
import Room from '../room/Room';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const getUrlParameter = (name) => {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  let results = regex.exec(window.location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};


const Home = () => {

    const joinRoom = getUrlParameter('joinroom')
    // if(!joinRoom) joinRoom=''
    // global states
    const [cookies,removeCookie] = useCookies(['token']);
    const {user,saveUser} = useContext(UserContext);
    const [collapsed,setCollapsed] = useState(false);

    //input states
    const [removeRoom,setRemoveRoom] = useState('');
    const [addRoom,setAddRoom] = useState('');
    const [qRoom,setqRoom] = useState('');

    // room states 
    const [room,setRoom] = useState({name:'main',type:'default'});
    const [quickRooms,setQuickRooms] = useState([]);

    useState(()=>{
      if(joinRoom){
        const i = user.info.rooms.findIndex((r)=>r.name==joinRoom);
        if(i>=0){
          setRoom({name:joinRoom,type:'myRooms'});
        }
        else{
          setQuickRooms((r)=>([...r,joinRoom]));
          setRoom({name:joinRoom,type:'quickRooms'});
        }
      }
      
    },[])



    const onCollapse = ()=>{
        setCollapsed(collapsed=>!collapsed)
    }

    const handleClick = (e)=>{
        setRoom(e);
    }

    const createRoom = (e)=>{
      axios.get(`http://localhost:4000/room/createRoom/${e.target.value}`,{
            headers:{
                Authorization: 'JWT ' + cookies.token
            }
        }).then(res=>{
          if(res.status==200&&res.data.change){
            console.log(res);
            saveUser((u)=>({...u,info:res.data}));
            setAddRoom('');
          }
            
        }).catch(err=>{
            console.log(err)
        });
    }

    const deleteRoom = (e)=>{
      axios.get(`http://localhost:4000/room/deleteRoom/${e.target.value}`,{
            headers:{
                Authorization: 'JWT ' + cookies.token
            }
        }).then(res=>{
          if(res.status==200&&res.data.change){
            console.log(res);
            saveUser((u)=>({...u,info:res.data}))
            setRemoveRoom('');
          }
            
        }).catch(err=>{
            console.log(err)
        });
    }

    const createQuickRoom = (e)=>{
      const i = user.info.rooms.findIndex((r)=>r.name==qRoom);
      if(i<0){
        setQuickRooms((r)=>([...r,e.target.value]));
        setqRoom('');
      }
    }

    const logout = ()=>{
      console.log('here');
      removeCookie('token');
    }

    useEffect(()=>{
        // console.log('home is here')
        console.log(room);
        console.log(user);
    })

    if(!cookies.token){
      return <Redirect to="/login" />
    }
    return (
        <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          {/* <div className="logo" > */}
            <img style={{background:'none',height:'13%',width:'85%',margin:'1rem 0 1rem 0.5rem'}} className="logo" src="/img/icon2.png" alt="icon" />
          {/* </div> */}
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              {`Welcome ${user.info.name}`}
            </Menu.Item>

            <SubMenu key="sub1" icon={<UserOutlined />} title="My Rooms">
              {user.info.rooms.map(({name},i)=>(<Menu.Item  key={i+10}><div onClick={()=>setRoom({name:name,type:'myRooms'})}>{name}</div> </Menu.Item>))}
              
              
            </SubMenu>

            <SubMenu key="sub2" icon={<UserOutlined />} title="Quick Rooms">
              {quickRooms.map((r,i)=>(<Menu.Item  key={i+30}><div onClick={()=>setRoom({name:r,type:'QuickRooms'})}>{r}</div> </Menu.Item>))}
            </SubMenu>

            <SubMenu key="sub3" icon={<UserOutlined />} title="Create Room">
              <div style={{width:150,margin:'1rem auto'}}>
              <Input value={addRoom} onChange={(e)=>setAddRoom(e.target.value)} onKeyPress={(e)=>e.key==='Enter'?createRoom(e):null} placeholder="Create Room" />
              </div>
            </SubMenu>
            <SubMenu key="sub4" icon={<UserOutlined />} title="Join Quick Room">
              <div style={{width:150,margin:'1rem auto'}}>
                <Input value={qRoom} onChange={(e)=>setqRoom(e.target.value)} onKeyPress={(e)=>e.key==='Enter'?createQuickRoom(e):null}  placeholder="Quick Room" />
              </div>
              
            </SubMenu>
            <SubMenu key="sub5" icon={<UserOutlined />} title="Delete Room">
              <div style={{width:150,margin:'1rem auto'}}>
                <Input value={removeRoom} onChange={(e)=>setRemoveRoom(e.target.value)} onKeyPress={(e)=>e.key==='Enter'?deleteRoom(e):null} placeholder="Delete Room" />
              </div>
            </SubMenu>

            
            
            
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0,background:'#001529' }} >
            <div className="headerContainer">
              <div className="inputContainer">
                <p className='inviteHeading'>Invite your Bro's 🔥 ➡️</p>
                <div className="bannerContainer">
                  <span className="copyText">{room.name=='main'?'copy the room URL from here':`http://localhost:3000/home?joinroom=${room.name}`}</span>
                  <span onClick={() => {navigator.clipboard.writeText(room.name=='main'?'copy the room URL from here':`http://localhost:3000/home?joinroom=${room.name}`)}} className="copyIcon">
                    <CopyOutlined />
                  </span>
                </div>
              </div>
              <span >
                <LogoutOutlined onClick={logout} className="iconContainer"  />
              </span>
            </div>
            {/* <button >Copy to clipboard with button</button> */}
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Room</Breadcrumb.Item>
              <Breadcrumb.Item>{room.type}</Breadcrumb.Item>
              <Breadcrumb.Item>{room.name}</Breadcrumb.Item>
            </Breadcrumb>

           
            {/* component to conditionally render all rooms  */}
            <Room myRooms={user.info.rooms} quickRooms={quickRooms} name={user.info.name} room={room.name} />


          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    )
}

export default Home
