<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  document.getElementById('loading').remove()
})
</script>

<template>
  <!--! 使用路由时需要写一个展示窗口，否则不会显示路由信息 -->
  <router-view></router-view>
</template>

<style lang="scss"></style>
