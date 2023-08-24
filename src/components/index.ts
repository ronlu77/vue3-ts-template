import SvgIcon from '@/components/SvgIcon/index.vue'

const allGlobalComponent = {
  SvgIcon,
}

// 暴露全局组件注册插件对象
export default {
  install(app: object) {
    Object.keys(allGlobalComponent).forEach((key) => {
      app.component(key, allGlobalComponent[key])
    })
  },
}
