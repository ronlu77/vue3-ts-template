import { defineStore } from 'pinia'
import { deepMerge } from '@/utils'
import { ThemeEnum } from '@/enums/appenums'
import { SystemConfig } from '#/config'
interface AppState {
  visible: boolean
  darkMode?: ThemeEnum
  systemConfig: SystemConfig | null
}

export const useAppStore = defineStore('App', {
  state: (): AppState => ({
    visible: false, // 控制系统配置抽屉的显示隐藏
    darkMode: undefined,
    systemConfig: JSON.parse(localStorage.getItem('SYSTEM_CONFIG')) || {
      headerSetting: { show: true },
      showLogo: true,
      showTagger: true,
      showBreadcrumb: true,
      menuSetting: { show: true },
    },
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
    setMenuSetting(config: SystemConfig): void {
      this.systemConfig!.menuSetting = deepMerge(
        this.systemConfig!.menuSetting,
        config,
      ) as SystemConfig
      localStorage.setItem('SYSTEM_CONFIG', JSON.stringify(this.systemConfig))
    },
    setHeaderSetting(config: SystemConfig): void {
      this.systemConfig!.headerSetting = deepMerge(
        this.systemConfig!.headerSetting,
        config,
      ) as SystemConfig
      localStorage.setItem('SYSTEM_CONFIG', JSON.stringify(this.systemConfig))
    },
    setSystemDark(mode: 'dark' | 'light' | string = 'light'): void {
      this.darkMode = mode
      localStorage.setItem('_APP_DARK_MODE_', mode)
    },
    toggleSystemSetting(): void {
      this.visible = !this.visible
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
