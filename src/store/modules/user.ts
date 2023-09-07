import { defineStore } from 'pinia'
import { login, logout, getInfo } from '@/api//user/index.ts'
import { LoginFormData, LoginResponseData } from '@/api/user/type'
import { UserStore } from './types/type'
import { constantRoutes } from '@/router/routes.ts'
import { REMOVE_TOKEN, SET_TOKEN } from '@/utils/auth'

const useUserStore = defineStore('User', {
  state: (): UserStore => ({
    username: '',
    avatar: '',
    token: localStorage.getItem('USER_TOKEN') as string | '',
    menuRoutes: [],
  }),
  getters: {},
  actions: {
    async userLogin(data: LoginFormData) {
      const result: LoginResponseData = await login(data)
      if (result.code === 200) {
        const { token } = result.data
        this.token = token as string
        SET_TOKEN(this.token)
        this.setRoutes()
        return ''
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    getUserInfo(token: string) {
      return new Promise((resolve, reject) => {
        getInfo(token)
          .then((response: LoginResponseData) => {
            const { username, avatar } = response.data
            this.username = username
            this.avatar = avatar
            resolve(response.data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    setRoutes() {
      this.menuRoutes = constantRoutes
    },
    async userLogout() {
      const res: LoginResponseData = await logout()
      if (res.code === 200) {
        this.username = ''
        this.avatar = ''
        this.token = ''
        REMOVE_TOKEN()
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
  },
})

export default useUserStore
