import request from '@/utils/request'

export function gainBrandList(data) {
  return request({
    url: '/brand/brand-data-list',
    method: 'get',
    data,
  })
}
