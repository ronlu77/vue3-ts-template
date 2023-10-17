import SvgIcon from '@/components/SvgIcon/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import LfTable from '@/components/Table/index.tsx'

const AllGlobalComponent: any = {
  SvgIcon,
  Pagination,
  LfTable,
}

// 暴露全局组件注册插件对象
export default {
  install(app: any) {
    Object.keys(AllGlobalComponent).forEach((key) => {
      app.component(key, AllGlobalComponent[key])
    })
  },
}
