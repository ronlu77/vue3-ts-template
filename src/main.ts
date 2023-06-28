import { createApp } from 'vue'
import './style.css'
import App from '@/App.vue'
// 引入Element-puls插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 配置 element-plus 国际化
//@ts-expect-error 忽略当前文件ts类型的检测否则会有红色提示打包报错
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// svg插件需要配置代码
import 'virtual:svg-icons-register'

// 获取应用实例对象
const app = createApp(App)
// 安装Element-plus插件
app.use(ElementPlus, {
  locale: zhCn,
})

app.mount('#app')
