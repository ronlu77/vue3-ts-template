<template>
  <div class="text-tag">
    <p v-if="kvpEnum" class="text-tag-content">
      <el-badge class="badge" :type="badgeType" is-dot></el-badge>
      <span>{{ contentStr }}</span>
    </p>
    <span v-else>{{ scope.row[key] }}</span>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { isUndefined, find } from 'lodash-es'

interface Props {
  lkey: string
  schema: object
  scope: object
}

const props = defineProps<Props>()
const key = computed(() => props.lkey).value
const kvpEnum = computed(() => props.schema.properties[key].enum).value
const contentStr = ref('')
const badgeType = ref('')

if (!isUndefined(kvpEnum)) {
  const kvp = find(kvpEnum, { value: props.scope.row[key] })
  if (!isUndefined(kvp)) {
    contentStr.value = kvp.label
    badgeType.value = kvp.type
  }
}
</script>
<style lang="scss" scoped>
.text-tag-content {
  .badge {
    margin-right: 4px;
  }

  :deep(.el-badge__content.is-dot) {
    top: -2px;
    height: 10px;
    width: 10px;
  }
}
</style>
