<template>
  <div class="user-center">
    <el-dropdown>
      <div class="dropdown-header">
        <el-avatar
          :size="22"
          src="https://p6-passport.byteacctimg.com/img/user-avatar/02a43675ca9234e9aaa4e30ac2accb09~40x40.awebp"
        ></el-avatar>
        <div class="username">{{ userStore.username }}</div>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <SvgIcon name="" size="12" />
            <router-link :to="{ path: '/center' }">个人中心</router-link>
          </el-dropdown-item>
          <el-dropdown-item @click="handleLockScreen">
            <SvgIcon name="" size="12" />
            <span>锁定屏幕</span>
          </el-dropdown-item>
          <el-dropdown-item @click="handleLogout">
            <SvgIcon name="" size="12" />
            <span>退出系统</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'
import { useRoute, useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'

const userStore = useUserStore()
const router = useRouter()

/** 锁定屏幕 */
function handleLockScreen() {
  console.log('lock')
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
      ElNotification({
        title: 'Success',
        type: 'success',
        message: '退出成功🚀~',
      })
      router.replace({ path: '/login' })
    })
    .catch((err) => {})
}
</script>

<style lang="scss" scoped>
.user-center {
  height: 100%;
  min-width: 120px;
  font-size: 14px;
  color: $text-color;
  cursor: pointer;

  &:hover {
    background: $hover-color;
  }

  :deep(.el-dropdown) {
    height: 100%;
    width: 100%;
    .dropdown-header {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      width: 100%;
    }
  }

  .username {
    font-weight: bold;
    color: $text-color;
  }
}
</style>
