<template>
  <div class="translate-container">
    <el-dropdown placement="bottom" trigger="click">
      <SvgIcon class="svg-icon__item" name="translate" :size="22"></SvgIcon>
      <template #dropdown>
        <ul class="translate-list">
          <li class="translate_item active" @click="toTranslateSystem('cn')">
            简体中文
          </li>
          <li class="translate_item" @click="toTranslateSystem('eng')">
            English
          </li>
        </ul>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

function toTranslateSystem(type: string) {
  console.log('国际化', type)
}
</script>

<style lang="scss" scoped>
.translate-container {
  height: 100%;
  padding: 0 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: $hover-color;
  }
}
.translate-list {
  min-width: 160px;
  font-size: 14px;
  color: $text-color;
  cursor: pointer;
  .translate_item {
    padding: 10px;

    &.active {
      background: $hover-color;
      color: #409eff;
    }
  }
}
</style>
