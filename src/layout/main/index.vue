<template>
  <div class="container">
    <router-view v-slot="{ Component, route }">
      <!-- transition 组件不可包裹多个根元素 -->
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cacheViewList">
          <component :is="Component" :key="route.path"></component>
        </keep-alive>
      </transition>
    </router-view>
    <div class="copyright" v-if="showFooter">
      <p>2023&nbsp;-&nbsp;{{ currentYear }}&nbsp; EMS by rainy_992</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { unref, computed } from 'vue'
import useTagViewsStore from '@/store/modules/tagViews'
import { useRootSetting } from '@/hooks/setting/useRootSetting'

const { getShowFooter } = useRootSetting()
const showFooter = computed(() => {
  return unref(getShowFooter)
})
const currentYear = computed(() => new Date().getFullYear())
const cacheViewList = computed(() => useTagViewsStore().cacheTagList)
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 5px 10px;
}

.copyright {
  position: fixed;
  bottom: 10px;
  left: 0;
  right: 0;
  text-align: center;
  color: $text-color;
  z-index: 999;
}
</style>
