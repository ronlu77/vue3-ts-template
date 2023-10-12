<template>
  <el-drawer
    v-model="useVisible"
    title="项目配置"
    size="20%"
    destroy-on-close
    append-to-body
  >
    <div class="setting-drawer-main">
      <el-scrollbar>
        <div style="height: 1000px">
          <el-divider><span class="t-size bold">主题配置</span></el-divider>
          <div class="flex justify-between align-center">
            <label class="l-size label" for="">黑暗模式</label>
            <el-switch
              v-model="isDark"
              inline-prompt
              :active-icon="Moon"
              width="60"
              size="large"
              :inactive-icon="Sunny"
              @change="toggleDarkTheme"
            />
          </div>
          <div class="flex justify-between align-center">
            <label class="l-size label" for="">灰色模式</label>
            <el-switch
              v-model="isGray"
              inline-prompt
              active-text="开"
              width="60"
              size="large"
              inactive-text="关"
              @change="toggleGrayTheme"
            />
          </div>
          <el-divider><span class="t-size bold">导航栏模式</span></el-divider>
          <el-divider><span class="t-size bold">标签栏</span></el-divider>
          <div class="flex justify-between align-center">
            <label class="l-size label" for="">是否启用</label>
            <el-switch
              v-model="showTabber"
              inline-prompt
              active-text="开"
              width="60"
              size="large"
              inactive-text="关"
              @change="toggleSetTabbar"
            />
          </div>
          <el-divider><span class="t-size bold">界面功能</span></el-divider>
          <div class="box"></div>
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
import { ref, computed } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import useSettingStore from '@/store/modules/setting'
import { Sunny, Moon } from '@element-plus/icons-vue'

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
const showTabber = ref(true)

const isDark = useDark({
  // 自定义暗黑主题class
  valueDark: 'dark',
  // 自定义默认主题class
  valueLight: 'light',
})
const isGray = ref(false)
const color = ref('#999')

function toggleDarkTheme(val: boolean) {
  const theme = val ? 'dark' : 'light'
  settingStore.setTheme(theme)
}

function toggleGrayTheme(val: boolean) {
  color.value = val ? '#999' : '#151'
  console.log('test', color.value)
}

function toggleSetTabbar(val: boolean) {
  settingStore.setTagView(val)
}
</script>

<style lang="scss" scoped>
.box {
  width: 20px;
  height: 20px;
  color: v-bind(color);
}
</style>
