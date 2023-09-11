// 路由鉴权
import router from './router'
import pinia from './store'
import useUserStore from './store/modules/user'
import { usePermissionStore } from './store/modules/permission'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import settting from './settting'

// 路由白名单
const whiteList = ['/login']
const userStore = useUserStore(pinia)
const permissionStore = usePermissionStore(pinia)

router.beforeEach(async (to, from, next) => {
  nprogress.start()
  document.title = `${settting.title}-${to.meta.title}`
  const token = userStore.token
  // 存在token的情况, 获取如果跳转 login 不允许通行，跳转其他页面先拉取用户信息，存在则跳转，不存在则重新拉取，再跳转要去的页面
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
      nprogress.done()
    } else {
      if (userStore.username) {
        next()
      } else {
        // 用户信息不存在的情况下，拉取用户信息, 跳转到首页
        try {
          await userStore.getUserInfo(token)
          // todo 根据用户权限动态加载路由（目前直接加载常量路由）
          permissionStore.setFontMenuList()
          next({ path: '/' })
        } catch (err) {
          //  一般在此处处理 token 过期的情况
          userStore.userLogout()
          next(`login?redirect=${to.fullPath}`)
          nprogress.done()
        }
      }
    }
  } else {
    // 不存在token的情况，访问白名单 next(), 访问其他页面跳转 login
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`login?redirect=${to.fullPath}`)
    }
  }
})

router.afterEach((to, from, next) => {
  nprogress.done()
})
