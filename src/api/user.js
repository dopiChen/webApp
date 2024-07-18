import http from '@http/http'
export const _getUserInfo = (errMsg) => http.GET('/api/auth/userInfo', {}, errMsg)

// 登出
export const userLogout = () => http.GET('/api/whitelistSetting/logout')
export const _login = (account) => http.POST('/api/user/login', account)
export const getFinalList = (obj) => http.GET(`api/finalNameList/${obj}`)
export const getFinalListsearch = (keyword, pageNum, pageSize) => http.GET(`api/finalNameList/search/${keyword}/${pageNum}/${pageSize}`, keyword, pageNum, pageSize)
export const _getAllBatches = () => http.GET('/api/batch/AllBatches')
export const getBatchList = (obj) => http.GET('/api/batch/pageList', obj)
export const _creatBatch = (obj) => http.POST('/api/batch/createBatch', obj)
export const _removeBatch = id => http.GET('/api/batch/removeById?id=' + id)
export const _removeBatchs = obj => http.POST('/api/batch/removeByIds', obj)
export const _getPersonnel = (obj) => http.GET('api/personnel/pageList', obj)
export const _selectUnit = (pageNum, pageSize) => http.GET(`/api/peruser/${pageNum}/${pageSize}`, pageNum, pageSize)
export const _getperuser = (unit, pageNum, pageSize) => http.GET(`/api/peruser/${unit}/${pageNum}/${pageSize}`, unit, pageNum, pageSize)
// 向指定手机发送验证码
export const _sendCode = (phone) => http.GET(`/api/user/sendSmsCode/${phone}`, {phone})
// 验证码登录
export const _loginByCode = (codeform) => http.POST('/api/user/loginWithSms', codeform)
export const _postionChange = (username, usertype) => http.POST(`/api/positionChange/changePosition/${username}/${usertype}`, username, usertype)
export const _statusChange = (username, status) => http.POST(`/api/positionChange/changeStatus/${username}/${status}`, username, status)
