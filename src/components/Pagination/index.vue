<template>
  <div class="pagination__wrapper">
    <el-pagination
      v-model:current-page="useCurrentPage"
      v-model:page-size="usePageSize"
      v-bind="useAttributes"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, useAttrs, computed } from 'vue'

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
  'paginationChange',
])
// ! 不能直接对prop属性进行 v-model绑定
const useCurrentPage = computed({
  get: () => props.currentPage,
  set: () => ({}),
})
const usePageSize = computed({
  get: () => props.pageSize,
  set: () => ({}),
})

const defaultProps = {
  total: 0,
  size: 10,
  'page-sizes': [10, 30, 50, 100],
  layout: 'jumper, total, ->, prev, pager, next, sizes',
  disabled: false,
  background: true,
  small: true,
}
const useAttributes = Object.assign({}, defaultProps, attrs)

function handleSizeChange(val) {
  emits('paginationChange', { key: 'pageSize', val })
}

function handleCurrentChange(val) {
  emits('paginationChange', { key: 'currentPage', val })
}
</script>

<style lang="scss" scoped>
.pagination__wrapper {
  margin: 10px 0;
}
</style>
