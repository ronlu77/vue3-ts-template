<template>
  <div class="translate-container">
    <el-dropdown placement="bottom" trigger="click">
      <SvgIcon class="svg-icon__item" name="translate" :size="22"></SvgIcon>
      <template #dropdown>
        <ul class="translate-list">
          <li
            class="translate_item active"
            @click="toTranslateSystem('cn', $event)"
          >
            简体中文
          </li>
          <li class="translate_item" @click="toTranslateSystem('eng', $event)">
            English
          </li>
        </ul>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 处理国际化
function toTranslateSystem(type: string, event: any) {
  const translateList = document.getElementsByClassName('translate_item')
  Array.from(translateList).forEach((item) => item.classList.remove('active'))
  event.target.classList.add('active')
}
</script>

<style lang="scss" scoped>
.translate-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: $hover-color;
  }

  .el-dropdown {
    height: 100%;
  }
}
.translate-list {
  min-width: 160px;
  font-size: 14px;
  padding: 6px;
  color: $text-color;
  cursor: pointer;
  .translate_item {
    padding: 8px;

    &:hover {
      opacity: 1;
      background: $hover-color;
    }

    &.active {
      color: #409eff;
      background: #e6f4ff;
    }
  }
}
</style>
