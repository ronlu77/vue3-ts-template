import { defineStore } from 'pinia'
import { SettingState } from './types/type'

const useSettingStore = defineStore('Setting', {
  state: (): SettingState => ({
    theme: localStorage.getItem('vueuse-color-scheme') || 'dark',
    language: 'cn',
  }),
  actions: {
    setTheme(theme: string) {
      //todo 后续设置自定义主题色
      // dark | light
      this.theme = theme
    },
  },
})

export default useSettingStore
