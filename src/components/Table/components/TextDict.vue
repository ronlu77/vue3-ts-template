<template>
  <div>
    <span v-if="kvpEnum">{{ finalValue }}</span>
    <span v-else>{{ scope.row[key] }}</span>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { find, isUndefined } from 'lodash-es'

interface Props {
  lkey: string
  schema: object | any
  scope: object | any
}

const props = defineProps<Props>()
const key = computed(() => props.lkey).value
const kvpEnum = computed(() => props.schema.properties[key].enum).value
const finalValue = ref('')

if (!isUndefined(kvpEnum)) {
  const kvp = find(kvpEnum, { value: props.scope.row[key] })
  finalValue.value = isUndefined(kvp) ? '' : kvp.label
}
</script>
<style lang="scss" scoped></style>
