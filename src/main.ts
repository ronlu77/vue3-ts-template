import { createApp } from 'vue'
// 引入模板全局样式
import '@/styles/index.scss'
import App from '@/App.vue'
// 引入Element-puls插件与样式
import ElementPlus from 'element-plus'
// 引入 Element
import 'element-plus/dist/index.css'
// 配置 element-plus 国际化
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 引入全局注册 el-icon 组件插件
import elementIcon from '@/assets/icons/index.ts'
//* element-plus@2.2.0 黑暗主题颜色
import 'element-plus/theme-chalk/dark/css-vars.css'
// 全局 message messageBox 配置
import './utils/elMessageConfig.ts'

// svg插件需要配置代码
import 'virtual:svg-icons-register'
// 引入路由
import router from './router'
// 引入 pinia
import pinia from './store'
// 引入全局组件注册插件
import componentsinit from './components'
// 引入全局自定义注册方法
import setupGlobalDirectives from './directive/index.ts'
// 引入全局自定义插件
import installGloablPlugins from './plugins/index.ts'
// 引入路由鉴权文件
import './permission.ts'
// import mitt from 'mitt'
import './utils/tab.ts'

// 获取应用实例对象
const app = createApp(App)

setupGlobalDirectives(app)
// 设置全局事件总线 $tab
installGloablPlugins(app)
// app.config.globalProperties.$tab = mitt()
// 安装Element-plus插件
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(router)
app.use(componentsinit)
app.use(elementIcon)
app.use(pinia)

app.mount('#app')
