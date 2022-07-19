import path from 'path'

/**
 * 返回所有的子集路由
 */
const getChildRoutes = (routes) => {
  const result = []
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}
/**
 * 处理脱离层级的路由
 * 例如{path: '/user/manage', redirect: undefined, name: undefined, meta: {…}, aliasOf: undefined, …} 不应该存在,是属于user下的
 *
 */
export const filterRouters = (routes) => {
  //获取所有的子集路由
  //查重删除
  const childRoutes = getChildRoutes(routes)
  //filter() 方法创建一个新数组，其包含通过所提供函数实现的测试的所有元素。
  return routes.filter((route) => {
    //返回不重复的路由
    //find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
    //!取反
    return !childRoutes.find((childRoute) => {
      return childRoute.path === route.path //返回重复的路由
    })
  })
}

function isNull(data) {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
}

/**
 *根据routes(filteRoutes)数据 返回对应的menu规则数据
 */

export const generateMenus = (routes, basePath = '') => {
  const result = []
  routes.forEach((item) => {
    // 不存在 children && 不存在 meta 直接 return
    if (isNull(item.meta) && isNull(item.children)) return
    // 存在 children 不存在 meta，进入迭代
    if (!isNull(item.children) && isNull(item.meta)) {
      result.push(...generateMenus(item.children))
    }
    // 存在 meta 不存在children
    // 合并 path 作为跳转路径
    const routePath = path.resolve(basePath, item.path)
    // 路由分离之后，存在同名父路由的情况，需要单独处理
    let route = result.find((item) => item.path === routePath)
    //当前路由尚未加入到reslut
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }
      // icon 与 title 必须全部存在
      if (route.meta.icon && route.meta.title) {
        // meta 存在生成 route 对象，放入 arr
        result.push(route)
      }
    }
    // 存在 children 进入迭代到children
    if (item.children) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })
  //移除value为空的key
  const temp = JSON.stringify(result, (key, value) => {
    if (!isNull(value)) {
      return value
    }
  })
  return JSON.parse(temp)
}
