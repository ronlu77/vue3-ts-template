import type { EChartsOption } from 'echarts'
import type { Ref } from 'vue'
import { ref, unref, computed, nextTick, watch } from 'vue'
import { useAppStore } from '@/store/modules/app'
import echarts from '@/utils/lib/echarts'
import { useEventListener } from '../event/useEventListener'
import { useDebounceFn, useTimeoutFn } from '@vueuse/core'
import { RenderEnum } from '@/enums/appenums'

//#region
// export function useChart(
//   elRef: Ref<HTMLDivElement>,
//   autoResize = true,
//   theme: 'dark' | 'light' | 'default' = 'default',
// ) {
//   const { getSystemDark } = useAppStore()
//   const cacheOptions = ref({}) as Ref<EChartsOption>
//   const getDarkMode = computed(() =>
//     theme === 'default' ? getSystemDark : theme,
//   )
//   const getOptions = computed(() => {
//     if (getDarkMode.value !== 'dark') {
//       return cacheOptions.value as EChartsOption
//     }

//     return {
//       backgroundColor: 'transparent',
//       ...cacheOptions.value,
//     } as EChartsOption
//   })
//   let chartInstance: echarts.ECharts | null = null
//   let resizeFn = resize
//   /* eslint-disable-next-line */
//   let removeResizeFn = () => {}

//   resizeFn = useDebounceFn(resize, 200)

//   function initCharts(t = theme) {
//     const el = unref(elRef)
//     if (!el || !unref(el)) {
//       return
//     }

//     chartInstance = echarts.init(el, t)
//     const { removeEvent } = useEventListener({
//       el: window,
//       name: 'resize',
//       listener: resizeFn,
//     })
//     removeResizeFn = removeEvent
//     // const {} = useBreakpoint
//     // useTimeoutFn(() => {
//     //   resizeFn()
//     // }, 30)
//   }

//   function setOption(options: EChartsOption, clear = true) {
//     cacheOptions.value = options
//     return new Promise((resolve) => {
//       if (unref(elRef)?.offsetHeight === 0) {
//         useTimeoutFn(() => {
//           setOption(unref(getOptions))
//           resolve(null)
//         }, 30)
//       }
//       nextTick(() => {
//         useTimeoutFn(() => {
//           if (!chartInstance) {
//             initCharts(getDarkMode.value as 'default')
//             if (!chartInstance) return
//           }
//           clear && chartInstance?.clear()
//           resolve(null)
//         }, 30)
//       })
//     })
//   }

//   function resize() {
//     chartInstance?.resize({
//       animation: {
//         duration: 300,
//         easing: 'quadraticIn',
//       },
//     })
//   }

//   watch(
//     () => getDarkMode.value,
//     (theme) => {
//       if (chartInstance) {
//         chartInstance.dispose()
//         initCharts(theme as 'default')
//         setOption(cacheOptions.value)
//       }
//     },
//   )

//   function getInstance(): echarts.ECharts | null {
//     if (!chartInstance) {
//       initCharts(getDarkMode.value as 'default')
//     }
//     return chartInstance
//   }

//   return {
//     setOption,
//     resize,
//     echarts,
//     getInstance,
//   }
// }
//#endregion

// todo 目前是最基本的 echart 用法
export function useChart(
  el: HTMLDivElement,
  theme: 'default' | 'dark' | 'light' = 'default',
) {
  let chartInstance: echarts.ECharts | null = null

  function initCharts(t = theme) {
    const element = unref(el)
    if (!element || !unref(element)) {
      return
    }
    chartInstance = echarts.init(el, t)
  }

  function setOption(option: EChartsOption) {
    nextTick(() => {
      if (!chartInstance) {
        initCharts()
      }
      chartInstance.setOption(option)
    })
  }

  function resize() {
    chartInstance?.resize()
  }

  function getInstance(): echarts.ECharts {
    if (!chartInstance) {
      initCharts()
    }
    return chartInstance
  }

  useEventListener({ name: 'resize', listener: resize })

  return {
    getInstance,
    setOption,
  }
}
