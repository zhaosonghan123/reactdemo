import React, { useEffect, useState } from 'react'
import logoImg from '../assets/logo.png'
import defaultAvatar from '../assets/defaultAvatar.jpeg'
import { DownOutlined, SmileOutlined, CaretDownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, message, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate()
  const [avatar, setAvatar] = useState(defaultAvatar)
  const [username, setUsername] = useState('游客')
  const logout = () => {
    localStorage.clear()
    message.success('退出成功，即将返回登录页')
    setTimeout(() => {
      navigate('/login')
    }, 1500);
  }
  useEffect(()=>{
    let username1 = localStorage.getItem('username')
    if(username1){
      setUsername(username1)
    }
    let avatar1 = localStorage.getItem('avatar')
    if(avatar1){
      setAvatar('http://47.93.114.103:6688/'+avatar1)
    }
  },[])
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer">
              修改资料
            </a>
          ),
        },
        {
          type: 'divider',
        },
        {
          key: '2',
          label: (
            <a target="_blank" rel="noopener noreferrer" onClick={logout}>
              退出登录
            </a>
          ),
        },
      ]}
    />
  );

  return (
    <header>
      <img src={logoImg} className="logo" />
      <div className="right">
        <Dropdown overlay={menu}>
          <a href="#" onClick={(e) => e.preventDefault()}>
            <Space>
              <img src={avatar} alt="" className="avatar" />
              <span>{username}</span><CaretDownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </header>
  )
}