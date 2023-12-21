<template>
  <div class="layout__container" :class="{ hiden: isCollapse }">
    <div class="layout__sider" v-show="showSidebar">
      <Logo :collapse="isCollapse" v-if="showLogo" />
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
    <div class="layout__tabbar" :class="{ sidebar: showSidebar }">
      <Tabbar />
      <ScrollTagView v-if="showTagger" />
    </div>
    <div
      class="layout__main"
      :class="[showTagger ? 'show-tag' : '', { sidebar: showSidebar }]"
    >
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
import { ref, unref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store/modules/app'
import usePermissionStore from '@/store/modules/permission'
import { useRootSetting } from '@/hooks/setting/useRootSetting'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import variables from '@/styles/variable.module.scss'

const route = useRoute()
const { getShowLogo, getShowTagger } = useRootSetting()
const { getShowHeader } = useHeaderSetting()
const { getShowSidebar } = useMenuSetting()
const showLogo = computed(() => unref(getShowLogo))
const showSidebar = computed(() => unref(getShowSidebar))
const showTabber = computed(() => unref(getShowHeader))
const showTagger = computed(() => unref(getShowTagger))
const isCollapse = computed(() => !useAppStore().opened)
const menuList = computed(() => usePermissionStore().frontMenuList)
const currentActiveMenuPath = computed(() => route.path.toString())
const backgroundColor = computed(() => variables.menuBackgroundColor)
const textColor = computed(() => variables.textColor)

watch(showTagger, (newVal, oldVal) => {
  console.log('loading trigger change')
})
</script>

<style lang="scss" scoped>
// has sidebar layout
.layout__container {
  width: 100%;
  height: 100vh;
  overflow: hidden;

  .layout__sider {
    width: $base-menu-width;
    height: 100vh;
    background: $menu-background;
    transition: width 0.3s ease-in;
  }

  :deep(.el-menu--collapse) {
    width: 100%;
  }

  .layout__tabbar {
    left: 0;
    width: 100%;
  }

  .sidebar.layout__tabbar {
    position: fixed;
    top: 0;
    left: $base-menu-width;
    display: flex;
    flex-direction: column;
    height: $base-tabbar-height;
    z-index: 2;
    width: calc(100% - $base-menu-width);
  }

  .sidebar.layout__main {
    position: absolute;
    top: $base-nav-height;
    left: $base-menu-width;
    z-index: 1;
    width: calc(100% - $base-menu-width);
    height: calc(100% - $base-nav-height);
    background: $background-color;
  }

  .show-tag.layout__main {
    top: $base-tabbar-height;
    height: calc(100vh - $base-tabbar-height);
  }

  .layout__main {
    left: 0;
    width: 100%;
  }

  &.hiden {
    .layout__sider {
      width: $base-menu-hiden-width;
      left: $base-menu-hiden-width;
    }

    .layout__main,
    .layout__tabbar {
      width: calc(100vw - $base-menu-hiden-width);
      left: $base-menu-hiden-width;
    }
  }
}
</style>
