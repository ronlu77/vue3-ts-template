import { defineStore } from 'pinia'

export const useAppStore = defineStore('App', {
  state: () => ({
    opened: localStorage.getItem('sidebarOpenStatus')
      ? !!localStorage.getItem('sidebarOpenStatus')
      : true,
  }),
  actions: {
    // 设置侧边栏折叠状态
    toggleSidebarStatus() {
      this.opened = !this.opened
      this.opened
        ? localStorage.setItem('sidebarOpenStatus', '1')
        : localStorage.setItem('sidebarOpenStatus', '0')
    },
  },
  getters: {},
})
