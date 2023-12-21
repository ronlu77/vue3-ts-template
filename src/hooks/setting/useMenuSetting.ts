import { useAppStore } from '@/store/modules/app'
import { computed } from 'vue'

export function useMenuSetting() {
  const appStore = useAppStore()

  const getShowSidebar = computed(() => appStore.getMenuConfig.show)

  return {
    getShowSidebar,
  }
}
