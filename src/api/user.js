import http from '@http/http'
export const _getUserInfo = (errMsg) => http.GET('/api/auth/userInfo', {}, errMsg)

// 登出
export const userLogout = () => http.GET('/api/whitelistSetting/logout')
// 分页查询用户
export const userList = (obj) => http.GET('/api/whitelistSetting/pageList', obj)

export const _login = (account) => http.POST('/api/user/login', account)
