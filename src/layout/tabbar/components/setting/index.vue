<template>
  <el-button icon="Refresh" circle @click="refreshMain"></el-button>
  <el-button icon="FullScreen" circle @click="fullScreen"></el-button>
  <el-button icon="Setting" circle></el-button>
  <el-avatar
    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
  />
  <el-dropdown trigger="click">
    <span class="el-dropdown-link">
      {{ userStore.username || '' }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import useUserStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

function refreshMain() {
  router.replace({ path: '/redirect' + route.fullPath })
}

function fullScreen() {
  // fullscreenElement 判断是否为全屏， 全屏返回 true 否则 null
  let full = document.fullscreenElement
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

/** 登出操作
 *  1.清空用户信息;
 *  2.清空localStorage信息；
 *  3.路由调转登录页面，如果下次重新登录成功再次返回当前页面。
 */
function handleLogout() {
  userStore
    .userLogout()
    .then(() => {
      router.replace({ path: '/login' })
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<style lang="scss" scoped></style>
