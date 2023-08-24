import { defineStore } from 'pinia'
import { login } from '@/api//user/index.ts'
import { LoginFormData, LoginResponseData, UserState } from '@/api/user/type'
import { constantRoutes } from '@/router/routes.ts'

const useUserStore = defineStore('User', {
  state: (): UserState => ({
    userinfo: {},
    token: localStorage.getItem('USER_TOKEN') as string | '',
    menuRoutes: [],
  }),
  getters: {},
  actions: {
    async userLogin(data: LoginFormData) {
      const result: LoginResponseData = await login(data)
      if (result.code === 200) {
        this.token = result.data.token as string
        localStorage.setItem('USER_TOKEN', this.token as string)
        this.setRoutes()
        return ''
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
    setRoutes() {
      this.menuRoutes = constantRoutes
    },
  },
})

export default useUserStore
