import { defineStore } from 'pinia'
import router from '@/router'

const findTagViewIndex = (list, node): number => {
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
  state: () => ({
    tagViewList: [],
    activeTagView: {},
  }),
  actions: {
    addTagView(tagView: any) {
      const tagViewIndex = this.tagViewList.findIndex(
        (item: any) => item.fullPath === tagView.fullPath,
      )
      if (tagViewIndex > -1) return
      this.tagViewList.push(tagView)
    },
    deleteTagView(tagView: any) {
      const tagViewIndex = this.tagViewList.findIndex(
        (item: any) => item.fullPath === tagView.fullPath,
      )
      tagViewIndex > -1 && this.tagViewList.splice(tagViewIndex, 1)
    },
    refreshPage(route: any) {
      const { fullPath } = route
      router.replace('/redirect' + fullPath)
    },
    closeCurrentTagView() {
      if (
        this.tagViewList.length === 1 ||
        (this.activeTagView.meta && this.activeTagView.meta.affix)
      )
        return
      const index = this.getActiveTagViewIndex()
      this.tagViewList.splice(index, 1)
      const { fullPath, params } = this.tagViewList[index - 1]
      router.push({ path: fullPath, params })
    },
    closeLeftTagView() {
      const index = this.getActiveTagViewIndex()
      this.tagViewList.splice(index - 1, 1)
    },
    closeRightTagView() {
      const index = this.getActiveTagViewIndex()
      this.tagViewList.splice(index + 1, 1)
    },
    closeAllTagView() {
      const affixList = this.tagViewList.filter(
        (item) => item.meta && item.meta.affix,
      )
      this.tagViewList = affixList
      router.push('/')
    },
    closeOtherTagView() {
      const affixList = this.tagViewList.filter(
        (item) =>
          (item.meta && item.meta.affix) ||
          item.fullPath === this.activeTagView.fullPath,
      )
      this.tagViewList = affixList
    },
    getActiveTagViewIndex(): number {
      return findTagViewIndex(this.tagViewList, this.activeTagView)
    },
  },
})
