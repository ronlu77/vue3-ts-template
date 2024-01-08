<template>
  <div class="layout__container">
    <el-container style="height: 100vh">
      <el-aside v-show="showSidebar" :width="asideWidth">
        <Logo :collapse="isCollapse" v-if="showLogo" />
        <div class="menu" :class="{ logo: showLogo }">
          <el-scrollbar style="height: 100%">
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
      </el-aside>
      <el-container>
        <el-header>
          <Tabbar v-if="showTabbar" />
          <ScrollTagView v-if="showTagger" />
        </el-header>
        <el-main>
          <el-scrollbar height="100%">
            <AppMain />
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>

    <!-- 系统配置抽屉 -->
    <SettingDrawer />
  </div>
</template>

<script setup lang="ts">
import SettingDrawer from './tabbar/setting/SettingDrawer.vue'
import Logo from './logo/index.vue'
import MenuItem from './menu-item/index.vue'
import ScrollTagView from './tag-view/index.vue'
import Tabbar from './tabbar/index.vue'
import AppMain from './main/index.vue'
import { ref, unref, computed } from 'vue'
import { useRoute } from 'vue-router'
import usePermissionStore from '@/store/modules/permission'
import { useRootSetting } from '@/hooks/setting/useRootSetting'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import variables from '@/styles/variable.module.scss'

const route = useRoute()
const { getShowLogo, getShowTagger } = useRootSetting()
const { getShowHeader } = useHeaderSetting()
const { getShowSidebar, getMenuCollapsed } = useMenuSetting()
const showLogo = computed(() => unref(getShowLogo))
const showSidebar = computed(() => unref(getShowSidebar))
const showTabbar = computed(() => unref(getShowHeader))
const showTagger = computed(() => unref(getShowTagger))
const isCollapse = computed(() => unref(getMenuCollapsed))
const menuList = computed(() => usePermissionStore().frontMenuList)
const currentActiveMenuPath = computed(() => route.path.toString())
const backgroundColor = computed(() => variables.menuBackgroundColor)
const textColor = computed(() => variables.textColor)

const asideWidth = computed(() =>
  isCollapse.value ? variables.minMenuWidth : variables.maxMenuWidth,
)
</script>

<style lang="scss" scoped>
.layout__container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.menu {
  height: 100%;
}

.menu.logo {
  height: calc(100% - $base-logo-height);
}
</style>
