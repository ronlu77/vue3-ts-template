<template>
  <div>
    <el-card shadow="never">
      <template #header>
        <span>模拟用户登录过期</span>
      </template>
      <el-button type="primary" @click="makeSesstionTimeout">Click</el-button>
    </el-card>

    <countdown-timer-dialog
      v-model:visible="visibleCountdownDialog"
      time="5"
    ></countdown-timer-dialog>
  </div>
</template>
<script setup lang="ts" name="SesstionTimeout">
import { ref, watch } from 'vue'
import { mockUserSesstionTimeout } from '@/api/user'
import { useRouter, useRoute } from 'vue-router'
import useUserStore from '@/store/modules/user'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const visibleCountdownDialog = ref(false)

watch(visibleCountdownDialog, async (newVal) => {
  if (!newVal) {
    // 模拟用户登录过期，跳转到login重新登录
    await userStore.userLogout()
    router.push({
      name: 'redirect',
      params: {
        path: route.fullPath,
      },
    })
  }
})

function makeSesstionTimeout() {
  ElMessage.warning('trigger')
  // mockUserSesstionTimeout()
  //   .then(() => {
  //     console.log('sesstionTimeout')
  //   })
  //   .catch((err) => {
  //     visibleCountdownDialog.value = true
  //     console.log(err)
  //   })
}
</script>
