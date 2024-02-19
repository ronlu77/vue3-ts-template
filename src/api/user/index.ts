import request from '@/utils/request'
import { LoginFormData } from './type'

/** 用户登录 */
export function login(data: LoginFormData) {
  return request({
    url: '/login',
    method: 'get',
    data,
  })
}

/** 用户登出 */
export function logout() {
  return request({
    url: '/logout',
    method: 'delete',
  })
}

/** 通过 token 获取用户信息 */
export function getInfo(token) {
  return request({
    url: '/userinfo',
    method: 'get',
    params: { token },
  })
}

/** 模拟用户登录过期 401 */
export function mockUserSesstionTimeout() {
  return request({
    url: '/user/session-timout',
    method: 'get',
  })
}
