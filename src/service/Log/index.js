import request from '@/service/request'

// ..获取验证码
export const VCodeApi = (user_email) =>
  request({
    method: 'post',
    url: '/user/email',
    data: {
      user_email: user_email
    }
  })

// ..用户注册
export const UserRegApi = (user_name, user_pwd, user_email) =>
  request({
    method: 'post',
    url: '/user/reg',
    data: {
      user_name,
      user_pwd,
      user_email
    }
  })

// ..用户登录
export const UserLoginApi = (user_name, user_pwd) =>
  request({
    method: 'post',
    url: '/user/login',
    data: {
      user_name,
      user_pwd
    }
  })

// ..检测用户登录状态
export const checkTokenApi = (data) =>
  request({
    method: 'get',
    url: '/user/checkToken'
  })

// ..查看用户信息
export const findUserInfoApi = (token) =>
  request({
    method: 'get',
    url: '/user/findUserInfo',
    params: {
      token
    }
  })

// ..修改密码
export const EditPasswordApi = (user_name, old_pwd, new_pwd) =>
  request({
    method: 'post',
    url: '/user/editPassword',
    data: {
      user_name,
      old_pwd,
      new_pwd
    }
  })

// ..安全退出
export const SafeExitApi = () =>
  request({
    method: 'get',
    url: '/user/logout'
  })
