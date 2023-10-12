import { defineStore } from 'pinia'
import { SettingState } from './types/type'

const useSettingStore = defineStore('Setting', {
  //todo 每次更改config信息时，需要将localstorage同步更新
  state: (): SettingState => ({
    theme: localStorage.getItem('vueuse-color-scheme') || 'dark',
    language: 'cn',
    tag: true,
  }),
  actions: {
    setTheme(theme: string) {
      //todo 后续设置自定义主题色
      // dark | light
      this.theme = theme
    },
    setTagView(val: boolean) {
      this.tag = val
    },
  },
})

export default useSettingStore
