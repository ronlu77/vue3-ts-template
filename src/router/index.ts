import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoutes } from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  // 滚动行为, 跳转到新路由时，滚动到顶部
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
