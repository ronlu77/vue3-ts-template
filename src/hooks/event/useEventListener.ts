import { useDebounceFn, useThrottleFn } from '@vueuse/core'
import type { Ref } from 'vue'
import { ref, watch, unref } from 'vue'

export type RemoveEventFn = () => void

export interface UseEventParams {
  el?: Element | Ref<Element | undefined> | Window | any
  name: string
  listener: EventListener
  options?: boolean | AddEventListenerOptions
  autoRemove?: boolean
  isDebounce?: boolean
  wait?: number
}

// addEventListener(event, callback, options/useCapture)

export function useEventListener({
  el = window,
  name,
  listener,
  options,
  autoRemove = true,
  isDebounce = true,
  wait = 60,
}: UseEventParams): { removeEvent: RemoveEventFn } {
  /* eslint-disable-next-line */
  let remove: RemoveEventFn = () => {}
  const isAddRef = ref(false) // 开关，如果当前 el 存在了时间监听器，则不可再添加

  if (el) {
    const element = ref(el as Element)
    const handler = isDebounce
      ? useDebounceFn(listener, wait)
      : useThrottleFn(listener, wait)
    const realHandler = wait ? handler : listener
    const removeEventListener = (e: Element) => {
      isAddRef.value = true
      e.removeEventListener(name, realHandler, options)
    }
    const addEventListener = (e: Element) =>
      e.addEventListener(name, realHandler, options)

    //* watch 方法返回的是一个销毁方法, 监听当前 el 是否发生变化，当 el 销毁时， 会触发 watch 方法
    const removeWatch = watch(
      element,
      (v, _ov, cleanUp) => {
        console.log('el 改变', v, isAddRef.value)
        if (v) {
          !unref(isAddRef) && addEventListener(v)
          //! cleanUp 方法会在回调函数再次执行之前执行, 用来清除副作用
          cleanUp(() => {
            console.log('cleanUp trigger')
            autoRemove && removeEventListener(v)
          })
        }
      },
      { immediate: true },
    )

    remove = () => {
      removeEventListener(element.value)
      removeWatch()
    }
  }
  return { removeEvent: remove }
}
