<template>
  <div class="breadcrumb-container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="item in levelList"
        :key="item.path"
        :to="item.path"
      >
        <span>{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const levelList = computed(() =>
  route.matched.filter((item) => item.meta && item.meta.title),
)
</script>

<style lang="scss" scoped>
.breadcrumb-container {
}
</style>
