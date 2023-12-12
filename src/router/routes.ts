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
          icon: 'file',
        },
      },
      {
        path: 'center',
        name: 'Center',
        hidden: true,
        component: () => import('@/views/center/index.vue'),
        meta: {
          title: '个人中心',
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
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    hidden: true,
    meta: {
      title: '404',
      hidden: true,
    },
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:matchPath(.*)',
        component: () => import('@/views/redirect/index.vue'),
      },
    ],
  },
  {
    path: '/functionality',
    component: Layout,
    meta: { title: '功能', icon: 'file' },
    children: [
      {
        path: 'draggableDialog',
        name: 'DraggableDialog',
        component: () =>
          import('@/views/functionality/draggableDialog/index.vue'),
        meta: { title: '可拖拽弹窗', icon: '' },
      },
      {
        path: 'copy',
        name: 'Copy',
        component: () => import('@/views/functionality/copy/index.vue'),
        meta: { title: '剪切板', icon: '' },
      },
      {
        path: 'ellipsis',
        name: 'Ellipsis',
        component: () => import('@/views/functionality/ellipsis/index.vue'),
        meta: { title: '文本省略', icon: '' },
      },
      {
        path: 'watermark',
        name: 'Watermark',
        component: () => import('@/views/functionality/watermark/index.vue'),
        meta: { title: '水印设置', icon: '' },
      },
      {
        path: 'sessiontimeout',
        name: 'Sessiontimeout',
        component: () =>
          import('@/views/functionality/sessiontimeout/index.vue'),
        meta: { title: '用户过期', icon: '' },
      },
      {
        path: 'monitorDevice',
        name: 'MonitorDeviceInfomation',
        component: () =>
          import('@/views/functionality/monitorDeviceInfomation/index.vue'),
        meta: { title: '设备监控', icon: '' },
      },
      {
        path: 'imagePreview',
        name: 'ImagePreview',
        component: () =>
          import('@/views/functionality/image-preview/index.vue'),
        meta: { title: '图片预览', icon: '' },
      },
      {
        path: 'fullscreen',
        name: 'FullScreen',
        component: () => import('@/views/functionality/fullscreen/index.vue'),
        meta: { title: '全屏操作', icon: '' },
      },
    ],
  },
  {
    path: '/rights',
    component: Layout,
    name: 'Role',
    redirect: '/rights/user',
    meta: { title: '权限管理', icon: 'setting' },
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
      {
        path: 'resource',
        component: () => import('@/views/rights/resource/index.vue'),
        name: 'Resource',
        meta: { title: '资源管理', icon: '' },
      },
    ],
  },
  {
    path: '/external-link',
    component: Layout,
    children: [
      {
        path: 'https://juejin.cn',
        meta: { title: '掘金', icon: 'link' },
      },
    ],
  },
  // 404 路由要放在最后
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]
