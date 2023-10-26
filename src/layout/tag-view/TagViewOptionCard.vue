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
      @click="handleTagOption('close_left')"
    >
      <SvgIcon class="svg-icon__item" name="" size="16"></SvgIcon>
      <span>关闭左侧标签页</span>
    </li>
    <li
      class="option__item close_right"
      :class="{ disabled: disabledProps.isCloseRight }"
      @click="handleTagOption('close_right')"
    >
      <SvgIcon class="svg-icon__item" name="" size="16"></SvgIcon>
      <span>关闭右侧标签页</span>
    </li>
    <li
      class="option__item close_other"
      :class="{ disabled: disabledProps.isCloseOther }"
      @click="handleTagOption('close_other')"
    >
      <SvgIcon class="svg-icon__item" name="" size="16"></SvgIcon>
      <span>关闭其他标签页</span>
    </li>
    <li
      class="option__item close_all"
      :class="{ disabled: disabledProps.isCloseAll }"
      @click="handleTagOption('close_all')"
    >
      <SvgIcon class="svg-icon__item" name="" size="16"></SvgIcon>
      <span>关闭全部标签页</span>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { ref, reactive, watch, getCurrentInstance, onMounted } from 'vue'
import useTagViewsStore from '@/store/modules/tagViews'
import { useRoute } from 'vue-router'

const { proxy } = getCurrentInstance()
const route = useRoute()
const tagViewsStore = useTagViewsStore()
const emit = defineEmits(['closeCard'])
const disabledPropsInit = () => ({
  isClose: false,
  isCloseLeft: false,
  isCloseRight: false,
  isCloseOther: false,
  isCloseAll: false,
})
const disabledProps = reactive(disabledPropsInit())

// todo 目前没有判断其他tag 使用 affix 情况
function setOptionCardDisabled() {
  Object.assign(disabledProps, disabledPropsInit())
  const activeTagViewIndex: number = tagViewsStore.getActiveTagViewIndex(route)
  const tagViewListLength: number = tagViewsStore.tagViewList.length
  if (activeTagViewIndex == tagViewListLength - 1) {
    disabledProps.isCloseRight = true
  }
  if (activeTagViewIndex <= 1) {
    disabledProps.isCloseLeft = true
  }
  if (route.meta && route.meta.affix) {
    disabledProps.isClose = true
  }
  if (tagViewListLength === 1) {
    disabledProps.isCloseLeft = true
    disabledProps.isCloseRight = true
    disabledProps.isCloseOther = true
    disabledProps.isCloseAll = true
  }
}

// todo 此处判断监听卡片是否能够进行操作过于冗余，后期更改
watch(
  () => tagViewsStore.tagViewList,
  () => {
    setOptionCardDisabled()
  },
  { deep: true },
)

watch(route, () => {
  setOptionCardDisabled()
})

// 标签操作卡
function handleTagOption(type = '') {
  switch (type) {
    case 'refresh':
      tagViewsStore.refreshPage(route)
      emit('closeCard', false)
      break
    case 'close':
      if (disabledProps.isClose) return
      tagViewsStore.closeCurrentTagView(route)
      emit('closeCard', false)
      break
    case 'close_left':
      if (disabledProps.isCloseLeft) return
      tagViewsStore.closeLeftTagView(route)
      emit('closeCard', false)
      break
    case 'close_right':
      if (disabledProps.isCloseRight) return
      tagViewsStore.closeRightTagView(route)
      emit('closeCard', false)
      break
    case 'close_other':
      if (disabledProps.isCloseOther) return
      tagViewsStore.closeOtherTagView(route)
      emit('closeCard', false)
      break
    case 'close_all':
      if (disabledProps.isCloseAll) return
      tagViewsStore.closeAllTagView()
      emit('closeCard', false)
      break
    default:
      return false
  }
}

onMounted(() => {
  setOptionCardDisabled()
})
</script>
<style lang="scss" scoped>
.option-warpper {
  font-size: 14px;
  border-radius: 6px;
  box-shadow: 0 0 6px rgba($color: #000000, $alpha: 0.3);
  background: #fff;

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
