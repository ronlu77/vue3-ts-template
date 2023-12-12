<template>
  <div class="container__inner">
    <expand-card title="水印功能实现">
      <el-switch
        v-model="useWatermark"
        active-color="#13ce66"
        active-text="on"
        inactive-text="off"
        @change="handleWatermark"
      ></el-switch>
      <div class="img__wrapper">
        <img style="width: 300px; height: 300px" :src="src" v-watermark />
      </div>
    </expand-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { setWatermark, removeWatermark } from '@/common/watermark'

const src = ref(
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
)
const useWatermark = ref<boolean>(false)

function handleWatermark(val: boolean) {
  if (val) {
    setWatermark('code hollow')
  } else {
    removeWatermark()
  }
}
</script>
<style lang="scss" scoped>
.img__wrapper {
  margin-top: 10px;
}
</style>
