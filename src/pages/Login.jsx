import React from 'react'
import './less/Login.less'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import logoImg from '../assets/logo.png'
import { LoginApi } from '../request/api';

export default function Login() {
  const navigate = useNavigate()
  const onFinish = (values) => {
    LoginApi({
      username : values.username,
      password : values.password
    }).then(res=>{
      if(res.errCode===0){
        // localStorage.setItem('User',JSON.stringify(res.data))
        console.log(res.data);
        localStorage.setItem('avatar',res.data.avatar)
        localStorage.setItem('cms-token',res.data['cms-token'])
        localStorage.setItem('editable',res.data.editable)
        localStorage.setItem('player',res.data.player)
        localStorage.setItem('username',res.data.username)
        message.success('登录成功')
        setTimeout(() => {
          navigate('/')
        }, 1500);
      }else{
        message.failed(res.message)
      }
    })
  };

  return (
    <div className="login">
      <div className="login_box">
        <img src={logoImg} alt="" />
      <Form
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
      size="large"
        name="username" 
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="请输入用户名"/>
      </Form.Item>

      <Form.Item
      size="large"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="请输入密码"/>
      </Form.Item>

      <Form.Item>
        <Link to="/register">还没账号？立刻注册</Link>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block size="large">
          登录
        </Button>
      </Form.Item>
    </Form>
      </div>
    </div>
  );
}
