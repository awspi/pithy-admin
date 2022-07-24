import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '@/layout/index.vue'
import store from '@/store'
//
import UserManageRouter from './modules/UserManage'
import RoleListRouter from './modules/RoleList'
import PermissionListRouter from './modules/PermissionList'
import ArticleRouter from './modules/Article'
import ArticleCreaterRouter from './modules/ArticleCreate'

/**
 * 私有路由表
 */
export const privateRoutes = [
  UserManageRouter,
  RoleListRouter,
  PermissionListRouter,
  ArticleRouter,
  ArticleCreaterRouter
]

/**
 *公开路由表
 */
export const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/',
    // 注意：带有路径“/”的记录中的组件“默认”是一个不返回 Promise 的函数
    component: layout,
    redirect: '/profile',
    children: [
      //个人中心
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index'),
        meta: {
          title: 'profile',
          icon: 'profile'
        }
      },
      //404
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404')
      },
      //401
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401')
      }
    ]
  }
]

// 1. 获取 **权限数据**
// 2. **私有路由表** <u>不再被直接</u>加入到 `routes` 中
// 3. 利用 [addRoute API](https://next.router.vuejs.org/zh/api/#addroute) 动态添加路由到 **路由表** 中
const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
})
/**
 * 初始化路由表
 */
export function resetRouter() {
  console.log(store.getters.userInfo)
  if (
    store.getters.userInfo &&
    store.getters.userInfo.permission &&
    store.getters.userInfo.permission.menus
  ) {
    //删除动态添加的路由
    const menus = store.getters.userInfo.permission.menus
    menus.forEach((menu) => {
      router.removeRoute(menu)
    })
  }
}
export default router
