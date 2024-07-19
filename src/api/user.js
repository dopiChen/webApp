import http from '@http/http'
export const _getUserInfo = (errMsg) => http.GET('/api/auth/userInfo', {}, errMsg)

// 登出
export const userLogout = () => http.GET('/api/user/whitelistSetting/logout')
export const _login = (account) => http.POST('/api/user/login', account)
export const getFinalListdto = (pageSize, pageNum) => http.GET(`api/finalNameList/dto/${pageSize}/${pageNum}`, pageSize, pageNum)
export const getFinalListsearch = (keyword, pageSize, pageNum) => http.GET(`api/finalNameList/search/${keyword}/${pageSize}/${pageNum}`, keyword, pageSize, pageNum)
export const _getAllBatches = () => http.GET('/api/batch/AllBatches')
export const getBatchList = (obj) => http.GET('/api/batch/pageList', obj)
export const _creatBatch = (obj) => http.POST('/api/batch/createBatch', obj)
export const _removeBatch = id => http.GET('/api/batch/removeById?id=' + id)
export const _removeBatchs = obj => http.POST('/api/batch/removeByIds', obj)
export const _getPersonnel = (obj) => http.GET('api/personnel/pageList', obj)
export const _getEms = (pageNum, pageSize, examName) => http.GET(`/api/examination/${pageNum}/${pageSize}/${examName}`, pageNum, pageSize, examName)
export const _getEms1 = (pageNum, pageSize) => http.GET(`/api/examination/${pageNum}/${pageSize}`, pageNum, pageSize)
export const _selectUnit = (pageNum, pageSize) => http.GET(`/api/peruser/${pageNum}/${pageSize}`, pageNum, pageSize)
export const _getperuserdto = (unit, pageNum, pageSize) => http.GET(`/api/peruser/dto/${unit}/${pageNum}/${pageSize}`, unit, pageNum, pageSize)
// 向指定手机发送验证码
export const _sendCode = (phone) => http.GET(`/api/user/sendSmsCode/${phone}`, {phone})
// 验证码登录
export const _loginByCode = (codeform) => http.POST('/api/user/loginWithSms', codeform)
// 获取用户头像
export const _getUserAvatar = (username) => http.GET(`/api/file/get/avatar/${username}`, username)
export const _postionChange = (username, usertype) => http.POST(`/api/positionChange/changePosition/${username}/${usertype}`, username, usertype)
export const _statusChange = (username, status) => http.POST(`/api/positionChange/changeStatus/${username}/${status}`, username, status)
