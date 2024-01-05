import { useAppStore } from '@/store/modules/app'
import { unref, computed } from 'vue'
import { MenuSetting } from '#/config'

export function useMenuSetting() {
  const appStore = useAppStore()
  const getMenuCollapsed = computed(
    () => appStore.getMenuConfig.collapsed || false,
  )
  const getShowSidebar = computed(() => appStore.getMenuConfig.show)

  function setMenuSetting(menuSetting: MenuSetting): any {
    appStore.setMenuSetting(menuSetting)
  }

  function toggleMenu(): void {
    setMenuSetting({
      collapsed: !unref(getMenuCollapsed),
    })
  }

  return {
    getShowSidebar,
    getMenuCollapsed,
    toggleMenu,
  }
}
