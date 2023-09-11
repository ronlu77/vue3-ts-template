<template>
  <el-pagination
    v-model:current-page="useCurrentPage"
    v-model:page-size="usePageSize"
    v-bind="useAttributes"
  />
</template>
<script setup lang="ts">
import { ref, useAttrs, computed, watch } from 'vue'

defineOptions({
  inheritAttrs: false,
})
const attrs = useAttrs()
const props = defineProps({
  // current-page 单独使用 prop 传递，如果使用透传会警告
  currentPage: { type: Number, default: 1 },
  pageSize: { type: Number, default: 1 },
})
const emits = defineEmits([
  'update:currentPage',
  'update:pageSize',
  'restartData',
])
// ! 不能直接对prop属性进行 v-model绑定
const useCurrentPage = computed({
  get: () => props.currentPage,
  set: (val) => {
    emits('update:currentPage', val)
  },
})
const usePageSize = computed({
  get: () => props.pageSize,
  set: (val) => {
    emits('update:pageSize', val)
  },
})

const defaultProps = {
  total: 0,
  size: 10,
  'page-sizes': [10, 30, 50, 100],
  layout: 'sizes, prev, pager, next, ->, jumper, total',
  disabled: false,
  background: true,
}
const useAttributes = Object.assign({}, defaultProps, attrs)

watch(useCurrentPage, () => {
  emits('restartData')
})

watch(usePageSize, () => {
  emits('restartData')
})
</script>

<style lang="scss" scoped></style>
