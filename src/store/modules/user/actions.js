import {_getUserInfo} from '@api/user'
import types from './types'

export default {
  async fetchUserInfo ({commit}) {
    // 从后端获取当前用户  但是现在没有后端  自己写死一个用户
    let res = await _getUserInfo()
    // let res = {
    //   code: 0,
    //   status: true,
    //   data: {
    //     id: 1,
    //     name: 'clt',
    //     userType: 3
    //   }
    // }
    // 提取信息
    if (res.status) {
      commit(types.SET_USER_ID, res.data.id)
      commit(types.SET_USER_NAME, res.data.name)
      commit(types.SET_USER_TYPE, res.data.userType)
    }
    return res
  },
  async clearUserInfo ({commit}) {
    // 清楚前端用户信息
    commit(types.SET_USER_ID, null)
    commit(types.SET_USER_NAME, null)
    commit(types.SET_USER_TYPE, null)
  },
  // 获取用户类型
  async getUserType ({ dispatch }) {
    const res = await dispatch('fetchUserInfo')
    return res.data.userType
  }
}
