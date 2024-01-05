//  点击事件节流自定义指令
export default {
  mounted: (el: HTMLDivElement, binding: any) => {
    const { value: method, arg } = binding
    let isPass = true
    el.addEventListener('click', () => {
      if (!(method instanceof Function))
        return console.error('[v-throttle] must be a function')
      if (isPass) {
        isPass = false
        setTimeout(() => {
          method()
          isPass = true
        }, arg || 1000)
      }
    })
  },
}
