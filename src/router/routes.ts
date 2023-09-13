// 对外暴露常量路由
import Layout from '@/layout/index.vue'
/**
 * 元数据
 * meta: {
 *  hidden: 控制侧边栏菜单显隐，默认false;
 *  title: 设置路由标题;
 *  affix: 是否可以固定到页面标签栏，默认为false， 如果为true，则不可在页面标签栏删除；
 * }
 */
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    hidden: false,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '首页',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'Login',
    hidden: true,
    meta: { title: '登录' },
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue'),
      },
    ],
  },
  {
    path: '/rights',
    component: Layout,
    name: 'Role',
    redirect: '/rights/user',
    meta: { title: '权限管理', icon: '' },
    children: [
      {
        path: 'user',
        component: () => import('@/views/rights/user/index.vue'),
        name: 'User',
        meta: { title: '用户管理', icon: '' },
      },
      {
        path: 'role',
        component: () => import('@/views/rights/role/index.vue'),
        name: 'Role',
        meta: { title: '角色管理', icon: '' },
      },
    ],
  },
  {
    path: '/external-link',
    component: Layout,
    children: [
      {
        path: 'https://juejin.cn',
        meta: { title: '掘金', icon: '' },
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    hidden: true,
    meta: {
      title: '404',
      hidden: true,
    },
  },

  // 404 路由要放在最后
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]
