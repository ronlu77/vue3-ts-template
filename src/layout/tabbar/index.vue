<template>
  <div class="tabbar">
    <div class="tabbar-left">
      <SidebarTrigger
        :is-collpase="isCollapse"
        @toggle-collpase="handleToggleCollpase"
      />
      <Breadcrumb v-if="unref(getShowBreadcrumb)" />
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
import { ref, unref, computed } from 'vue'
import { useRootSetting } from '@/hooks/setting/useRootSetting'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

const { getShowBreadcrumb } = useRootSetting()
const { getShowSidebar, toggleMenu } = useMenuSetting()
const isCollapse = computed(() => unref(getShowSidebar))

function handleToggleCollpase() {
  toggleMenu()
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
  border-bottom: 1px solid $border-color;

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
