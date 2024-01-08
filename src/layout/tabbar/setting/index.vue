<template>
  <div class="setting-container">
    <SvgIcon
      class="svg-icon__item"
      name="search"
      :size="22"
      @click.stop="handleSearch"
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
</template>

<script setup lang="ts">
import Translate from './Translate.vue'
import UserCenter from './UserCenter.vue'
import UnreadMessgae from './UnreadMessage.vue'
import { ref } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'

const appStore = useAppStore()
const isFullScreen = ref(false)
const { toggleSearch } = useHeaderSetting()

// todo 搜索功能
function handleSearch() {
  toggleSearch()
}

function handleScreenfull() {
  //* fullscreenElement 判断是否为全屏， 全屏返回 true 否则 null
  let full = document.fullscreenElement
  isFullScreen.value = !full
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

function toSetting() {
  appStore.toggleSystemSetting()
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
