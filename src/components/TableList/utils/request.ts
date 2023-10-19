import axios from 'axios'
import useUserStore from '@/store/modules/user'
import { isUndefined } from 'lodash-es'

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000,
})

request.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    !isUndefined(userStore.token) && (config.headers.token = userStore.token)
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.log('error')
    return Promise.reject(error)
  },
)

export default request
