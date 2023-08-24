<template>
  <div v-if="!item.hidden">
    <!-- 只有一个菜单时只展示菜单不展示目录 -->
    <template v-if="hasOnlyChildren(item.children, item)">
      <Link
        v-if="onlychildren.meta"
        :to="resolvePath(onlychildren.path, onlychildren.query)"
      >
        <el-menu-item :index="resolvePath(onlychildren.path)">
          <!-- <Item :data="onlychildren.meta" /> -->
          {{ onlychildren.meta.title }}
        </el-menu-item>
      </Link>
    </template>
    <!-- 多级嵌套目录结构：teleported 控制当菜单收缩时多级下拉出现弹窗展示 -->
    <el-sub-menu v-else :index="resolvePath(item.path)" teleported>
      <template #title v-if="item.meta">
        {{ item.meta.title }}
      </template>
      <!-- 使用组件递归时需要指定组件的name，否则无法调用 -->
      <MenuItem
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :path="resolvePath(child.path)"
      />
    </el-sub-menu>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MenuItem',
}
</script>

<script setup lang="ts">
// import Item from '../item/index.vue'
import Link from '../link/index.vue'
import { ref } from 'vue'
import { isExtrernalLink } from '@/utils/validate'

const props = defineProps({
  item: { type: Object, required: true },
  path: { type: String, required: true },
})
const onlychildren = ref(null)

/** 判断是否只存在一个children */
function hasOnlyChildren(childrenRoutes = [], parentRoute = {}) {
  const showRoutesList = childrenRoutes.filter((item) => {
    if (item.hidden) {
      return false
    } else {
      onlychildren.value = item
      return true
    }
  })

  if (showRoutesList.length === 1) {
    return true
  }

  if (showRoutesList.length === 0) {
    onlychildren.value = {
      ...parentRoute,
      path: '',
      noShowingChildren: true,
    }
    return true
  }
  return false
}

/** 判断路径是否为外部链接，拼接路由路径 */
function resolvePath(path: string, query?: any): string {
  if (isExtrernalLink(path)) {
    return path
  }
  if (isExtrernalLink(props.path)) {
    return props.path
  }
  if (query) {
    // @ts-ignore
    return { path: props.path, query }
  }
  if (!props.item.children) return props.path
  if (props.path === '/') return props.path.concat(path)
  const str = props.path.endsWith('/') ? '' : props.path + '/'
  return str.concat(path)
}
</script>
<style></style>
