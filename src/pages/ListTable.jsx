import React, { useEffect, useState } from 'react'
import './less/ListTable.less'
import { Space, Table, Button, message } from 'antd';
import { ArticleListApi, ArticleDeleteApi } from '../request/api';
import moment from 'moment';
import { useNavigate } from 'react-router-dom'

function MyTitle(props) {
  return (
    <div>
      <a className="table-title" href={"http://codesohigh.com:8765/article/" + props.id}>{props.title}</a>
      <p style={{ color: '#999' }}>{props.subTitle}</p>
    </div>
  )
}

export default function ListTable() {
  const navigate = useNavigate()
  const [arr, setArr] = useState()
  const [update,setUpdate] = useState(1)
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 ,total: 0})

  const getArticleList = (current, pageSize) => {
    ArticleListApi({
      num: current,
      count: pageSize,
    }).then(res => {
      if (res.errCode === 0) {
        let newArr = JSON.parse(JSON.stringify(res.data.arr))
        let myArr = [];
        let {num,count,total} = res.data
        setPagination({
          current: num,
          pageSize: count,
          total
        })
        newArr.map(item => {
          let obj = {
            key: item.id,
            date: moment(item.date).format("YYYY-MM-DD hh:mm:ss"),
            mytitle: <MyTitle id={item.id} title={item.title} subTitle={item.subTitle} />
          }
          myArr.push(obj)
        })
        setArr(myArr)
      }
    })
  }

  const pageChange = (arg) => {
    getArticleList(arg.current,arg.pageSize)
  }

  const handleDelete = (id) => {
    ArticleDeleteApi({id}).then(res=>{
      if(res.errCode===0){
        message.success(res.message)
        setUpdate(update+1)
      }else{
        message.error(res.message)
      }
    })
  }

  useEffect(() => {
    getArticleList(pagination.current,pagination.pageSize)
  }, [update])

  const columns = [
    {
      width: '60%',
      dataIndex: 'mytitle',
      key: 'mytitle',
      render: text => <div>{text}</div>

    },
    {
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Action',
      key: 'action',
      render: text => (
        <Space size="middle">
          <Button type='primary' onClick={() => navigate('/edit/'+text.key)}>编辑</Button>
          <Button type='primary' danger onClick={ () => handleDelete(text.key)}>删除</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="list_table">
      <Table
        showHeader={false} 
        columns={columns} 
        dataSource={arr} 
        pagination={pagination}
        onChange={pageChange}
      />
    </div>
  )
}
