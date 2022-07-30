import Request from './request'


//注册接口
export const RegisterApi = (params) => {
  return Request.post('/register',params)
}

//登录接口
export const LoginApi = (params) => {
  return Request.post('/login',params)
}

//获取文章列表接口
export const ArticleListApi = (params) => Request.get('/article',{params})
