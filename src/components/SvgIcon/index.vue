<!-- 如果svg中存在fill属性则无法更改颜色, 只能使用单色图表 -->
<template>
  <div class="svg-icon-wrapper">
    <svg
      class="svg-icon"
      :aria-hidden="true"
      :style="{ fontSize: size + 'px', color }"
    >
      <!-- xline:href 属性在SVG2 中已经废弃，可以同时使用来兼容低版本 -->
      <use :href="`#icon-${name}`" :xline:href="`#icon-${name}`"></use>
    </svg>
  </div>
</template>
<script setup lang="ts" name="SvgIcon">
import variables from '@/styles/variable.module.scss'

interface Props {
  name: string
  size: number | string
  color?: string
}

// 使用 withDefaults 编译宏来设置defineProps默认值
withDefaults(defineProps<Props>(), {
  color: variables.textColor,
})
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
