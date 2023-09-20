<script>
import { h } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'Redirect',
  setup(props, context) {
    const route = useRoute()
    const router = useRouter()
    const {
      params: { path },
    } = route

    router.replace('/' + path)
    return () => h('div')
  },
}
</script>
