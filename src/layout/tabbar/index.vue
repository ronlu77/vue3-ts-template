<template>
  <div class="tabbar">
    <div class="tabbar-left">
      <el-icon>
        <component
          :is="isCollapse ? 'Expand' : 'Fold'"
          @click="toggleCollpase"
        ></component>
      </el-icon>
      <Breadcrumb />
    </div>
    <div class="tabbar-right">
      <Setting />
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from './components/breadcrumb/index.vue'
import Setting from './components/setting/index.vue'
import { ref } from 'vue'
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()
const isCollapse = ref(false)

function toggleCollpase() {
  appStore.toggleSidebarStatus()
  isCollapse.value = appStore.opened
}
</script>

<style lang="scss" scoped>
.tabbar {
  width: 100%;
  height: 100%;
  line-height: $base-tabbar-height;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  color: $text-color;

  .tabbar-left {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    margin-left: 6px;

    .el-icon {
      margin-right: 10px;
    }
  }

  .tabbar-right {
    height: 100%;
    display: flex;
    align-items: center;
  }
}
</style>
