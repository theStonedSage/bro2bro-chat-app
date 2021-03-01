import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import axios from 'axios'
import { useCookies } from 'react-cookie'
// import Cookies from 'js-cookie';
import 'antd/dist/antd.css';
import './styles.css';
import { Link, Redirect } from 'react-router-dom';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const getUrlParameter = (name) => {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

const Login = () => {

    const param = getUrlParameter('alert');
    // console.log(alert);

    const [alert,setAlert] = useState({
        show:param?true:false,
        success:true,
        txt:param
    });

    console.log('exec start')
    const [cookies,setCookie] = useCookies(['token']);

    const onFinish = (values) => {
        console.log('Success:', values);
        axios.post('http://localhost:4000/login',values).then(res=>{
            if(res.data.success){
                console.log('got token',res.data.token);
                setCookie('token',res.data.token);
            }
            else{
                setAlert({
                    show:true,
                    success:false,
                    txt:res.data.msg
                });
            }
            
            console.log('reached here');
            
        }).catch(err=>console.log(err));
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);


    };


    console.log(cookies.token);

    if(cookies.token){
        console.log('here');
        return <Redirect to="/home" />;
    }

    return (
        // <div className="formWrapper">
        <>
        <div className="icon-div" >
            <img  src="/img/icon.png" alt="icon" />
        </div>
        {alert.show&&<div style={{background:`${alert.success?'#237804':'#ad2102'}`}} className="outContainer">
            <p>{alert.txt}</p>
        </div>}
        {
        (   <div>
            <div className="cont">
            <h1>Login Now</h1>
                <Form
            {...layout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{color:'white'}}
            >
            <Form.Item
                label="Username"
                name="email"
                rules={[
                {
                    required: true,
                    message: 'Please input your username!',
                },
                ]}

            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
                ]}
            >
                <Input.Password />
            </Form.Item>

            {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item> */}

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                Submit
                </Button>
            </Form.Item>
            </Form>
            <p>dont have an account ? <Link to="/register">Register</Link> now </p>
        </div>
        </div>
        )
        }
        </>
        
    // </div>
    )
}

export default Login
