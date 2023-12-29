import { isObject, isArray } from '@/utils/is'
import {
  isNil,
  isEqual,
  intersectionWith,
  unionWith,
  mergeWith,
} from 'lodash-es'
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

/**
 * 递归合并两个对象
 * @param source 合并的源对象
 * @param target 目标对象，合并后的结果存放
 * @param mergeArrays 如何合并
 *      - "union": 对数组执行并集操作；
 *      - "intersection": 对数组执行交集操作；
 *      - "concat": 链接数组;
 *      - "replace": 目标数组替换原数组。
 * @return 合并后对象
 */

// T , U 未指定特定类型，如果没有继承其他类型相当于 any, 主要用于方法的重构
export function deepMerge<
  T extends object | null | undefined,
  U extends object | null | undefined,
>(
  source: T,
  target: U,
  mergeArrays: 'union' | 'intersection' | 'concat' | 'replace' = 'replace',
): T & U {
  if (!target) {
    return source as T & U
  }
  if (!source) {
    return target as T & U
  }
  return mergeWith({}, source, target, (sourceValue, targetValue) => {
    if (isArray(target) && isArray(source)) {
      switch (mergeArrays) {
        case 'union':
          return unionWith(sourceValue, targetValue, isEqual)
        case 'intersection':
          return intersectionWith(sourceValue, targetValue, isEqual)
        case 'concat':
          return targetValue.concat(sourceValue)
        case 'replace':
          return targetValue
        default:
          console.warn(`Unkown mergeArrays strategy ${mergeArrays as string}.`)
      }
    }
    if (isObject(targetValue) && isObject(sourceValue)) {
      return deepMerge(sourceValue, targetValue, mergeArrays)
    }
    return undefined
  })
}
