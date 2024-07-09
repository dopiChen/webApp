import http from '@http/http'
export const _getAllBatches = (params) => http.GET('api/batch/all', params)
export const _getBatch = (id) => http.GET(`api/examination/${id}`, id)
export const _getNamelist = (params) => http.GET('api/approve/detail', params)
