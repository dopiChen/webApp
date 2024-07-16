import http from '@http/http'

// 获取所有批次
export const _getAllBatches = (params) => http.GET('api/batch/AllBatches', params)
// 获取指定批次的考试信息
export const _getBatch = (id) => http.GET(`api/examination/${id}`, id)
export const _getNamelist = (params) => http.GET('api/approve/detail', params)

// 通过批次关键词搜索
export const _searchBatches = (keyword, parms) => http.GET(`api/batch/searchBatch/${keyword}`, keyword, parms)
// 提交报名
export const _commitSignup = (signup) => http.POST('api/signup/addSignup', signup)
// 通过批次id获取指定批次的详细信息
export const _getBatchDetail = (id) => http.GET(`api/batch/getBatch/${id}`, id)
// 通过考试id获取指定考试信息
export const _getExamDetail = (id) => http.GET(`api/examination/getDetail/${id}`, id)

// 通过用户名查询个人信息
export const _getUserData = (username) => http.GET(`api/personnel/information/${username}`, username)

// 通过老师工号查所有通过的监考记录
export const _getAllComfirm = (username) => http.GET(`api/getComfirm/allComfirms/${username}`, username)

// 通过老师工号考试号确认参加监考

export const _doComfirm = (username, examid) => http.POST(`api/getComfirm/Docomfirm/${username}/${examid}`, username, examid)

// 老师通过考试编号查询已经通过的审批考试
export const _searchComfirm = (username, examid) => http.GET(`api/getComfirm/allComfirms/search/${username}/${examid}`, username, examid)

// 老师通过工号查询已经提交的审批
export const _getAllSignUp = (username) => http.GET(`api/signup/getSignup/${username}`, username)
// 老师通过工号和考试编号查询某次提交记录
export const _getOneSignUp = (username, examid) => http.GET(`api/signup/getOneSignup/${username}/${examid}`, username, examid)
// 通知老师有待确认的申请
export const _getAllNotComfirms = (username) => http.GET(`api/getComfirm/allNotComfirms/${username}`, username)

// 获取与老师同院的领导团队
export const _getLeaders = (username) => http.GET(`api/flow/${username}`, username)
