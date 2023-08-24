// 登录接口需要携带参数ts类型
export interface LoginFormData {
  username?: string
  password?: string
}

interface dataType {
  token?: string
  message?: string
}
export interface LoginResponseData {
  code?: number
  data: dataType
}

export interface UserState {
  userinfo: LoginFormData
  token: string
  menuRoutes: any[]
}
