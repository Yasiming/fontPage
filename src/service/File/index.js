import request from '@/service/request'

//上传文件至临时表
export const UploadTempSave = (token, user_name, title, file_src) =>
  request({
    method: 'post',
    url: '/user/tempSave',
    data: {
      token,
      user_name,
      title,
      file_src
    }
  })
//用户文件状态
export const UserFileStateApi = (user_id) =>
  request({
    method: 'post',
    url: '/back/api/file/UserFileState',
    data: {
      user_id
    }
  })
//用户删除文件
export const DeleteUserFileApi = (_id) =>
  request({
    method: 'post',
    url: '/back/api/file/deleteUserFile',
    data: {
      _id
    }
  })
//获取全部文件
export const getAllFile = () =>
  request({
    method: 'post',
    url: '/back/api/file/find'
  })
//指定索引
export const getIndexFile = (file_title, startTime, endTime) =>
  request({
    method: 'post',
    url: '/user/find',
    data: {
      file_title,
      startTime,
      endTime
    }
  })
