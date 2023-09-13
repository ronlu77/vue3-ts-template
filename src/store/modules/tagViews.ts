import { defineStore } from 'pinia'

export const useTagViewsStore = defineStore('tagViews', {
  state: () => ({
    tagViewList: [],
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
  },
})
