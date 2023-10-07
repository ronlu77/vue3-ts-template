/** 存放判断类型方法 */
const toString = Object.prototype.toString

export const is = (val: unknown, type: string) => {
  return toString.call(val) === `[object ${type}]`
}

export const isNumber = (val: unknown): val is number => {
  return is(val, 'Number')
}

/** 判断点击dom 是否包含在另一个dom中
 *  node: 点击项
 *  container: 包含项
 */
export const isPageNode = (node: any, container: any) => {
  return node === container ? true : container.contains(node)
}
