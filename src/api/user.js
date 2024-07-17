import http from '@http/http'
export const _getUserInfo = (errMsg) => http.GET('/api/auth/userInfo', {}, errMsg)

// 登出
export const userLogout = () => http.GET('/api/whitelistSetting/logout')
// 分页查询用户
export const batchList = (obj) => http.GET('/api/batch/pageList', obj)

export const _login = (account) => http.POST('/api/user/login', account)
export const getFinalList = () => http.GET('/api/finalNameList')
export const _getAllBatches = () => http.GET('/api/batch/AllBatches')

// 向指定手机发送验证码
export const _sendCode = (phone) => http.GET(`/api/user/sendSmsCode/${phone}`, {phone})
// 验证码登录
export const _loginByCode = (codeform) => http.POST('/api/user/loginWithSms', codeform)
