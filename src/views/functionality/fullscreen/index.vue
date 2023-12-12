<template>
  <div class="container__inner">
    <expand-card title="全屏操作">
      <el-button type="primary" :disabled="isFullScreen" @click="enter">
        enter fullscreen
      </el-button>
      <el-button type="success" @click="toggle">toggle fullscreen</el-button>
      <el-button type="danger" @click="exit">exit fullscreen</el-button>
    </expand-card>

    <div class="box" ref="fullscreenRef">
      <expand-card title="Dom fullscreen">
        <el-button type="primary" @click="toggleFullscreen">
          toggle fullscreen
        </el-button>
      </expand-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useFullscreen } from '@vueuse/core'

const fullscreenRef = ref<HTMLElement>(null)
const { toggle, enter, exit, isFullScreen } = useFullscreen()
const { toggle: toggleFullscreen } = useFullscreen(fullscreenRef)
</script>

<style lang="scss" scoped>
.container__inner {
  display: flex;
  flex-direction: column;
  align-items: center;

  .box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    height: 300px;
    margin-top: 20px;
    background: $normal-color;
    border-radius: 4px;
    border: 1px solid $border-color;
  }

  .expand-card__wrapper {
    margin: 0 10px;
  }
}
</style>
