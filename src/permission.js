import router from '@/router'
import store from '@/store'

/**
 * 白名单
 */
const whiteList = ['/login']
/**
 * 路由前置守卫
 */
router.beforeEach(async (to, from, next) => {
  // 1.存在 token ，进入主页
  // getters快捷访问
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      //如果有token 无userInfo 则获取
      if (!store.getters.hasUserInfo) {
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    //2.没有token的情况下，可以进入白名单
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
