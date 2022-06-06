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

// ..存储用户的编辑
export const SaveUserEditor = (user_name, user_id, user_editor, user_title) =>
  request({
    method: 'post',
    url: '/user/editor',
    data: {
      user_name,
      user_id,
      user_editor,
      user_title
    }
  })
// ..获取用户的编辑
export const getUserEditor = (user_id) =>
  request({
    method: 'post',
    url: '/user/findeditor',
    data: {
      user_id
    }
  })
// ..修改用户编辑
export const editorUserEditor = (_id, user_editor, user_title) =>
  request({
    method: 'post',
    url: '/user/editorContent',
    data: {
      _id,
      user_editor,
      user_title
    }
  })

// ..删除指定编辑
export const deleteUserEditor = (_id) =>
  request({
    method: 'post',
    url: '/user/deleteEditor',
    data: {
      _id
    }
  })
