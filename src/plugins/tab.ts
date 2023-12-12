import { createPinia } from 'pinia'
import useTagViewsStore from '@/store/modules/tagViews'

//! 在setup() 外使用useStore需要传入pinia实例
const pinia = createPinia()
const tagViewStore = useTagViewsStore(pinia)

export default {
  refreshPage: (route: any) => {
    // 刷新之前清除缓存标签栏
    console.log(tagViewStore)
    const cacheIndex = tagViewStore.cacheTagList.indexOf(route.name)
    if (cacheIndex !== -1) {
      tagViewStore.cacheTagList.splice(cacheIndex, 1)
    }

    tagViewStore.refreshPage(route)
  },
}
