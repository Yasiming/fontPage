import request from '../request/index'
export const HomeIMG_APi = (classification) =>
  request({
    method: 'get',
    url: '/back/api/file/findfilelist',
    params: {
      classification
    }
  })
