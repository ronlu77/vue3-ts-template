import request from '@/utils/request'
import { LoginFormData } from './type'

export function login(data: LoginFormData) {
  return request({
    url: '/user/login',
    method: 'post',
    data,
  })
}
