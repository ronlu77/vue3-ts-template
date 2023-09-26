import { defineStore } from 'pinia'
import { RouteLocationNormalized } from "vue-router"
import router from '@/router'

interface State {
  tagViewList: []
  cacheTagList: string[]
  activeTagView: any
  MaxLenth: number
  BlockOrder: string[] // 黑名单，不显示在标签栏
}

const findTagViewIndex = (list: any, node: any): number => {
  const _index = -1
  let idx = 0
  if (!list.length) return _index
  while (idx < list.length) {
    if (list[idx].fullPath === node.fullPath) {
      return idx
    }
    idx++
  }
  return _index
}

//todo  目前都没有考虑除首页外的 affix 情况
export const useTagViewsStore = defineStore('tagViews', {
  state: (): State => ({
    tagViewList: [],
    activeTagView: {},
    cacheTagList: [],
    MaxLenth: 20,
    BlockOrder: ['404'],
  }),
  actions: {
    addTagView(tag: RouteLocationNormalized) {
      const tagIndex = this.tagViewList.findIndex(
        (item: RouteLocationNormalized) => item.fullPath === tag.fullPath,
      )
      // 添加缓存 chacheTag
      this.addCacheTag(tag)
      if (tagIndex > -1 || this.BlockOrder.includes(tag.name)) return
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
      const cacheIndex = this.cacheTagList.indexOf(route.name)
      if (cacheIndex !== -1) {
        this.cacheTagList.splice(cacheIndex, 1)
      }
      router.replace('/redirect' + fullPath)
    },
    closeCurrentTagView() {
      if (
        this.tagViewList.length === 1 ||
        (this.activeTagView.meta && this.activeTagView.meta.affix)
      )
        return
      // clear cache
      this.deleteCacheTag(this.activeTagView.name)
      const index = this.getActiveTagViewIndex()
      this.tagViewList.splice(index, 1)
      const { fullPath, params } = this.tagViewList[index - 1]
      router.push({ path: fullPath, params })
    },
    closeLeftTagView() {
      const index = this.getActiveTagViewIndex()
      this.deleteCacheTag(this.tagViewList[index - 1].name)
      this.tagViewList.splice(index - 1, 1)
    },
    closeRightTagView() {
      const index = this.getActiveTagViewIndex()
      this.deleteCacheTag(this.tagViewList[index + 1].name)
      this.tagViewList.splice(index + 1, 1)
    },
    closeAllTagView() {
      const affixList = this.tagViewList.filter(
        (item: RouteLocationNormalized) => item.meta && item.meta.affix,
      )
      this.tagViewList = affixList
      router.push('/')
      this.cacheTagList = ['Dashboard']
    },
    closeOtherTagView() {
      const affixList = this.tagViewList.filter(
        (item: RouteLocationNormalized) =>
          (item.meta && item.meta.affix) ||
          item.fullPath === this.activeTagView.fullPath,
      )
      this.tagViewList = affixList
      this.cacheTagList = affixList
    },
    getActiveTagViewIndex(): number {
      return findTagViewIndex(this.tagViewList, this.activeTagView)
    },
    addCacheTag(route: RouteLocationNormalized) {
      if (this.cacheTagList.includes(route.name)) return
      this.cacheTagList.push(route.name)
    },
    deleteCacheTag(name: string) {
      const cacheIndex = this.cacheTagList.indexOf(name)
      if (cacheIndex !== -1 && !this.BlockOrder.includes(name)) {
        this.cacheTagList.splice(cacheIndex, 1)
      }
    },
  },
})
