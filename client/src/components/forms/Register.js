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

const Register = () => {
    // console.log('exec start')
    // const [cookies,setCookie] = useCookies(['token']);
    const [alert,setAlert] = useState({
        show:false,
        bypass:false,
        msg:''
    });

    useEffect(()=>{
        console.log(alert);
    },[alert])

    const onFinish = (values) => {
        console.log('Success:', values);
        axios.post('http://localhost:4000/register',values).then(res=>{
            if(res.data.success){
                setAlert({
                    show:false,
                    bypass:true,
                    msg:'congrats username registered :), Login to start chatting'
                })
            }
            else{
                setAlert({
                    show:true,
                    bypass:false,
                    msg:res.data.msg
                })
            }
            
            console.log('reached here');
            
        }).catch(err=>console.log(err));
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);


    };


    
    if(alert.bypass){
        console.log('here');
        return <Redirect to={`/login?alert=${alert.msg}`} />;
    }

    return (
        // <div className="formWrapper">
        <>
        <div className="icon-div" >
            <img  src="/img/icon.png" alt="icon" />
        </div>
        {alert.show&&<div style={{background:`${alert.success?'#237804':'#ad2102'}`}} className="outContainer">
            <p>{alert.msg}</p>
        </div>}
        {
        (
            <div style={{}} className="cont">
            <h1>Register Now</h1>
                <Form
            {...layout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
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
            <p>Already have an account ? <Link to="/login">Login</Link> now </p>
        </div>
        )
        }
        </>
        
    // </div>
    )
}

export default Register
