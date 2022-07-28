import React,{useEffect, useState } from 'react'
import { ReadOutlined, EditOutlined, DatabaseOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate ,useLocation} from 'react-router-dom';

export default function Aside() {
  const location = useLocation()
  const navigate = useNavigate()
  const [theme, setTheme] = useState('dark');
  const [defaultKey, setDefaultKey] = useState();
  const onClick = (e) => {
    setDefaultKey(e.key);
    navigate('/'+e.key)
  };

  useEffect(()=>{
    let key = location.pathname.split('/')[1]
    setDefaultKey(key);
  },[])

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const items = [
    getItem('查看文章列表','list', <ReadOutlined />,),
    getItem('文章编辑','edit',<EditOutlined />,),
    getItem('修改资料','means', <DatabaseOutlined />,),
  ];

  return (
    <Menu
        className="aside-menu"
        theme={theme}
        onClick={onClick}
        style={{width: 180}}
        selectedKeys={[defaultKey]}
        mode="inline"
        items={items}
      />
  )
}
