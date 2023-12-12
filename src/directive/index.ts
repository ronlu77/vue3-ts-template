import throttle from './throttle'
import watermark from './watermark'
import preview from './preview'

export default (app: any) => {
  app.directive('preview', preview)
  app.directive('throttle', throttle)
  app.directive('watermark', watermark)
}
