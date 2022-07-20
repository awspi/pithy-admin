import i18n from '@/i18n'
import path from 'path'
/**
 * 筛选出可供搜索的路由对象
 * @param routes 路由表
 * @param basePath 基础路径，默认为 /
 * @param prefixTitle
 */
export const generateRoutes = (routes, basePath = '/', prefixTitle = []) => {
  //创建result数据
  let result = []
  for (const route of routes) {
    //创建path和title的data

    const data = {
      path: path.resolve(basePath, route.path),
      title: [...prefixTitle]
    }
    // 当前存在 meta 时，使用 i18n 解析国际化数据，组合成新的 title 内容
    // 动态路由不允许被搜索
    const re = /.*\/:.*/ // 匹配动态路由的正则
    if (route.meta && route.meta.title && !re.exec(route.path)) {
      const i18nTitle = i18n.global.t(`msg.route.${route.meta.title}`)
      data.title = [...data.title, i18nTitle]
      result.push(data)
    }
    // 存在 children 时，迭代调用
    if (route.children) {
      const tempRoutes = generateRoutes(route.children, data.path, data.title)
      if (tempRoutes.length > 0) {
        result = [...result, ...tempRoutes]
      }
    }
  }
  return result
}
