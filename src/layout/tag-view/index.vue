<template>
  <div class="tag-view">
    <div class="tag-view-left">
      <el-scrollbar ref="elScrollbar">
        <div class="tag-view-container">
          <!-- RouteLink 嵌套时，内部嵌套元素如果绑定了事件需要使用prevent 修饰符组织默认行为，否则会引发RouteLink的默认行为，造成路由多次跳转 -->
          <router-link
            class="tag-view__item"
            v-for="(item, index) in tagViewList"
            :class="isActive(item) ? 'active' : ''"
            :key="index"
            :to="item.path"
            @click="toScrollCurrentTagView()"
          >
            <div class="tag-view__body">
              <span class="tag_view_title">{{ item.meta.title }}</span>
              <el-icon
                v-if="!isAffix(item)"
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
        ref="refSvg"
        class="svg-icon-item"
        name="refresh"
        size="12"
        color="#9292AE"
        v-throttle="handleRefreshPage"
      />
      <div class="svg-icon-item dropdown-btn">
        <SvgIcon
          name="dropdown"
          size="12"
          color="#9292AE"
          @click.stop="toToggleTagViewOptionCard"
        />
        <TagViewOptionCard
          class="option-card"
          :class="{ active: isCardVisible }"
          ref="tagViewOption"
          @close-card="handleCardClose"
        />
      </div>
      <SvgIcon
        class="svg-icon-item"
        name="fullscreen2"
        size="12"
        color="#9292AE"
        @click="toToggleMainContentFullScreen"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import TagViewOptionCard from './TagViewOptionCard.vue'
import {
  ref,
  reactive,
  computed,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  watch,
  getCurrentInstance,
} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useTagViewsStore from '@/store/modules/tagViews'
import usePermissionStore from '@/store/modules/permission'
import { cloneDeep } from 'lodash-es'

const { proxy, appContext } = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const { routes } = usePermissionStore()
const tagStore = useTagViewsStore()
const tagViewList = computed(() => tagStore.tagViewList) // 获取需要展示的tag集合
const isCardVisible = ref<boolean>(false) // 控制标签操作卡片显隐
let isFirstRender = true // 是否为首次组件渲染
let refreAnimation = null // 刷新动画对象

// 监听路由变化，路由变化了添加到 tagViewList 中, 除用于实现刷新页面效果的 /redirect/:path(.*) 路由外
watch(route, (newVal) => {
  const regexp = /^\/redirect/
  if (regexp.test(newVal.path)) return
  //! 此处需要深拷贝 route！ 否则再次添加, 路由改变将引起 tagViewList 中上传存储的数据改变，导致不会新增 tagView, 而是更改上次添加的 tagview
  tagStore.addTagView(cloneDeep(route))
})

watch(
  () => tagStore.refreshing,
  (newVal) => {
    if (!newVal) {
      refreAnimation && refreAnimation.cancel()
    }
  },
)

// 判断tag view 是否为当前路由
const isActive = (tag: any): boolean => {
  return tag.path === route.path
}

/** 判断是否为固定项 */
const isAffix = (tag: any): boolean => {
  return tag.meta && tag.meta.affix
}

/** 获取开启affix: true 路由项 */
function filterAffixTags(routes: any[], basePath = ''): any[] {
  let tags = []
  routes.forEach((route: any) => {
    if (route.meta && route.meta.affix) {
      const fullPath = `${basePath}/${route.path}`.replace('//', '/')
      tags.push({
        fullPath,
        path: fullPath,
        meta: { ...route.meta },
      })
    }
    if (route.children && route.children.length) {
      const subTags = filterAffixTags(route.children, route.path)
      tags = tags.concat(subTags)
    }
  })
  return tags
}

// 寻找当前tagView在集合中的下标
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

//todo 滚动到当前 tag view
function toScrollCurrentTagView(): void {
  const CONTAINER = document.querySelector('.tag-view-container')
  const CONTAINER_WIDTH = CONTAINER.clientWidth
  // console.log(CONTAINER_WIDTH, CONTAINER.clientLeft, proxy.$refs.elScrollbar)
}

// 删除 tag view
function handleCloseTagView(tagView: any): void {
  const tagViewIndex = findTagViewIndex(tagViewList.value, tagView)
  const lastIndex = tagViewIndex - 1
  if (isActive(tagView)) {
    lastIndex !== -1
      ? router.push({ path: tagViewList.value[lastIndex]['fullPath'] })
      : router.push({ path: tagViewList.value[tagViewIndex + 1]['fullPath'] })
  }
  tagStore.deleteTagView(tagView)
}

//#region option zone
/** 刷新时添加动画帧 */
function handleRefreshPage() {
  tagStore.refreshing = true
  tagStore.refreshPage(route)
  // svg 旋转，刷新结束停止旋转
  refreAnimation = proxy.$refs.refSvg['$el']
    .querySelector('svg')
    .animate([{ transform: 'rotate(0)' }, { transform: 'rotate(360deg)' }], {
      duration: 800,
      iterations: Infinity,
    })
}

/** 标签操作卡片的显隐 */
function toToggleTagViewOptionCard() {
  isCardVisible.value = !isCardVisible.value
}

function handleCardClose(val: boolean) {
  isCardVisible.value = val
}

function toToggleMainContentFullScreen() {
  //todo main-app 部分的全屏实现
  // top 和 sidebar 隐藏再进行全屏操作
  isCardVisible.value = false
}
//#endregion

/** 初始化操作 */
function initTagView() {
  const tags = filterAffixTags(routes)
  for (const tag of tags) {
    tagStore.addTagView(cloneDeep(tag))
  }
  // 添加当前路由到 tag-view-list
  tagStore.addTagView(cloneDeep(route))
}

onBeforeMount(() => {
  initTagView()
  // 注意冒泡多次触发click事件
  document.body.addEventListener('click', (event) => {
    event.stopPropagation()
    if (isCardVisible.value && !isFirstRender) {
      const option_dom = proxy.$refs.tagViewOption['$el']
      if (!option_dom.contains(event.target)) {
        isCardVisible.value = false
      }
    }
    isFirstRender = false
  })
})

onBeforeUnmount(() => {
  document.body.removeEventListener('click', () => {
    // console.log('remove click')
  })
})

onMounted(() => {
  console.log('trigger', route)
})
</script>

<style lang="scss" scoped>
.tag-view {
  display: flex;
  align-items: flex-end;
  height: $tag-view-height;
  border-bottom: 1px solid $border-color;

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
  height: 100%;
  cursor: pointer;
  border-left: 1px solid $border-color;

  &:hover {
    background: $hover-color;
  }
}

.tag-view-container {
  display: flex;

  .svg-icon-item_container {
    height: 100%;
  }

  .tag-view__item {
    flex-shrink: 0;
    border-radius: 4px 4px 0 0;
    border: 1px solid $border-color;
    border-bottom: none;

    .tag-view__body {
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

.option-card {
  position: absolute;
  top: $base-tabbar-height + 4;
  right: 2px;
  max-height: 0;
  transition: max-height 300ms ease; // 通过max-height 实现过渡效果
  overflow: hidden;
  z-index: 999;

  &.active {
    visibility: visible;
    max-height: 210px;
  }
}
</style>
