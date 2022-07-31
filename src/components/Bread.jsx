import React, { useEffect, useState } from 'react'
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { useLocation } from 'react-router';

export default function Bread() {
  const { pathname } = useLocation()
  const [breadName, setBreadName] = useState()
  useEffect(() => {
    switch (pathname) {
      case '/listlist':
        setBreadName('查看文章列表'); break
      case '/listtable':
        setBreadName('查看文章列表'); break;
      case '/edit':
        setBreadName('文章编辑'); break;
      case '/means':
        setBreadName('修改资料'); break;
      default:
        setBreadName(pathname.includes('/edit') ? '文章编辑' : ''); break;
    }
  }, [pathname])
  return (
    <Breadcrumb style={{ height: '30px', lineHeight: '30px' }}>
      <Breadcrumb.Item href="/">
        <HomeOutlined />
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <span>{breadName}</span>
      </Breadcrumb.Item>
    </Breadcrumb>
  )
}
