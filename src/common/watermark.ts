/**
 *  通过canvas实现前端水印效果，并没有什么大作用，可以在浏览器控制台删除, 但是可以定制化
 */
const id = 'watermark2023.10.31'

function initWatermark(str: string): string {
  if (document.getElementById(id) !== null) {
    removeWatermark()
  }
  const rotate = -20
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  canvas.width = 220
  canvas.height = 180
  ctx.font = '16px normal'
  ctx.rotate((rotate * Math.PI) / 180)
  ctx.fillStyle = 'rgba(200, 200, 200, 0.70)'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(str, canvas.width / 3, canvas.height / 2)
  const div = document.createElement('div')
  div.id = id
  div.setAttribute(
    'style',
    `
      position: fixed;
      top: 0;
      left: 0;
      opacity: 0.6;
      z-index: 999;
      pointer-events: none;
      width: ${document.documentElement.clientWidth}px;
      height: ${document.documentElement.clientHeight}px;
      background: url(${canvas.toDataURL('image/png')}) repeat;
    `,
  )
  document.body.appendChild(div)
  return id
}

/** 设置水印 */
export const setWatermark = (str: string) => {
  let id = initWatermark(str)
  if (document.getElementById(id) === null) {
    id = initWatermark(str)
  }
}

/** 移除水印 */
export const removeWatermark = () => {
  const box = document.getElementById(id) as HTMLElement
  if (box !== null) {
    // document.body.removeChild(box)
    box?.parentNode?.removeChild(box)
  }
}
