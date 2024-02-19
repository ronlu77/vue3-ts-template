import { unref, computed } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { HeaderSetting } from '#/config'

export function useHeaderSetting() {
  const appStore = useAppStore()
  const getShowHeader = computed(() => appStore.getHeaderConfig.show)
  const getShowSearch = computed(
    () => appStore.getHeaderConfig.showSearch || false,
  )
  const getSearching = computed(
    () => appStore.getHeaderConfig.searching || false,
  )
  const setSearchShow = (config: HeaderSetting): void => {
    appStore.setHeaderSetting(config)
  }

  function toggleSearchScreen() {
    setSearchShow({ searching: !unref(getSearching) })
  }

  return {
    getShowHeader,
    getShowSearch,
    getSearching,
    toggleSearchScreen,
  }
}
