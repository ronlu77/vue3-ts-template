<template>
  <div class="sidebartrigger__wrapper">
    <el-icon>
      <component :is="iconComponent" @click="toggleCollpase"></component>
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  isCollpase: { type: Boolean, default: false },
})
const emit = defineEmits(['toggleCollpase'])
const iconComponent = computed(() => (props.isCollpase ? 'Expand' : 'Fold'))

function toggleCollpase() {
  emit('toggleCollpase')
}
</script>

<style lang="scss" scoped>
.sidebartrigger__wrapper {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 6px;
  cursor: pointer;

  &:hover {
    background: $hover-color;
  }
}
</style>
