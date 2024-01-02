/** 存放判断类型方法 */
const toString = Object.prototype.toString

export const is = (val: unknown, type: string): boolean => {
  return toString.call(val) === `[object ${type}]`
}

export const isNumber = (val: unknown): val is number => {
  return is(val, 'Number')
}

/** 判断点击dom 是否包含在另一个dom中
 *  @param node {HTMLElement}: 点击项
 *  @param container {HTMLElement}: 包含项
 *  @return {boolean}
 */
export const isPageNode = (node: any, container: any): boolean => {
  return node === container ? true : container.contains(node)
}

/** 判断是否为外部链接 */
export const isExtrernalLink = (path: string): boolean => {
  return /^http(s)?:|milto:|tel:/.test(path)
}

/** 是否为固定标签 */
export const isAffix = (route: any): boolean => {
  return route.meta && route.meta.affix
}

export const isObject = (val: any): boolean => {
  return val !== null && is(val, 'object')
}

export const isArray = (val: any): boolean => {
  return val && Array.isArray(val)
}

export const isRedirectPath = (path: string): boolean => {
  const regexp = /^\/redirect/
  return regexp.test(path)
}
