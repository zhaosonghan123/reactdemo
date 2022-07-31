import React, { useEffect, useState } from 'react'
import { Button, Modal, PageHeader, Form, Input, message } from 'antd'
import moment from 'moment'
import E from 'wangeditor'
import { ArticleAddApi, ArticleSearchApi, ArticleUpdateApi } from '../request/api'
import { useParams, useNavigate, useLocation } from 'react-router-dom'

let editor = null
export default function Edit() {
  const location = useLocation()
  const params = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState()
  const [subTitle, setSubTitle] = useState()
  const [content, setContent] = useState()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const dealData = (errCode, msg) => {
    setIsModalVisible(false)
    if (errCode === 0) {
      message.success(msg)
      navigate('/listtable')
    } else {
      message.error(msg)
    }
  }

  const handleOk = () => {
    // setIsModalVisible(false);
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        if (params.id) {
          console.log(form.getFieldValue('title'));
          ArticleUpdateApi({ title: values.title, subTitle: values.subTitle, content, id: params.id }).then(res => { dealData(res.errCode, res.message) })
        } else {
          ArticleAddApi({
            title: values.title,
            subTitle: values.subTitle,
            content: content
          }).then(res => dealData(res.errCode, res.message)
          )
        }
        console.log('Received values of form: ', values);
        setIsModalVisible(false);
      })
      .catch((info) => {
        return;
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    editor = new E('#div1')
    editor.config.onchange = (newHtml) => {
      setContent(newHtml)
    }
    editor.create()
    if (params.id) {
      ArticleSearchApi({
        id: params.id
      }).then(res => {
        editor.txt.html(res.data.content)
        setTitle(res.data.title)
        setSubTitle(res.data.subTitle)
      })
    }
    return () => {
      editor.destroy()
    }
  }, [location.pathname])

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
      <PageHeader
        ghost={false}
        onBack={params.id ? () => window.history.back() : null}
        title="文章编辑"
        subTitle={'当前日期:' + moment(new Date()).format('YYYY-MM-DD')}
        extra={[
          <Button key="1" type="primary" onClick={() => setIsModalVisible(true)}>
            提交文章
          </Button>,
        ]}
      />
      <div id="div1"></div>
      <Modal title="Basic Modal" zIndex={99999} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText='提交' cancelText='取消'>
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 3,
          }}
          wrapperCol={{
            span: 21,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            initialValue={title}
            label="标题"
            name="title"
            rules={[
              {
                required: true,
                message: '请输入标题',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            initialValue={subTitle}
            label="副标题"
            name="subTitle"
          >
            <Input />
          </Form.Item>

        </Form>
      </Modal>
    </div>
  )
}
