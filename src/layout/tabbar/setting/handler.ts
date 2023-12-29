import { HandlerEnum } from './enum'
import { useAppStore } from '@/store/modules/app'
import { SystemConfig } from '#/config'

export function baseHandler(event: HandlerEnum, value: any) {
  const appStore = useAppStore()
  const config = handler(event, value)
  appStore.setSystemConfig(config)
}

export function handler(event: HandlerEnum, value: any): SystemConfig {
  const appStore = useAppStore()
  switch (event) {
    case HandlerEnum.HEADER_SHOW:
      return { headerSetting: { show: value } }
    case HandlerEnum.HEADER_FULLSCREEN:
      return { headerSetting: { showFullScreen: value } }
    case HandlerEnum.HEADER_SEARCH:
      return { headerSetting: { showSearch: value } }
    case HandlerEnum.HEADER_NOTIC:
      return { headerSetting: { showNotice: value } }
    case HandlerEnum.BREADCRUMB_SHOW:
      return { showBreadcrumb: value }
    case HandlerEnum.LOGO_SHOW:
      return { showLogo: value }
    case HandlerEnum.FOOTER_SHOW:
      return { showFooter: value }
    case HandlerEnum.TAGGER_SHOW:
      return { showTagger: value }
    case HandlerEnum.MENU_SHOW:
      return { menuSetting: { show: value } }
    case HandlerEnum.MENU_COLLAPSE:
      return { menuSetting: { collapsed: value } }
  }
}
