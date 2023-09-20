/** 存放公用方法 */
/** 判断点击dom 是否包含在另一个dom中
 *  node: 点击项
 *  container: 包含项
 */
export const isPageNode = (node: any, container: any) => {
  console.log('test', node, container)
  return node === container ? true : container.contains(node)
}
