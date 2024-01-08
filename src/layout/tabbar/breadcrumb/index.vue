<template>
  <div class="breadcrumb-container breadcrumb">
    <el-breadcrumb separator="/">
      <!-- 开启 to 属性可以进行路由的跳转 -->
      <el-breadcrumb-item
        v-for="item in levelList"
        :key="item.path"
        @click.passive="toPage"
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

function toPage(event) {
  console.log('breadcrumb', event)
}

watchEffect(() => {
  //! 避免刷新当前页面引起面包屑丢失
  if (isRedirectPath(route.path)) return
  levelList.value = getBreadCrumbItem()
})
</script>
