import SvgIcon from '@/components/SvgIcon/index.vue'
import LPagination from '@/components/Pagination/index.vue'
import LTable from '@/components/Table/index.tsx'
import LTableList from '@/components/TableList/index.tsx'

const AllGlobalComponent: any = {
  SvgIcon,
  LPagination,
  LTable,
  LTableList,
}

// 暴露全局组件注册插件对象
export default {
  install(app: any) {
    Object.keys(AllGlobalComponent).forEach((key) => {
      app.component(key, AllGlobalComponent[key])
    })
  },
}
