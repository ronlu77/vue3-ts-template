<template>
  <ul class="tag-view-option option-warpper">
    <li class="option__item refresh" @click="handleTagOption('refresh')">
      <SvgIcon class="svg-icon__item" name="refresh" :size="16"></SvgIcon>
      <span>重新加载</span>
    </li>
    <li
      class="option__item close"
      :class="{ disabled: disabledProps.isClose }"
      @click="handleTagOption('close')"
    >
      <SvgIcon class="svg-icon__item" name="" size="16"></SvgIcon>
      <span>关闭标签页</span>
    </li>
    <li
      class="option__item close_left"
      :class="{ disabled: disabledProps.isCloseLeft }"
      @click="handleTagOption('close-left')"
    >
      <SvgIcon class="svg-icon__item" name="" size="16"></SvgIcon>
      <span>关闭左侧标签页</span>
    </li>
    <li
      class="option__item close_right"
      :class="{ disabled: disabledProps.isCloseRight }"
      @click="handleTagOption('close-right')"
    >
      <SvgIcon class="svg-icon__item" name="" size="16"></SvgIcon>
      <span>关闭右侧标签页</span>
    </li>
    <li
      class="option__item close_other"
      @click="handleTagOption('close-other')"
    >
      <SvgIcon class="svg-icon__item" name="" size="16"></SvgIcon>
      <span>关闭其他标签页</span>
    </li>
    <li class="option__item close_all" @click="handleTagOption('close-all')">
      <SvgIcon class="svg-icon__item" name="" size="16"></SvgIcon>
      <span>关闭全部标签页</span>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { ref, reactive, watch, getCurrentInstance, onMounted } from 'vue'
import { useTagViewsStore } from '@/store/modules/tagViews'
import { useRoute } from 'vue-router'

const { proxy } = getCurrentInstance()
const route = useRoute()
const tagViewsStore = useTagViewsStore()
const emit = defineEmits(['removeActiveTag', 'closeCard'])
const disabledPropsInit = () => ({
  isClose: false,
  isCloseLeft: false,
  isCloseRight: false,
})
const disabledProps = reactive(disabledPropsInit())

watch(route, () => {
  console.log('trigger watchinginging')
  Object.assign(disabledProps, disabledPropsInit())
  const activeTagViewIndex = tagViewsStore.getActiveTagViewIndex()
  const tagViewListLength = tagViewsStore.tagViewList.length
  if (activeTagViewIndex >= tagViewListLength - 2) {
    disabledProps.isCloseRight = true
  }
  if (activeTagViewIndex <= 1) {
    disabledProps.isCloseLeft = true
  }
  if (activeTagViewIndex === 0) {
    disabledProps.isClose = true
  }
})

// 标签操作卡
function handleTagOption(type = '') {
  switch (type) {
    case 'refresh':
      tagViewsStore.refreshPage(route)
      emit('closeCard', false)
      break
    case 'close':
      if (route.meta && route.meta.affix) return
      tagViewsStore.closeCurrentTagView()
      emit('closeCard', false)
      break
    case 'close-left':
      if (disabledProps.isCloseLeft) return
      tagViewsStore.closeLeftTagView()
      emit('removeActiveTag')
      emit('closeCard', false)
      break
    case 'close-right':
      if (disabledProps.isCloseRight) return
      tagViewsStore.closeRightTagView()
      emit('removeActiveTag')
      emit('closeCard', false)
      break
    case 'close-other':
      tagViewsStore.closeOtherTagView()
      emit('removeActiveTag')
      emit('closeCard', false)
      break
    case 'close-all':
      tagViewsStore.closeAllTagView()
      emit('closeCard', false)
      break
    default:
      return false
  }
}

onMounted(() => {
  disabledProps.isClose = true
})
</script>
<style lang="scss" scoped>
.option-warpper {
  font-size: 14px;
  border-radius: 6px;
  box-shadow: 0 0 6px rgba($color: #000000, $alpha: 0.3);
  background: $background-color;

  .option__item {
    display: flex;
    align-items: center;
    min-height: 22px;
    padding: 6px;
    color: $text-color;

    &:hover {
      background: $hover-color;
    }

    :deep(.svg-icon__item) {
      padding: 0;
    }

    & > span {
      padding: 0 6px;
    }
  }

  .option__item.disabled {
    cursor: not-allowed;
  }
}
</style>
