<template>
  <div class="navtool-setting-card">
    <div class="navtool-setting-card__top">
      <el-icon class="el-icon__close">
        <Close />
      </el-icon>
      <el-button
        type="primary"
        :icon="Refresh"
        size="small"
        @click="resetTable"
      >
        重置
      </el-button>
    </div>
    <el-divider></el-divider>
    <div class="navtool-setting__main">
      <!-- 使用 el-scrollbar 外层包裹元素要使用固定高度，不能是max-height 或min-height ，否则设置 height="100%" 无效 -->
      <el-scrollbar height="100%">
        <div>
          <draggable
            :list="ulist"
            item-key="dataIndex"
            :scroll="true"
            animation="300"
            handle=".mover"
            @end="onEnd"
          >
            <template #item="{ element, index }">
              <div
                class="item ltable-column-item"
                :class="{ fixed: element[CD.componentProps].fixed }"
              >
                <div class="normal">
                  <svg-icon
                    class="mover"
                    name="draggable"
                    :size="12"
                  ></svg-icon>
                  <!-- v-model 无法直接绑定 v-for 的迭代对象 element -->
                  <el-checkbox
                    v-model="element[CD.display]"
                    :label="element.title"
                    @change="toggleHideColumn"
                  ></el-checkbox>
                </div>
                <svg-icon
                  v-if="showFixedSvgIcon(index)"
                  class="svg-icon__item"
                  :name="setSvgIconName(element)"
                  :size="8"
                  @click="toggleFixedColumn(element, index)"
                ></svg-icon>
              </div>
            </template>
          </draggable>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script setup lang="ts">
import draggable from 'vuedraggable'
import { ref, computed } from 'vue'
import { CD } from '@/utils/schema'
import { Refresh } from '@element-plus/icons-vue'
import { isUndefined } from 'lodash-es'

interface Props {
  list: object[] | any
}

const props = defineProps<Props>()
const emit = defineEmits(['update'])
const ulist = computed(() => props.list).value

const limits = {
  left: -1,
  right: ulist.length,
}
const isEdge = (list, index) => {
  return [0, list.length - 1].includes(index)
}
const setSvgIconName = (element) => {
  const fixedEnum = [true, 'left', 'right']
  if (isUndefined(element[CD.componentProps].fixed)) {
    element[CD.componentProps].fixed = false
  }
  return fixedEnum.includes(element[CD.componentProps].fixed)
    ? 'fixed'
    : 'unfixed'
}
const showFixedSvgIcon = (index) => {
  return isEdge(ulist, index)
    ? true
    : index <= limits.left + 1 || index >= limits.right - 1
}
const isLimitsEdge = (limits, index) => {
  return index == limits.left + 1 || index == limits.right - 1
}

function toggleHideColumn() {
  emit('update', ulist)
}

// 设置固定方向
function toggleFixedColumn(element, index) {
  if (!element[CD.componentProps].fixed) {
    if (index === limits.left + 1) {
      limits.left++
    } else if (index === limits.right - 1) {
      limits.right--
    }
  } else {
    // 全部固定的情况
    const location = indexOfInterval(index, limits)
    if (Math.abs(limits.left - limits.right) === 1) {
      limits.left = index - 1
      limits.right = index + 1
    } else {
      limits[location] = index
    }
  }
  setFixedColumns(ulist, limits)
  emit('update', ulist)
}

/** 如果存在固定项进行排序需要重新设置fixed */
function onEnd({ oldIndex, newIndex }) {
  const oldInterval = indexOfInterval(oldIndex, limits)
  const newInterVal = indexOfInterval(newIndex, limits)
  if (oldInterval !== newInterVal) {
    switch (oldInterval + '__' + newInterVal) {
      case 'left__right': {
        limits.left--
        limits.right--
        break
      }
      case 'left__middle': {
        limits.left--
        ;(isEdge(ulist, newIndex) || isLimitsEdge(limits, newIndex)) &&
          limits.right--
        break
      }
      case 'right__left': {
        limits.left++
        limits.right++
        break
      }
      case 'right__middle': {
        limits.right++
        ;(isEdge(ulist, newIndex) || isLimitsEdge(limits, newIndex)) &&
          limits.left++
        break
      }
      case 'middle__right': {
        limits.right = newIndex + 1
        break
      }
      case 'middle__left': {
        limits.left = newIndex - 1
        break
      }
      default: {
        console.warn('component "NavToolSettingCard" error')
      }
    }
  }
  setFixedColumns(ulist, limits)
  emit('update', ulist)
}

/** 判断下标所属区间, 边界特殊情况 */
function indexOfInterval(index, limits) {
  const { left, right } = limits
  let interval
  if (index <= left) {
    interval = 'left'
  } else if (index < right) {
    interval = 'middle'
  } else {
    interval = 'right'
  }
  return interval
}

/** 根据临界区间设置固定情况 */
function setFixedColumns(list, limits) {
  list.forEach((item, index, arr) => {
    const direaction = indexOfInterval(index, limits)
    arr[index][CD.componentProps].fixed =
      direaction == 'middle' ? false : direaction
  })
}

/** 表格刷新 */
function resetTable() {}
</script>
<style lang="scss" scoped>
.navtool-setting-card {
  min-width: 120px;

  .navtool-setting-card__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    min-height: 46px;
    padding: 5px 10px;
    background: $background-color;

    .el-icon__close {
      color: $text-color;
      font-size: 20px;
    }
  }

  .navtool-setting__main {
    height: 180px;
    max-height: 180px;
  }

  :deep(.el-divider--horizontal) {
    margin: 0;
  }

  .ltable-column-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 4px 6px;

    &:hover {
      background: $hover-color;
      border-radius: 4px;

      .svg-icon__item {
        visibility: visible;
      }
    }

    :deep(.el-checkbox__input.is-checked + .el-checkbox__label) {
      color: $text-color;
    }
  }

  .normal {
    display: flex;
    text-align: left;
    align-items: center;

    .mover {
      cursor: grab;
    }
  }
}

.fixed {
  background: #e6f4ff !important;

  .svg-icon__item {
    visibility: visible;
  }
}

.svg-icon__item {
  cursor: pointer;
  visibility: hidden;

  &:hover {
    background: none;
  }
}
</style>
