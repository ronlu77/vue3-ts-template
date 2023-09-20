import throttle from './throttle'

export default (app: any) => {
  app.directive('throttle', throttle)
}
