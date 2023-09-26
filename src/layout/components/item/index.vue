<script>
import { h, resolveComponent } from 'vue'

export default {
  name: 'Item',
  props: {
    data: { type: Object, requried: true },
  },
  setup(props, ctx) {
    // 使用 h函数对全局注册组件进行渲染，需要使用resolveComponent对全局组件进行解析
    const SvgIcon = resolveComponent('SvgIcon')
    const { title, icon } = props.data
    const vnodes = []
    if (icon) {
      icon.includes('el-icon')
        ? vnodes.push(h('i', { class: 'el-icon__item' }))
        : vnodes.push(
            h(SvgIcon, { class: 'svg-icon__item', name: icon, size: 14 }),
          )
    }
    if (title) {
      vnodes.push(h('span', { slot: 'title' }, title))
    }
    console.log('vnodes', vnodes)
    // return () => h('template', { class: 'menu_item' }, vnodes)
    return () => vnodes
  },
}
</script>

<style>
.menu_item {
  display: flex;
  align-items: center;
}
</style>
