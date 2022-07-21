import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'
import { isCheckTimeout } from './auth'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
//请求拦截器
service.interceptors.request.use(
  (config) => {
    //统一注入token
    if (store.getters.token) {
      if (isCheckTimeout()) {
        //退出
        console.log(123)
        store.dispatch('user/logout')
        return Promise.reject(new Error('身份已过期,请重新登录'))
      }
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    // 配置接口国际化
    config.headers['Accept-Language'] = store.getters.language
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

//响应拦截器 处理data
service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data
    if (success) {
      return data
    } else {
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  //请求失败
  (error) => {
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      // token超时
      store.dispatch('user/logout')
    }
    //处理 token 超时问题
    ElMessage.error(error.message) // 提示错误信息
    return Promise.reject(error)
  }
)
export default service
