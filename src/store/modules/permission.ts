/** */
import { defineStore } from 'pinia'
import { constantRoutes } from '@/router/routes'

export const usePermissionStore = defineStore({
  id: 'app-permission',
  state: () => ({
    // 权限代码列表
    permCodeList: [],
    // Whether the route has been dynamically added
    // 路由是否动态添加
    isDynamicAddedRoute: false,
    // To trigger a menu update
    // 触发菜单更新
    lastBuildMenuTime: 0,
    // Backstage menu list
    // 后台菜单列表
    backMenuList: [],
    // menu List
    // 菜单列表
    frontMenuList: [],
  }),
  getters: {},
  actions: {
    // set sidebar menu by dynamic routes
    setFontMenuList() {
      this.frontMenuList = constantRoutes
    },
  },
})
