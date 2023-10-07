<template>
  <el-drawer v-model="useVisible" title="项目配置" size="20%" destroy-on-close append-to-body>
    <div class="setting-drawer-main">
      <el-scrollbar>
        <div style="height: 1000px">
          <el-divider>主题配置</el-divider>
          <div>
            <label for="">黑暗模式</label>
            <el-switch v-model="isDark" inline-prompt active-text="dark" size="large" inactive-text="light"
              @change="toggleDarkTheme" />
          </div>
          <div>
            <label for="">灰色模式</label>
            <el-switch inline-prompt active-text="gray" size="large" inactive-text="light" />
          </div>
          <el-divider>导航栏模式</el-divider>
          <el-divider>界面功能</el-divider>
          <el-form>
            <el-row>
              <el-col>
                <el-form-item></el-form-item>
              </el-col>
              <el-col>
                <el-form-item></el-form-item>
              </el-col>
              <el-col>
                <el-form-item></el-form-item>
              </el-col>
              <el-col>
                <el-form-item></el-form-item>
              </el-col>
              <el-col>
                <el-form-item></el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-scrollbar>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import useSettingStore from '@/store/modules/setting'

interface Props {
  visible: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['update:visible'])
const useVisible = computed({
  get: (): boolean => props.visible,
  set: (val): void => emit('update:visible', val),
})
const settingStore = useSettingStore()
// const theme = ref<boolean>(true)
const isDark = useDark({
  valueDark: 'dark',
  valueLight: 'light',
})

// useDark({
//   // 存储到localStorage/sessionStorage中的Key 根据自己的需求更改
//   // storageKey: 'useDarkKEY',
//   // 暗黑class名字
//   valueDark: 'dark',
//   // 高亮class名字
//   valueLight: 'light',
// })
// const toggleDark = useToggle(isDark)

function toggleDarkTheme(val: boolean) {
  console.log('isDark', isDark)
  const theme = val ? 'dark' : 'light'
  settingStore.setTheme(theme)
  // toggleDark()
}

onMounted(() => {
  // localStorage.setItem('useDarkKEY', 'light')
})
// const theme = ref('light')
</script>

<style lang="scss" scoped></style>
