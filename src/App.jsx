import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd';
import Header from './components/Header';
import Aside from './components/Aside';

const { Content } = Layout

export default function App() {
  return (
    <div>
      <Layout className="app">
        <Header />
          <div className="aside">
          <Aside/>
            <div className="right">
              <Outlet />
            </div>
          </div>
        <footer>Respect | Copyright @copy; 2022 Author 你单排吧</footer>
      </Layout>
    </div>
  )
}
