<template>
  <el-drawer
    v-model="useVisible"
    title="项目配置"
    :size="300"
    destroy-on-close
    append-to-body
  >
    <div class="setting-drawer__main">
      <el-divider><span class="bold">主题配置</span></el-divider>
      <div class="theme-switch__wrapper">
        <el-switch
          class="theme-switch"
          v-model="isDark"
          size="large"
          inline-prompt
          :active-action-icon="Moon"
          :inactive-action-icon="Sunny"
          @change="toggleDarkTheme"
        ></el-switch>
      </div>
      <el-divider><span class="bold">导航栏模式</span></el-divider>
      <el-divider><span class="bold">菜单主题</span></el-divider>
      <el-divider><span class="bold">界面功能</span></el-divider>
      <SwitchItem
        title="灰色模式"
        :bind-value="unref()"
        :event="HandlerEnum.GRAY_MOD"
      ></SwitchItem>
      <el-divider><span class="bold">界面显示</span></el-divider>
      <SwitchItem
        title="顶栏"
        :bind-value="unref(getShowHeader)"
        :event="HandlerEnum.HEADER_SHOW"
      ></SwitchItem>
      <SwitchItem
        title="logo"
        :bind-value="unref(getShowLogo)"
        :disabled="!unref(getShowSidebar)"
        :event="HandlerEnum.LOGO_SHOW"
      ></SwitchItem>
      <SwitchItem
        title="标签栏"
        :bind-value="unref(getShowTagger)"
        :event="HandlerEnum.TAGGER_SHOW"
      ></SwitchItem>
      <SwitchItem
        title="面包屑"
        :bind-value="unref(getShowBreadcrumb)"
        :event="HandlerEnum.BREADCRUMB_SHOW"
      ></SwitchItem>
      <SwitchItem
        title="菜单栏"
        :bind-value="unref(getShowSidebar)"
        :event="HandlerEnum.MENU_SHOW"
      ></SwitchItem>
      <SwitchItem
        title="页脚"
        :bind-value="unref(getShowFooter)"
        :event="HandlerEnum.FOOTER_SHOW"
      ></SwitchItem>
    </div>
    <template #footer>
      <el-button type="warning">重置</el-button>
      <el-button type="danger">清空缓存并回到登录页面</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import SwitchItem from './components/SwitchItem.vue'
import { ref, computed, unref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { useAppStore } from '@/store/modules/app'
import { useRootSetting } from '@/hooks/setting/useRootSetting'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { HandlerEnum } from './enum'
import { Sunny, Moon } from '@element-plus/icons-vue'

const props = defineProps({
  visible: {
    type: Boolean,
  },
})
const emit = defineEmits(['update:visible'])
const useVisible = computed({
  get: (): boolean => props.visible,
  set: (val): void => emit('update:visible', val),
})
const { setSystemDark, getSystemDark } = useAppStore()
const { getShowLogo, getShowFooter, getShowTagger, getShowBreadcrumb } =
  useRootSetting()
const { getShowHeader } = useHeaderSetting()
const { getShowSidebar } = useMenuSetting()

const isDark = useDark({
  //! 使用 useDark 会造成过渡效果的丢失
  disableTransition: false,
  // 自定义暗黑主题class
  valueDark: 'dark',
  // 自定义默认主题class
  valueLight: 'light',
})

function toggleDarkTheme(val: boolean) {
  const theme = val ? 'dark' : 'light'
  setSystemDark(theme)
  useToggle(isDark)
}
</script>

<style lang="scss" scoped>
.setting-drawer__main {
  width: 90%;
  height: 100%;
  padding: 10px 0px;
  margin-top: 20px;
}

.theme-switch__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.settings {
  width: 100%;
}

.el-button {
  width: 90%;
  margin: 6px;
}
</style>
