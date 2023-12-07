<template>
  <ul class="tag-view-option option-warpper">
    <li class="option__item refresh" @click="handleTagOption('refresh')">
      <SvgIcon class="svg-icon__item" name="refresh" :size="16"></SvgIcon>
      <span>重新加载</span>
    </li>
    <li
      class="option__item close"
      :class="{ disabled: !disabledProps.close }"
      @click="handleTagOption('close')"
    >
      <SvgIcon class="svg-icon__item" name="" size="16"></SvgIcon>
      <span>关闭标签页</span>
    </li>
    <li
      class="option__item close_left"
      :class="{ disabled: !disabledProps.closeLeft }"
      @click="handleTagOption('close_left')"
    >
      <SvgIcon class="svg-icon__item" name="" size="16"></SvgIcon>
      <span>关闭左侧标签页</span>
    </li>
    <li
      class="option__item close_right"
      :class="{ disabled: !disabledProps.closeRight }"
      @click="handleTagOption('close_right')"
    >
      <SvgIcon class="svg-icon__item" name="" size="16"></SvgIcon>
      <span>关闭右侧标签页</span>
    </li>
    <li
      class="option__item close_other"
      :class="{ disabled: !disabledProps.closeOther }"
      @click="handleTagOption('close_other')"
    >
      <SvgIcon class="svg-icon__item" name="" size="16"></SvgIcon>
      <span>关闭其他标签页</span>
    </li>
    <li
      class="option__item close_all"
      :class="{ disabled: !disabledProps.closeAll }"
      @click="handleTagOption('close_all')"
    >
      <SvgIcon class="svg-icon__item" name="" size="16"></SvgIcon>
      <span>关闭全部标签页</span>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { unref, reactive, watch, onMounted, computed } from 'vue'
import useTagViewsStore from '@/store/modules/tagViews'
import { useRoute } from 'vue-router'
import { isAffix } from '@/utils/is'

const route = useRoute()
const tagViewsStore = useTagViewsStore()
const tagViewList = computed(() => tagViewsStore.tagViewList)
const emit = defineEmits(['closeCard'])
const disabledPropsInit = () => ({
  close: true,
  closeLeft: true,
  closeRight: true,
  closeOther: true,
  closeAll: true,
})
const disabledProps = reactive(disabledPropsInit())

/** 根据当前 tagviewList 的情况来判断卡片哪些操作可以启用，考虑了开启 affix 情况 */
function setOptionCardDisabled() {
  Object.assign(disabledProps, disabledPropsInit())
  let affixs = 0 // tagviewlist 中 affix:true 的个数
  const activeTagIndex = tagViewsStore.getActiveTagViewIndex(route)
  const length = unref(tagViewList).length
  // 当前标签开启 affix: true 的情况
  if (route.meta && route.meta.affix) {
    disabledProps.close = false
  }
  if (
    activeTagIndex == length - 1 ||
    isAffix(unref(tagViewList)[activeTagIndex + 1])
  ) {
    disabledProps.closeRight = false
  }
  if (activeTagIndex <= 1 || isAffix(unref(tagViewList)[activeTagIndex - 1])) {
    disabledProps.closeLeft = false
  }
  // 如果 tag 全部都是 affix: true, 关闭全部和关闭其他也不可用
  unref(tagViewList).forEach((item) => isAffix(item) && affixs++)
  if (affixs === length) {
    disabledProps.closeOther = false
    disabledProps.closeAll = false
  }
  // 当前tag affix: false，其他路由为 affix：true ，则无法开启关闭其他功能，
  if (affixs === length - 1 && !isAffix(route)) {
    disabledProps.closeOther = false
  }
}

// tagViewsList中的数量发生意味着需要重新设置当前操作卡片功能开启情况
watch(
  () => tagViewList.value,
  () => {
    setOptionCardDisabled()
  },
  { deep: true },
)

watch(route, () => {
  setOptionCardDisabled()
})

function handleTagOption(type = '') {
  switch (type) {
    case 'refresh':
      tagViewsStore.refreshPage(route)
      emit('closeCard', false)
      break
    case 'close':
      if (!disabledProps.close) return
      tagViewsStore.closeCurrentTagView(route)
      emit('closeCard', false)
      break
    case 'close_left':
      if (!disabledProps.closeLeft) return
      tagViewsStore.closeLeftTagView(route)
      emit('closeCard', false)
      break
    case 'close_right':
      if (!disabledProps.closeRight) return
      tagViewsStore.closeRightTagView(route)
      emit('closeCard', false)
      break
    case 'close_other':
      if (!disabledProps.closeOther) return
      tagViewsStore.closeOtherTagView(route)
      emit('closeCard', false)
      break
    case 'close_all':
      if (!disabledProps.closeAll) return
      tagViewsStore.closeAllTagView(route)
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
