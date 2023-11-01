<script>
import { h, defineComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'Redirect',
  props: [],
  setup() {
    const route = useRoute()
    const router = useRouter()
    const {
      params: { matchPath },
    } = route
    // console.log('redirect page', matchPath)
    router.replace('/' + matchPath)
    return () => h('div')
  },
})
</script>
