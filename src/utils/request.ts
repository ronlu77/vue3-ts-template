// axios 进行二次封装
import axios from 'axios'
import { ElMessage } from 'element-plus'

//#region step1 通过create方法创建axios实例对象，可以进行一些基础配置
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})
//#endregion

//#region step2 设置请求拦截器和响应拦截器
request.interceptors.request.use((config) => {
  //  config.headers 配置请求头，经常给服务器携带公共参数
  // 返回配置对象
  return config
})

request.interceptors.response.use(
  // 成功回调, 主要用来简化回调数据
  (response) => {
    return response.data
  },
  // 失败回调 处理http网络错误
  (error) => {
    let message = ''
    const status = error.response.status
    switch (status) {
      case 401:
        message = '未登录'
        break
      // 403 token过期
      // 登录过期对用户进行提示
      // 清除本地token和清空vuex中token对象
      // 跳转登录页面
      case 403:
        message = '登录过期，请重新登录'
        break
      case 404:
        message = '网络请求不存在'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = error.response.data.message
        break
    }
    ElMessage({
      type: 'error',
      message,
    })
    return Promise.reject(error)
  },
)
//#endregion

//#region step3 对外暴露
export default request
//#endregion
