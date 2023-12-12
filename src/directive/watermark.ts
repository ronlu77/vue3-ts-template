// 通过自定义指令实现图片水印添加
//? 解决通过路径获取本地水印图片无法使用
import watermark from '@/assets/images/watermark.png'

export default {
  mounted(el: HTMLElement): any {
    // 只有图片元素才会有效
    el.onload = function () {
      const { clientHeight, clientWidth, parentElement } = el
      const markContainer: HTMLElement = document.createElement('div')
      const markImg: HTMLElement = document.createElement('div')
      // 如果是外部引入则通过定义img_url获取 watermark
      // const img_url = '~@/assets/images/watermark.png'

      markContainer.className = 'watermark__container'
      markImg.className = 'watermark-img'
      markContainer.setAttribute(
        'style',
        `
          display: inline-block;
          overflow: hidden; 
          position: relative; 
          width: ${clientWidth}px; 
          height: ${clientHeight}px;
        `,
      )
      markImg.setAttribute(
        'style',
        `
          display: inline-block; 
          position: absolute; 
          z-index: 1; 
          background-image: url(${watermark}); 
          background-repeat: repeat; 
          width: 100%; 
          height: 100%; 
          pointer-events: none; 
          opacity: 0.2;
        `,
      )
      markContainer.appendChild(markImg)
      parentElement?.insertBefore(markContainer, el)
      markContainer.appendChild(el)
    }
  },
}
