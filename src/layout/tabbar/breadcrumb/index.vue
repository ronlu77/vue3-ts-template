<template>
  <div class="breadcrumb-container breadcrumb">
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
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { isRedirectPath } from '@/utils/is'

const route = useRoute()
const levelList = ref([])

function getBreadCrumbItem(): Array<any> {
  const matched = route.matched.filter((item) => item.meta && item.meta.title)
  return matched
}

watchEffect(() => {
  if (isRedirectPath(route.path)) return
  levelList.value = getBreadCrumbItem()
})
</script>
