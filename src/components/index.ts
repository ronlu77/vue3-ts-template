import SvgIcon from './SvgIcon/index.vue'
import LPagination from './Pagination/index.vue'
import LTable from './Table/index.tsx'
import LTableList from './TableList/index.tsx'
import CountdownTimerDialog from './CountdownTimerDialog/index.vue'
import ExpandCard from './ExpandCard/index.vue'
import EllipsisText from './EllipsisText/index.vue'
import Tooltip from './Tooltip/index.vue'

const AllGlobalComponent: any = {
  SvgIcon,
  LPagination,
  LTable,
  LTableList,
  CountdownTimerDialog,
  ExpandCard,
  EllipsisText,
  Tooltip,
}

// 暴露全局组件注册插件对象
export default {
  install(app: any) {
    Object.keys(AllGlobalComponent).forEach((key) => {
      app.component(key, AllGlobalComponent[key])
    })
  },
}
