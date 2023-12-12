/** 图片预览指令, wheel 滚动事件关联图片放缩, 抽离出 mask preview-image css */
export default {
  mounted(el, binding) {
    const mask = document.createElement('div')
    const cloneImg = el.cloneNode()
    const MAX_SCALE = 3
    const MIN_SCALE = 0.2
    let maxScaleWidth = MAX_SCALE * cloneImg.clientWidth
    let minScaleWidth = MIN_SCALE * cloneImg.clientWidth

    const scaleImage = (deltaY: number) => {
      const scale = 1 + deltaY
      const width = cloneImg.clientWidth * scale
      const height = cloneImg.clientHeight * scale
      if (maxScaleWidth <= width || minScaleWidth >= width) return
      cloneImg.setAttribute(
        'style',
        `
        width: ${width}px;
        height: ${height}px;
      `,
      )
    }
    el.setAttribute('style', `cursor: pointer;`)
    el.addEventListener('click', () => {
      mask.classList.add('mask')
      cloneImg.classList.add('preview-image')
      document.body.appendChild(mask)
      mask.appendChild(cloneImg)
      maxScaleWidth = MAX_SCALE * cloneImg.clientWidth
      minScaleWidth = MIN_SCALE * cloneImg.clientWidth
    })
    mask.addEventListener('click', () => {
      document.body.removeChild(mask)
    })
    // esc 键可以退出预览模式
    window.addEventListener('keyup', (event) => {
      event.stopPropagation()
      if (event.key === 'Escape') {
        document.body.removeChild(mask)
      }
    })
    // 鼠标滚轮事件关联预览图片的放缩
    window.addEventListener('wheel', (event) => {
      const deltaY = event.deltaY
      if (deltaY > 0) {
        scaleImage(-0.1)
      } else {
        scaleImage(0.1)
      }
    })
  },
}
