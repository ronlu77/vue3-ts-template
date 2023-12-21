import { defineStore } from 'pinia'
import { SystemConfig } from '#/config'
import { deepMerge } from '@/utils'
import { ThemeEnum } from '@/enums/appenums'

interface AppState {
  opened: boolean
  darkMode?: ThemeEnum
  systemConfig: SystemConfig | null
}

export const useAppStore = defineStore('App', {
  state: (): AppState => ({
    opened: localStorage.getItem('sidebarOpenStatus')
      ? !!localStorage.getItem('sidebarOpenStatus')
      : true,

    darkMode: undefined,
    systemConfig: JSON.parse(localStorage.getItem('SYSTEM_CONFIG')) || {},
  }),
  actions: {
    /** 设置系统配置 */
    setSystemConfig(config: SystemConfig): void {
      // todo 目前是通过localStorage进行本地持久化存储，后续需要更改
      this.systemConfig = deepMerge(
        this.systemConfig || {},
        config,
      ) as SystemConfig
      localStorage.setItem('SYSTEM_CONFIG', JSON.stringify(this.systemConfig))
    },
    setSystemDark(mode: 'dark' | 'light' | string = 'light'): void {
      this.darkMode = mode
      localStorage.setItem('_APP_DARK_MODE_', mode)
    },
    //? 设置侧边栏折叠状态，展开折叠状态太重新处理
    toggleSidebarStatus() {
      this.opened = !this.opened
      this.opened
        ? localStorage.setItem('sidebarOpenStatus', '1')
        : localStorage.setItem('sidebarOpenStatus', '0')
    },
  },
  getters: {
    getSystemDark(state) {
      return state.darkMode || localStorage.getItem('_APP_DARK_MODE_')
    },
    getMenuConfig(state): SystemConfig {
      return state.systemConfig.menuSetting || ({} as SystemConfig)
    },
    getHeaderConfig(state): SystemConfig {
      return state.systemConfig.headerSetting || ({} as SystemConfig)
    },
    getSystemConfig(state): SystemConfig {
      return state.systemConfig || ({} as SystemConfig)
    },
  },
})
