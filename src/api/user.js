import http from '@http/http'
export const _getUserInfo = (errMsg) => http.GET('/api/auth/userInfo', {}, errMsg)

export const _login = (acconut) => http.POST('/api/user/login', acconut)
