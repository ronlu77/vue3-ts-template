import { isNil } from 'lodash-es'
/**
 * 根据唯一的key查询数组中对象第一次出现的下标
 * @param {array} list 查询数组
 * @param {object} node 目标对象
 * @param {string} key  查询关键字
 * @returns {number}
 */
export function findNodeIndex(list: any[], node: any, key: string): number {
  let _index = -1
  let _has = false
  if (!node[key]) {
    console.warn('[Function]findNodeIndex: "node" must have property ("key")!')
    return undefined
  }
  if (!list.length) return _index
  while (_index + 1 < list.length) {
    if (isNil(list[_index + 1][key])) continue
    if (list[_index + 1][key] === node[key]) {
      _has = true
      break
    }
    _index++
  }
  return _has ? _index + 1 : -1
}
