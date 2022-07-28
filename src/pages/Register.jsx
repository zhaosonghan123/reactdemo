import React from 'react'
import './less/Login.less'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message} from 'antd'
import {Link,useNavigate} from 'react-router-dom'
import logoImg from '../assets/logo.png'
import { RegisterApi } from '../request/api';

export default function Register() {
  const navigate = useNavigate()
  const onFinish = (values) => {
    return RegisterApi({
      username:values.username,
      password:values.password,
    }).then(res=>{
      console.log(res);
      if(res.errCode===0){
        message.success('注册成功')
        setTimeout(() => {
          navigate('/login')
        }, 1500);
      }else{
        message.error(res.message)
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
            message: '请输入用户名',
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
            message: '请输入密码',
          },
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="请输入密码"/>
      </Form.Item>

      <Form.Item
      size="large"
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: '请再次确认密码',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('请输入相同密码'));
            },
          }),
        ]}
      >
        <Input.Password prefix={<LockOutlined/>} placeholder="请再次确认密码"/>
      </Form.Item>

      <Form.Item>
        <Link to="/login">已有账号？前往登录</Link>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block size="large">
         立即注册
        </Button>
      </Form.Item>
    </Form>
      </div>
    </div>
  );
}
