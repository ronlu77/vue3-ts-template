<template>
  <div class="tooltip__wrapper">
    <div
      v-show="showTooltip"
      ref="tooltipRef"
      class="tooltip__main"
      :class="[effect, { active: isActive }]"
      @mouseenter="onShow"
      @mouseleave="onHide"
    >
      <slot name="tooltip">{{ content || tooltipContent }}</slot>
    </div>
    <div
      ref="innerRef"
      class="tooltip__inner"
      @mouseenter="onShow"
      @mouseleave="onHide"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts" name="Tooltip">
import {
  ref,
  getCurrentInstance,
  withDefaults,
  onMounted,
  nextTick,
  computed,
} from 'vue'

interface Props {
  minWidth?: number | string
  effect?: string
  position?: string
  content?: string
}

const { proxy } = getCurrentInstance()
const props = withDefaults(defineProps<Props>(), {
  minWidth: '220px',
  effect: 'dark', // 可选项：'dark', 'light'
  position: 'top', // 触发位置可选项： 'top', 'bottom'
})
const useMinWidth = computed(() =>
  typeof props.minWidth === 'number' ? props.minWidth + 'px' : props.minWidth,
).value
const tooltipRef = ref<HTMLElement>()
const isActive = ref<boolean>(false)
const tooltipContent = ref<string>('')
const showTooltip = ref<boolean>(true)
let timer = null // 延迟器

/** 更新tooltip位置 */
function updateTooltipPosition(): void {
  nextTick(() => {
    const inner = proxy.$refs.innerRef as HTMLElement
    const tooltip = proxy.$refs.tooltipRef as HTMLElement
    let offsetTop = 0
    let offsetLeft = 0
    // 获取包含元素 innerText
    tooltipContent.value = inner.innerText
    switch (props.position) {
      case 'top':
        offsetTop = -1 * tooltip.clientHeight
        break
      case 'bottom':
        offsetTop = inner.clientHeight
        break
      default:
        console.warn('tooltip "position" has selections -> ["top", "bottom"].')
    }
    tooltip.style.top = offsetTop + 'px'
    tooltip.style.left = offsetLeft + 'px'
    tooltip.style.minWidth = useMinWidth
  })
}

function onShow(): void {
  clearTimeout(timer)
  updateTooltipPosition()
  isActive.value = true
  tooltipRef.value.style.visibility = 'visible'
}

function onHide(): void {
  // 离开隐藏tooltip需要设置延迟
  timer = setTimeout(() => {
    isActive.value = false
    tooltipRef.value.style.visibility = 'hidden'
  }, 200)
}

/** 对外暴露方法，控制是否显示tooltip */
function updateStatus(val: boolean) {
  showTooltip.value = val
}

onMounted(() => {
  updateTooltipPosition
})

defineExpose({
  updateStatus,
})
</script>

<style lang="scss" scoped>
.light {
  color: #424242;
  background: #fff;
}

.dark {
  color: #b3b3b3;
  background: #000000;
}

.tooltip__wrapper {
  position: relative;
  z-index: 99;
}

.tooltip__main {
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
  border-radius: 4px;
  padding: 4px 8px;
  opacity: 0.75;
  transform: scale(0.8);
  z-index: 999;
}

.tooltip__main.active {
  transform: scale(1);
  transition: transform 300ms ease;
}
</style>
