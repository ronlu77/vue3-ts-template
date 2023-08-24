<!-- 声明一个函数式组件：
        函数式组件没有生命周期，只有props、emits
-->
<script>
import { h } from 'vue'

export default {
  props: {
    data: { type: Object, requried: true },
  },
  setup(props, context) {
    const { title, icon } = props.data
    const vnodes = []
    if (icon) {
      icon.includes('el-icon')
        ? vnodes.push(h('i', { class: 'sub-el-icon' }))
        : vnodes.push(h('svg-icon', { name: icon }))
    }
    if (title) {
      vnodes.push(h('span', {}))
    }
    return () => {
      return vnodes
    }
  },
}
</script>
