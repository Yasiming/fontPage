import axios from 'axios'
import { CHECKTOKEN, removeCache } from '@/config/store2'
export default function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: process.env.VUE_APP_URL,
    timeout: 8000
  })
  // 2.axios的拦截器
  instance.interceptors.request.use(
    (config) => {
      //为请求信息加上时间戳
      if (config.method === 'post') {
        config.data = {
          ...config.data,
          _t: Date.parse(new Date()) / 1000
        }
      } else if (config.method === 'get') {
        config.params = {
          _t: Date.parse(new Date()) / 1000,
          ...config.params
        }
      }
      return config
    },
    (err) => {}
  )

  // 2.2.响应拦截
  instance.interceptors.response.use(
    (res) => {
      //登录过期
      if (res.data.status === 2) {
        removeCache(CHECKTOKEN)
      }
      return res.data
    },
    (err) => {
      console.log(err)
    }
  )

  return instance(config)
}
