// 登录接口需要携带参数ts类型
interface ResponseUserData {
  code?: number
  message?: string
}

export interface LoginFormData {
  username?: string
  password?: string
}

export interface UserInfoData {
  token?: string
  username?: string
  avatar?: string
}
export interface LoginResponseData extends ResponseUserData {
  data: UserInfoData
}
