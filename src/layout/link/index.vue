<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { isExtrernalLink } from '@/utils/validate.ts'

const props = defineProps({
  to: { type: String, required: true },
})
const isExtrernal = computed(() => isExtrernalLink(props.to)).value
const type = computed(() => {
  if (isExtrernal) {
    return 'a'
  } else {
    return 'router-link'
  }
})

function linkProps(to: string) {
  if (isExtrernal) {
    return {
      href: to,
      target: '_blank',
      rel: 'noopener',
    }
  } else {
    return {
      to: to,
    }
  }
}
</script>
