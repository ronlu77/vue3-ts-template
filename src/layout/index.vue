<template>
  <div class="layout-container" :class="{ hiden: isCollapse }">
    <div class="layout-sider">
      <Logo :collapse="isCollapse" />
      <el-scrollbar>
        <el-menu
          mode="vertical"
          :default-active="currentActiveMenuPath"
          :collapse="isCollapse"
          :unique-opened="true"
          :collapse-transition="false"
          text-color="#9292AE"
          background-color="#F1F1FB"
        >
          <MenuItem
            v-for="route in menuList"
            :key="route.path"
            :item="route"
            :path="route.path"
          />
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout-tabbar">
      <Tabbar />
      <ScrollTagView />
    </div>
    <div class="layout-main">
      <AppMain />
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'
import MenuItem from './menu-item/index.vue'
import ScrollTagView from './tag-view/index.vue'
import Tabbar from './tabbar/index.vue'
import AppMain from './main/index.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store/modules/app'
import { usePermissionStore } from '@/store/modules/permission'

const route = useRoute()
const isCollapse = computed(() => !useAppStore().opened)
const menuList = computed(() => usePermissionStore().frontMenuList)
const currentActiveMenuPath = computed(() => route.path.toString())
</script>

<style scoped lang="scss">
.layout-container {
  width: 100%;
  height: 100vh;
  background: $background-color;
  overflow: hidden;

  .layout-sider {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    transition: all 0.3s;
  }
  .layout-tabbar {
    position: fixed;
    top: 0;
    left: $base-menu-width;
    display: flex;
    flex-direction: column;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    transition: all 0.3s;
    z-index: 2;
  }

  .layout-main {
    position: absolute;
    left: $base-menu-width;
    top: $base-tabbar-height;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    overflow: auto;
    transition: all 0.3s;
    z-index: 1;
  }

  &.hiden {
    .layout-sider {
      width: $base-menu-hiden-width;
      left: $base-menu-hiden-width;
    }

    .layout-main,
    .layout-tabbar {
      width: calc(100vw - $base-menu-hiden-width);
      left: $base-menu-hiden-width;
    }
  }
}
</style>
