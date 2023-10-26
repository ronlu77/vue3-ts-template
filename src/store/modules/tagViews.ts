import { defineStore } from 'pinia'
import { RouteLocationNormalized } from 'vue-router'
import router from '@/router'
import { cloneDeep } from 'lodash-es'

interface State {
  tagViewList: []
  cacheTagList: string[]
  MaxLenth: number
  BlockOrder: string[] // 黑名单，不显示在标签栏
  refreshing: boolean
}

//todo  目前都没有考虑除首页外的 affix 情况
const useTagViewsStore = defineStore('tagViews', {
  state: (): State => ({
    tagViewList: [],
    cacheTagList: [],
    MaxLenth: 20,
    BlockOrder: ['404', 'login'],
    refreshing: false,
  }),
  actions: {
    addTagView(tag: RouteLocationNormalized) {
      const tagIndex = this.tagViewList.findIndex(
        (item: RouteLocationNormalized) => item.fullPath === tag.fullPath,
      )
      if (this.BlockOrder.includes(tag.name)) return
      if (tagIndex > -1) return
      this.addCacheTag(tag)
      this.tagViewList.push(tag)
    },
    deleteTagView(tag: RouteLocationNormalized) {
      const tagIndex = this.tagViewList.findIndex(
        (item: RouteLocationNormalized) => item.fullPath === tag.fullPath,
      )
      if (tagIndex === -1) return
      this.deleteCacheTag(this.tagViewList[tagIndex].name)
      this.tagViewList.splice(tagIndex, 1)
    },
    refreshPage(route: RouteLocationNormalized) {
      const { fullPath } = route
      // 需要从缓存名单中清除，否则也没数据没有清空
      const cacheIndex = this.cacheTagList.indexOf(route.name)
      if (cacheIndex !== -1) {
        this.cacheTagList.splice(cacheIndex, 1)
      }
      router.replace('/redirect' + fullPath)
    },
    closeCurrentTagView(route) {
      const index = this.getActiveTagViewIndex(route)
      this.deleteCacheTag(route.name)
      this.tagViewList.splice(index, 1)
      // 删除当前active 路由后跳转下一个active 路由
      const nextRoute =
        index === 0 ? this.tagViewList[index + 1] : this.tagViewList[index - 1]
      const { fullPath, params } = nextRoute
      router.push({ path: fullPath, params })
    },
    closeLeftTagView(route) {
      const index = this.getActiveTagViewIndex(route)
      this.deleteCacheTag(this.tagViewList[index - 1].name)
      this.tagViewList.splice(index - 1, 1)
    },
    closeRightTagView(route) {
      const index = this.getActiveTagViewIndex(route)
      this.deleteCacheTag(this.tagViewList[index + 1].name)
      this.tagViewList.splice(index + 1, 1)
    },
    closeAllTagView() {
      const affixList = this.gainAffixTagView()
      this.tagViewList = affixList
      this.cacheTagList = this.tagViewList.map((item) => item.name)
      router.push('/') //* 暂定
    },
    closeOtherTagView(route) {
      const affixList = cloneDeep(this.gainAffixTagView())
      const index = affixList.findIndex((item) => item.path === route.path)
      index === -1 && affixList.push(Object.assign({}, route))
      this.tagViewList = affixList
      this.cacheTagList = affixList.map((item) => item.name)
    },
    getActiveTagViewIndex(route: any): number {
      return this.tagViewList.findIndex((item) => item.path === route.path)
    },
    addCacheTag(route: RouteLocationNormalized) {
      if (this.cacheTagList.includes(route.name)) return
      this.cacheTagList.push(route.name)
    },
    deleteCacheTag(name: string) {
      const cacheIndex = this.cacheTagList.indexOf(name)
      if (cacheIndex !== -1) {
        this.cacheTagList.splice(cacheIndex, 1)
      }
    },
    /** 获取 affix 路由 */
    gainAffixTagView() {
      return this.tagViewList.filter((item) => item.meta && item.meta.affix)
    },
  },
})

export default useTagViewsStore
