import http from '@http/http'
export const _getAllBatches = (errMsg) => http.GET('/batch/all', {}, errMsg)
