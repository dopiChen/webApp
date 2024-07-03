import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import permission from './permission'
import store from '../store/'
import {clearHttpRequestingList} from '@http/httpRequestList'
import routes from './routes'

Vue.$httpRequestList = []
Vue.use(Router)

let router = new Router({
  routes
})
// 路由拦截进行验证
router.beforeEach((to, from, next) => {
  if (to.meta.keepAlive) {
    store.commit('routecache/keepAlive', to.name)
  }
  clearHttpRequestingList()
  // 进度条
  NProgress.start()
  // 获取白名单路由路径在state.js中store\modules\permission\state.js
  const whiteList = store.getters['permission/getWhiteList']
  // 下一个路由在白名单中直接放走
  if (whiteList.indexOf(to.name) > -1 || whiteList.indexOf(to.path) > -1) {
    next()
    // !store.getters['user/getUserId']没有从浏览器获取用户信息
  } else if (!store.getters['user/getUserId']) { // 进行登录验证
    store.dispatch('user/fetchUserInfo').then(res => {
      if (res.status) {
        // 权限校验
        permission(store, routes, to, next)
      } else {
        // 检验用户信息
        switch (res.code) {
          case -500:
            next({name: 'badGateway'})
            break
          case 70005:
            next({name: 'login'})
            break
        }
      }
    })
  } else {
    // 权限校验
    // 从浏览器获取到用户直接进行校验
    permission(store, routes, to, next)
  }
})
router.afterEach(() => {
  NProgress.done()
})
export default router
