import store from 'store2'

// ..本地存储
export const setCache = (key, value) => store.set(key, value)
// ..删除本地存储
export const removeCache = (key) => store.remove(key)
// ..获取存储信息
export const getCache = (key) => store.get(key) || 0

//..公共常量
export const CHECKTOKEN = 'TOKEN'
