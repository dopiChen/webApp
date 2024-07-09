import http from '@http/http'
export const _getAllBatches = (params) => http.GET('api/batch/all', params)
