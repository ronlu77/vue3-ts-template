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
          <el-divider>主题配置</el-divider>
          <div>
            <label for="">黑暗模式</label>
            <el-switch
              v-model="isDark"
              inline-prompt
              active-text="dark"
              size="large"
              inactive-text="light"
              @change="toggleDark"
            />
          </div>
          <div>
            <label for="">灰色模式</label>
            <el-switch
              v-model="isDark"
              inline-prompt
              active-text="gray"
              size="large"
              inactive-text="light"
            />
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
import { ref, computed } from 'vue'
import { useDark, useToggle } from '@vueuse/core'

interface Props {
  visible: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['update:visible'])
const useVisible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val),
})
const isDark = useDark()
const toggleDark = useToggle(isDark)
// const theme = ref('light')
</script>

<style lang="scss" scoped></style>
