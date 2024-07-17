import http from '@http/http'
export const _getUserInfo = (errMsg) => http.GET('/api/auth/userInfo', {}, errMsg)

// 登出
export const userLogout = () => http.GET('/api/whitelistSetting/logout')
export const _login = (account) => http.POST('/api/user/login', account)
export const getFinalList = () => http.GET('/api/finalNameList')
export const _getAllBatches = () => http.GET('/api/batch/AllBatches')
export const _creatBatch = (obj) => http.POST('/api/batch/createBatch', obj)
export const _removeBatch = id => http.GET('/api/batch/removeById?id=' + id)
export const _removeBatchs = obj => http.POST('/api/batch/removeByIds', obj)
export const _getUnit = () => http.GET('api/personnel/unitList')

// 向指定手机发送验证码
export const _sendCode = (phone) => http.GET(`/api/user/sendSmsCode/${phone}`, {phone})
// 验证码登录
export const _loginByCode = (codeform) => http.POST('/api/user/loginWithSms', codeform)
