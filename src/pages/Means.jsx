import React, { useEffect, useState } from 'react'
import { Button, Form, Input, message, Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import './less/Means.less'
import { GetUserInfoApi, UpdateUserInfoApi } from '../request/api';
import { connect } from 'react-redux'

//限制图片大小200KB   
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }

  const isLt2M = file.size / 1024 / 1024 / 1024 < 200;

  if (!isLt2M) {
    message.error('请上传小于200KB的图片!');
  }

  return isJpgOrPng && isLt2M;
};

//图片路径转base64
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

function Means(props) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    GetUserInfoApi().then(res => {
      if (res.errCode === 0) {
        console.log(res);
        message.success(res.message)
        sessionStorage.setItem('username1', res.data.username)
      } else {
        message.error(res.message)
      }
    })
  }, [])

  //点击上传图片
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
        localStorage.setItem('avatar', info.file.response.data.filePath)
        props.addKey()
      });
    }
  };

  const onFinish = (values) => {
    console.log(values.username, values.password);
    if (values.username && values.username !== sessionStorage.getItem('username1') && values.password.trim() !== '') {
      UpdateUserInfoApi({
        username: values.username,
        password: values.password
      }).then(res => {
        console.log(res);
        if (res.errCode === 0) {
          message.success(res.message)
          localStorage.clear()
          navigate('/login')
        } else {
          message.error(res.message)
        }
      })
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <div className='means'>
      <Form
        style={{ width: '400px' }}
        name="basic"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 19,
        }}
        initialValues={{

        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="修改用户名："
          name="username"
        >
          <Input placeholder="请输入新用户名" />
        </Form.Item>

        <Form.Item
          label="修 改 密 码："
          name="password"
        >
          <Input.Password placeholder="请输入新密码" />
        </Form.Item>

        <Form.Item
          // wrapperCol={{
          //   offset:20,
          //   span:4,
          // }}
          style={{ width: '400px' }}
        >
          <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
            提交
          </Button>
        </Form.Item>
      </Form>
      <p>点击下方修改头像：</p>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="/api/upload"
        headers={{ "cms-token": localStorage.getItem("cms-token") }}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: '100%',
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  )
}


const mapDispatchToProps = (dispatch) => {
  return {
    addKey() {
      dispatch({ type: 'addKeyFn' })
    }
  }
}

export default connect(null, mapDispatchToProps)(Means)











