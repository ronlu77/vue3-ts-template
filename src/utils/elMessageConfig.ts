/**
 *  全局配置Message,如需更改Message配置项，可在此处进行
 */
import { ElMessage, ElMessageBox } from 'element-plus'

const arr = ['success', 'warning', 'error']

arr.forEach((type) => {
  ElMessage[type] = (options: string) => {
    if (typeof options === 'string')
      options = { message: options, offset: 60 } as any
    options['type'] = type
    return ElMessage(options)
  }
})
