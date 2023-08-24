/** 存放检验api */

/** 判断是否为外部链接 */
export function isExtrernalLink(path) {
  return /^http(s)?:|milto:|tel:/.test(path)
}
