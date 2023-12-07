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
          :text-color="textColor"
          :background-color="backgroundColor"
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
      <ScrollTagView v-if="showTag" />
    </div>
    <div class="layout-main" :class="showTag ? '' : 'show-tag'">
      <el-scrollbar height="100%">
        <AppMain />
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'
import MenuItem from './menu-item/index.vue'
import ScrollTagView from './tag-view/index.vue'
import Tabbar from './tabbar/index.vue'
import AppMain from './main/index.vue'
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store/modules/app'
import usePermissionStore from '@/store/modules/permission'
import useSettingStore from '@/store/modules/setting'
import variables from '@/styles/variable.module.scss'

const route = useRoute()
const isCollapse = computed(() => !useAppStore().opened)
const menuList = computed(() => usePermissionStore().frontMenuList)
const currentActiveMenuPath = computed(() => route.path.toString())
const backgroundColor = computed(() => variables.menuBackgroundColor)
const textColor = computed(() => variables.textColor)
const settingStore = useSettingStore()
const showTag = ref(true)

watch(
  () => settingStore.tag,
  (newVal) => {
    showTag.value = newVal
  },
)
</script>

<style lang="scss" scoped>
.layout-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;

  .layout-sider {
    width: $base-menu-width;
    height: 100vh;
    background: $menu-background;
    transition: width 0.3s ease-in;
  }

  :deep(.el-menu--collapse) {
    width: 100%;
  }

  .layout-tabbar {
    position: fixed;
    top: 0;
    left: $base-menu-width;
    display: flex;
    flex-direction: column;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    transition: all 0.3s ease-in;
    z-index: 2;
  }

  .show-tag.layout-main {
    top: $base-nav-height;
    height: calc(100vh - $base-nav-height);
  }

  .layout-main {
    position: absolute;
    left: $base-menu-width;
    top: $base-tabbar-height;
    width: calc(100% - $base-menu-width);
    height: calc(100% - $base-tabbar-height);
    transition: all 0.3s ease-in;
    background: $background-color;
  }

  // 隐藏侧边栏
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
