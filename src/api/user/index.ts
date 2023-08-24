import request from '@/utils/request'
import { LoginFormData } from './type'

export function login(data: LoginFormData) {
  return request({
    url: '/login',
    method: 'get',
    data,
  })
}
