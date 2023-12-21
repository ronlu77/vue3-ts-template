<template>
  <div class="setting-container">
    <SvgIcon
      class="svg-icon__item"
      name="search"
      :size="22"
      @click="handleSearch"
    ></SvgIcon>
    <UnreadMessgae />
    <SvgIcon
      class="svg-icon__item"
      :name="isFullScreen ? 'fullscreen-exit' : 'fullscreen'"
      :size="22"
      @click="handleScreenfull"
    ></SvgIcon>
    <Translate />
    <UserCenter />
    <SvgIcon
      class="svg-icon__item"
      name="setting"
      :size="22"
      @click="toSetting"
    ></SvgIcon>
  </div>

  <!-- 系统配置 -->
  <SettingDrawer v-model:visible="visibleSetting" />
</template>

<script setup lang="ts">
import SettingDrawer from './SettingDrawer.vue'
import Translate from './Translate.vue'
import UserCenter from './UserCenter.vue'
import UnreadMessgae from './UnreadMessage.vue'
import { ref, nextTick } from 'vue'

const visibleSetting = ref(false)
const isFullScreen = ref(false)

function handleSearch() {
  console.log('搜索功能')
}

function handleScreenfull() {
  // fullscreenElement 判断是否为全屏， 全屏返回 true 否则 null
  let full = document.fullscreenElement
  isFullScreen.value = !full
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

function toSetting() {
  visibleSetting.value = true
}
</script>

<style lang="scss" scoped>
.setting-container {
  display: flex;
  justify-content: flex-end;
  height: 100%;
  min-width: 180px;
  overflow: hidden;

  .svg-icon__item {
    display: inline-block;
    height: 100%;
    cursor: pointer;

    &:hover {
      background: $hover-color;
    }
  }
}
</style>
