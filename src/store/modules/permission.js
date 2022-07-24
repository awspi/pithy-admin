import { publicRoutes, privateRoutes } from '@/router'
export default {
  namespaced: true,
  state: () => ({
    //路由表 初始拥有静态路由权限
    routes: publicRoutes
  }),
  mutations: {
    setRoutes(state, newRoutes) {
      state.routes = [...publicRoutes, ...newRoutes]
    }
  },
  actions: {
    /**
     * 根据权限筛选路由
     */
    filterRoutes({ commit }, menus) {
      const routes = [] //筛选后 权限名 与 路由的 name 匹配 的路由表数组
      // 路由权限匹配
      menus.forEach((key) => {
        // 权限名 与 路由的 name 匹配
        routes.push(...privateRoutes.filter((item) => item.name === key))
      })
      // 最后添加 不匹配路由进入 404
      //必须要在其他路由指定之后
      routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404'
      })
      commit('setRoutes', routes)
      return routes
    }
  }
}
