<template>
  <el-button icon="Refresh" circle @click="refreshMain"></el-button>
  <el-button icon="FullScreen" circle></el-button>
  <el-button icon="Setting" circle></el-button>
  <el-avatar
    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
  />
  <el-dropdown trigger="click">
    <span class="el-dropdown-link">
      admin
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item>退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()

function refreshMain() {
  console.log('route path 22', route.fullPath, new Date().getTime())
  router.replace({ path: '/redirect' + route.fullPath })
}
</script>

<style lang="scss" scoped></style>
