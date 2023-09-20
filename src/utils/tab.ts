// 处理全局事件总线
import mitt from 'mitt'

const emitter = mitt()

emitter.on('foo', () => {
  console.log('watch busevent trigger')
})
