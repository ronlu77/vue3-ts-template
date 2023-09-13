<template>
  <div class="tag-view">
    <div class="tag-view-left">
      <el-scrollbar>
        <div class="tag-view-container">
          <!-- RouteLink 嵌套时，内部嵌套元素如果绑定了事件需要使用prevent 修饰符组织默认行为，否则会引发RouteLink的默认行为，造成路由多次跳转 -->
          <router-link
            class="tag-view__item"
            v-for="(item, index) in tagViewList"
            :key="index"
            :to="item.path"
            @click="toScrollCurrentTagView()"
          >
            <div class="tag_view__body">
              <span class="tag_view_title">{{ item.meta.title }}</span>
              <el-icon
                v-if="isAffix(item)"
                class="icon-close"
                @click.stop.prevent="handleCloseTagView(item)"
              >
                <Close />
              </el-icon>
            </div>
          </router-link>
        </div>
      </el-scrollbar>
    </div>
    <div class="tag-view-right">
      <SvgIcon
        class="svg-icon-item"
        name="refresh"
        size="12"
        color="#9292AE"
        @click="handleRefreshPage"
      />
      <SvgIcon
        class="svg-icon-item"
        name="dropdown"
        size="12"
        color="#9292AE"
      />
      <SvgIcon
        class="svg-icon-item"
        name="fullscreen2"
        size="12"
        color="#9292AE"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTagViewsStore } from '@/store/modules/tagViews'

const route = useRoute()
const router = useRouter()
const tagViewsStore = useTagViewsStore()
const tagViewList = computed(() => tagViewsStore.tagViewList)

// 监听路由变化，路由变化了添加到 tagViewList 中
watch(route, () => {
  tagViewsStore.addTagView(Object.assign({}, route))
  setCurrentTagView()
})

// 判断tag view 是否为当前路由
const isActive = (tag: any): boolean => {
  return tag.fullPath === route.fullPath
}

const isAffix = (tag: any) => {
  return tag.meta && !tag.meta.affix
}

const findTagViewIndex = (tagViewList: Array<any>, tagView: any): number => {
  let tagViewIndex = -1
  let idx = 0
  if (!tagViewList.length) return tagViewIndex
  while (idx < tagViewList.length) {
    if (tagViewList[idx].fullPath === tagView.fullPath) {
      return idx
    }
    idx++
  }
  return tagViewIndex
}

// 初始化
function initTagView() {
  tagViewsStore.addTagView(Object.assign({}, route))
  setCurrentTagView()
}

// 滚动到当前 tag view
function toScrollCurrentTagView() {
  const CONTAINER = document.querySelector('.tag-view-container')
  const CONTAINER_WIDTH = CONTAINER.clientWidth
  console.log(CONTAINER_WIDTH, CONTAINER.clientLeft)
}

// 删除 tag view
function handleCloseTagView(tagView: any) {
  const tagViewIndex = findTagViewIndex(tagViewList.value, tagView)
  const lastIndex = tagViewIndex - 1
  if (isActive(tagView)) {
    router.push({ path: tagViewList.value[lastIndex].fullPath })
  }
  tagViewsStore.deleteTagView(tagView)
}

function handleRefreshPage() {
  console.log('refresh')
}

// 设置当前
function setCurrentTagView() {
  nextTick(() => {
    const tagViewDomList = document
      .getElementsByClassName('tag-view-container')[0]
      .getElementsByClassName('router-link-active')
    if (!tagViewDomList.length || tagViewDomList.length !== 1) return
    const activeTagView = tagViewDomList[0]
    activeTagView.classList.add('active')
  })
}

onMounted(() => {
  initTagView()
})
</script>

<style lang="scss" scoped>
.tag-view {
  display: flex;
  align-items: flex-end;
  height: $tag-view-height;
  border-bottom: 1px solid var(--el-border-color);
  overflow: hidden;

  .tag-view-left {
    flex: 1;
    margin: 0 6px;

    :deep(.el-scrollbar__bar.is-horizontal) {
      height: 0;
    }
  }

  .tag-view-right {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
}

.svg-icon-item {
  flex: 1;
  cursor: pointer;
  border-left: 1px solid var(--el-border-color);

  &:hover {
    background: $hover-color;
  }
}

.tag-view-container {
  display: flex;

  .tag-view__item {
    flex-shrink: 0;
    border-radius: 4px 4px 0 0;
    border: 1px solid var(--el-border-color);
    border-bottom: none;
    color: $text-color;

    .tag_view__body {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2px 6px;
      font-size: 14px;
    }
    .tag_view_title {
      padding: 0 6px;
    }

    .icon-close {
      transform: scale(0.7);

      &:hover {
        font-weight: bold;
        transform: scale(1);
      }
    }
  }

  .tag-view__item + .tag-view__item {
    margin-left: 6px;
  }
}

.tag-view-container .tag-view__item.active {
  background: $active-color;
  color: #fff;
}
</style>
