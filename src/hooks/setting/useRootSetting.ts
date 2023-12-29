import type { SystemConfig } from '#/config'
import { computed } from 'vue'
import { useAppStore } from '@/store/modules/app'

// Omit<Origin, xx | xx> 去除接口中的某些属性获取一个新的接口
type RootSetting = Omit<
  SystemConfig,
  'locale' | 'headerSetting' | 'menuSetting'
>

export function useRootSetting() {
  const appStore = useAppStore()
  const getShowLogo = computed(() => appStore.getSystemConfig.showLogo)
  const getSidebar = computed(() => appStore.getSystemConfig.showSidebar)
  const getShowFooter = computed(() => appStore.getSystemConfig.showFooter)
  const getShowTagger = computed(() => appStore.getSystemConfig.showTagger)
  const getShowBreadcrumb = computed(
    () => appStore.getSystemConfig.showBreadcrumb,
  )
  return {
    getShowLogo,
    getSidebar,
    getShowFooter,
    getShowTagger,
    getShowBreadcrumb,
  }
}
