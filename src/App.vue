<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { Plus } from '@element-plus/icons-vue'
import { login } from '@/api/user'
import { onMounted } from 'vue'

onMounted(() => {
  login({ username: 'admin', password: '123456' })
    .then((result) => {
      console.log(result)
    })
    .catch()
})
</script>

<template>
  <HelloWorld msg="Vite + Vue" />
  <el-button :icon="Plus">CLick</el-button>
  <span class="logo">jjj</span>
</template>

<style lang="scss">
.logo {
  color: $color;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
