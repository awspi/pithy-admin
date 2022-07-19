import localCache from '@/utils/storage'
import { LANG } from '@/constant/'
export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    language: localCache.getItem(LANG) || 'zh'
  }),
  mutations: {
    /**
     * 切换collapse
     */
    triggerSidebar(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    /**
     * 设置国际化
     */
    setLanguage(state, lang) {
      localCache.setItem(LANG, lang)
      state.language = lang
    }
  }
}
