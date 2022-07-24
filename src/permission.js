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
      //如果有用户数据,则获取userInfo
      if (!store.getters.hasUserInfo) {
        const { permission } = await store.dispatch('user/getUserInfo')
        console.log(permission.menus)
        //处理用户权限
        const filterRoutes = await store.dispatch(
          'permission/filterRoutes',
          permission.menus
        )
        // 利用 addRoute 循环添加
        filterRoutes.forEach((item) => {
          router.addRoute(item)
        })
        // 添加完动态路由之后，需要在进行一次主动跳转才能生效
        return next(to.path)
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
