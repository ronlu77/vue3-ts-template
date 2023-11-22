<template>
  <tooltip
    ref="tooltipRef"
    v-if="showTooltip"
    :effect="tooltipEffect"
    :min-width="tooltipMinWidth"
    :position="tooltipPosition"
  >
    <template #tooltip>
      <slot name="tooltip"></slot>
    </template>
    <div class="ellipsis-text__wrapper has__tooltip" v-bind="$attrs">
      <input class="exp" type="checkbox" :id="expId" />
      <div ref="textRef" class="ellipsis-text__main" :class="model">
        <label
          v-if="hasExpand"
          class="btn"
          :for="expId"
          @click="updateTooltipStatus"
        ></label>
        <label v-else-if="model == 'multiline'" class="ellipsis"></label>
        <slot>{{ content }}</slot>
      </div>
    </div>
  </tooltip>
  <div v-else class="ellipsis-text__wrapper" v-bind="$attrs">
    <input class="exp" type="checkbox" :id="expId" />
    <div ref="textRef" class="ellipsis-text__main" :class="model">
      <label v-if="hasExpand" class="btn" :for="expId"></label>
      <label v-else-if="model == 'multiline'" class="ellipsis">...</label>
      <slot>{{ content }}</slot>
    </div>
  </div>
</template>
<script setup lang="ts" name="EllipsisText">
import {
  ref,
  withDefaults,
  onMounted,
  computed,
  watchEffect,
  getCurrentInstance,
} from 'vue'

interface Props {
  model?: string
  maxWidth?: string | number
  line?: number
  expand?: boolean
  content?: string
  tooltip?: boolean
  tooltipEffect?: string
  tooltipPosition?: string
  tooltipMinWidth?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  model: 'single',
  expand: false,
  line: 3,
  maxWidth: '600px',
  tooltip: true,
  content: '',
  tooltipEffect: 'dark',
  tooltipMinWidth: 220,
  tooltipPosition: 'top',
})

const LINE_HEIGHT = 20 // 设置文本域默认行高
const textRef = ref<HTMLElement>(null)
const tooltipRef = ref()
const expId = ref<string>('exp__' + new Date().getTime()) // 生成唯一的 id
const useMaxWidth = computed(() =>
  typeof props.maxWidth == 'number' ? props.maxWidth + 'px' : props.maxWidth,
).value
const maxHeight = ref<string>(LINE_HEIGHT * props.line + 'px') // 文本域最大高度
const hasExpand = ref<boolean>(false) // 多行省略模式下是否使用折叠展开功能
const showTooltip = ref<boolean>()

watchEffect(() => {
  showTooltip.value = props.tooltip
})

/** 初始化文本内容对象 */
function initTextRef(): void {
  if (props.model === 'single') {
    textRef.value.style.maxWidth = useMaxWidth
  } else {
    hasExpand.value = props.expand && determineEllipsis()
  }
}

/** 判断是否发生省略 */
function determineEllipsis(): boolean {
  return props.model === 'single'
    ? textRef.value.scrollWidth > textRef.value.clientWidth
    : textRef.value.scrollHeight > textRef.value.clientHeight
}

/** 跟新tooltip状态 */
function updateTooltipStatus(): void {
  setTimeout(() => {
    const updateStatus = tooltipRef.value.updateStatus
    updateStatus(determineEllipsis())
  }, 200)
}

onMounted(() => {
  initTextRef()
})

defineExpose({})
</script>
<style lang="scss" scoped>
.ellipsis-text__wrapper {
  display: flex; // 使用flex 子项 100% 才能获取到高度
  padding: 4px 8px;

  .exp {
    display: none;

    &:checked + .ellipsis-text__main {
      // max-height: none;
      // https://github.com/chokcoco/iCSS/issues/91?fileGuid=XtpJhGpvWxj6qcTr (通过设置max-height实现过渡效果)
      max-height: 200px;

      .btn::after {
        content: '折叠';
      }

      .btn::before {
        content: '';
      }
    }
  }

  .ellipsis-text__main {
    // overflow: hidden;
    max-height: v-bind(maxHeight);
    transition: max-height 300ms ease;
    // text-align: justify;

    // 单行省略
    &.single {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    // 多行省略
    &.multiline {
      overflow: hidden;
      text-align: justify;
      line-height: 20px;

      .ellipsis::after {
        content: '...';
        float: right;
        clear: both;
      }
    }

    &::before {
      float: right;
      content: '';
      height: 100%;
      margin-bottom: -20px; //! 等价于 calc(100% - 20px) 这样写性能更好
    }

    .btn {
      float: right;
      color: $active-color;
      cursor: pointer;
      clear: both;
    }

    .btn::after {
      content: '展开';
    }

    .btn::before {
      content: '...';
      transform: translateX(-100%);
      text-align: justify;
    }
  }
}

.ellipsis-text__wrapper.has__tooltip {
}
</style>
