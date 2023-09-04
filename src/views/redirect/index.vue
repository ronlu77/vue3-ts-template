<script>
import { h } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'RedirectPage',
  setup(props, context) {
    const route = useRoute()
    const router = useRouter()
    const {
      params: { path },
      query,
    } = route
    router.replace({ path: '/' + path, query })
    return () => h('div')
  },
}
</script>
