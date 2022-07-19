import i18n from '@/i18n'

/**
 * 将 title 转化为国际化内容
 * @param {*} title
 * @returns
 */
export const generateTitle = (title) => {
  return i18n.global.t(`msg.route.${title}`)
}
