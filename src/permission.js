import router from '@/router'
import store from '@/store'

/**
 * 白名单
 */
const whiteList = ['/login']
/**
 * 路由前置守卫
 */
router.beforeEach((to, from, next) => {
  // 1.存在 token ，进入主页
  // getters快捷访问
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
  //2.// 没有token的情况下，可以进入白名单
})
