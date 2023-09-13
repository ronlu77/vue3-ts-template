<template>
  <div class="tabbar">
    <div class="tabbar-left">
      <SidebarTrigger
        :is-collpase="isCollapse"
        @toggle-collpase="handleToggleCollpase"
      />
      <Breadcrumb />
    </div>
    <div class="tabbar-right">
      <Setting />
    </div>
  </div>
</template>

<script setup lang="ts">
import SidebarTrigger from './SidebarTrigger.vue'
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
import { ref } from 'vue'
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()
const isCollapse = ref(false)

function handleToggleCollpase() {
  isCollapse.value = !isCollapse.value
  appStore.toggleSidebarStatus()
}
</script>

<style lang="scss" scoped>
.tabbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: $text-color;
  font-size: 22px;
  height: 40px;
  border-bottom: 1px solid var(--el-border-color);

  .tabbar-left {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .tabbar-right {
    height: 100%;
  }
}
</style>
