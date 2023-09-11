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
          <el-divider>主题</el-divider>
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
import { computed } from 'vue'

const props = defineProps<{
  visible: boolean
}>()
const emit = defineEmits(['update:visible'])
const useVisible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val),
})
</script>

<style lang="scss" scoped></style>
