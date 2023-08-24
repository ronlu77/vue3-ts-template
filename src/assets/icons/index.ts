import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default {
  install: (app: object) => {
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
