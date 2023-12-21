import { computed } from 'vue'
import { useAppStore } from '@/store/modules/app'

export function useHeaderSetting() {
  const appStore = useAppStore()
  const getShowHeader = computed(() => appStore.getHeaderConfig.show)
  return {
    getShowHeader,
  }
}
