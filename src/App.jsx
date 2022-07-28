import React from 'react'
import {Outlet} from 'react-router-dom'
import { Button, Layout } from 'antd';
import logoImg from './assets/logo.png'
const {Sider,Content} = Layout

export default function App() {
  return (
    <div>
      <Layout className="app">
      <header><img src={logoImg} alt="" /><div className="right">右侧</div></header>
      <Layout>
        <Sider>Sider</Sider>
        <Content>
          <div>
            <Outlet/>
          </div>
        </Content>
      </Layout>
      <footer>Respect | Copyright @copy; 2022 Author 你单排吧</footer>
    </Layout>
    </div>
  )
}
