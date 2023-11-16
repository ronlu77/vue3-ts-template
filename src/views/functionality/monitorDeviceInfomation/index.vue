import { login } from '@/api/user'; import { isNumber } from
'element-plus/es/utils';
<template>
  <div class="container__inner">
    <el-card shadow="never">
      <template #header>
        <span>设备网络监控</span>
      </template>
      <el-tag type="success">test</el-tag>
    </el-card>
    <el-card shadow="never">
      <template #header>
        <span>鼠标位置</span>
      </template>
      <p>X轴: {{ mouseLocal.x_local }}</p>
      <p>Y轴: {{ mouseLocal.y_local }}</p>
    </el-card>
    <el-card shadow="never">
      <template #header>
        <span>键盘监听</span>
        <p>尝试按下w,a,s,d按键 ~</p>
      </template>
    </el-card>
    <el-card shadow="never">
      <template #header>
        <span>监听按键是否开启</span>
      </template>
      &nbsp;
      <el-tag :type="keyboardLock.isAltLock ? 'success' : 'danger'">
        Alter
      </el-tag>
      &nbsp;
      <el-tag :type="keyboardLock.isNumLock ? 'success' : 'danger'">
        NumLock
      </el-tag>
      &nbsp;
      <el-tag :type="keyboardLock.isCtrlLock ? 'success' : 'danger'">
        Ctrl
      </el-tag>
      &nbsp;
      <el-tag :type="keyboardLock.isShiftLock ? 'success' : 'danger'">
        Shift
      </el-tag>
      &nbsp;
      <el-tag :type="keyboardLock.isCapsLock ? 'success' : 'danger'">
        CapsLk
      </el-tag>
    </el-card>
    <el-card shadow="never">
      <template #header>
        <p>获取地理位置</p>
      </template>
    </el-card>
  </div>
</template>

<script setup lang="ts" name="MonitorDeviceInfomation">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useKeyModifier } from '@vueuse/core'

const mouseLocal = reactive({
  x_local: 0,
  y_local: 0,
})

const keyboardLock = reactive({
  isAltLock: useKeyModifier('AltGraph'),
  isNumLock: useKeyModifier('NumLock'),
  isCtrlLock: useKeyModifier('Control'),
  isShiftLock: useKeyModifier('Shift'),
  isCapsLock: useKeyModifier('CapsLock'),
})

onMounted(() => {
  window.addEventListener('mousemove', (event) => {
    mouseLocal.x_local = event.clientX
    mouseLocal.y_local = event.clientY
  })

  window.addEventListener('keydown', (event) => {
    const whiteList = ['w', 'a', 's', 'd']
    if (whiteList.includes(event.key)) {
      alert(`您按下了${event.key}键`)
    }
  })
})

onUnmounted(() => {})
</script>

<style lang="scss" scoped>
.el-card + .el-card {
  margin-top: 5px;
}
</style>
