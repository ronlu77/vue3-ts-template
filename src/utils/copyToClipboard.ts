import { ElMessage } from 'element-plus'

/** 原生JS实现复制（目前只支持文本） */
export function copyContent(content: any) {
  const type = 'text/plain' // 目前只考虑了复制文本的情况
  const blob = new Blob([content], { type })
  const data = [new ClipboardItem({ [blob.type]: blob })]
  navigator.clipboard.write(data).then(
    () => {
      ElMessage.success('已成功复制进剪切板!')
    },
    (error) => {
      ElMessage.error('复制失败' + error)
    },
  )
}
