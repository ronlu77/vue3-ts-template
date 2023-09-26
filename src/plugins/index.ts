import tab from './tab.ts'

export default function installGloablPlugins(app: any) {
  app.config.globalProperties.$tab = tab
}
