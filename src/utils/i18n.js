import i18n from '@/i18n'
import store from '@/store'
import { watch } from 'vue'
/**
 * 将 title 转化为国际化内容
 * @param {*} title
 * @returns
 */
export const generateTitle = (title) => {
  return i18n.global.t(`msg.route.${title}`)
}
/**
 *监听语言变化
 * @param  {...any} cbs 所有的回调
 */
export const watchSwitchLang = (...cbs) => {
  watch(
    () => store.getters.language,
    () => {
      cbs.forEach((cb) => cb())
    }
  )
}
