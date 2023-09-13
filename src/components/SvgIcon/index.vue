<!-- 如果svg中存在fill属性则无法更改颜色, 只能使用单色图表 -->
<template>
  <div class="svg-icon-wrapper">
    <svg
      class="svg-icon"
      :aria-hidden="true"
      :style="{ fontSize: size + 'px', color }"
    >
      <use :href="`#icon-${name}`"></use>
    </svg>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  name: string
  size: number | string
  color?: string
}>()
</script>
<style scoped>
.svg-icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 6px;
}
.svg-icon {
  width: 22px;
  height: 22px;
  /* vertical-align 只对行内元素有效 */
  vertical-align: -0.3em;
  fill: currentColor;
  overflow: hidden;
}
</style>
