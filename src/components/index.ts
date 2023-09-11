import SvgIcon from '@/components/SvgIcon/index.vue'
import Pagination from '@/components/Pagination/index.vue'

const AllGlobalComponent = {
  SvgIcon,
  Pagination,
}

// 暴露全局组件注册插件对象
export default {
  install(app: object) {
    Object.keys(AllGlobalComponent).forEach((key) => {
      app.component(key, AllGlobalComponent[key])
    })
  },
}
