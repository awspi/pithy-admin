import localCache from '@/utils/storage'
import { LANG, TAGS_VIEW } from '@/constant/'
export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    language: localCache.getItem(LANG) || 'zh',
    tagsViewList: localCache.getItem(TAGS_VIEW) || []
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
    },
    /**
     * 添加tags
     * (不能重复)
     */
    addTagsViewList(state, tag) {
      const isFind = state.tagsViewList.find((item) => {
        return item.path === tag.path
      })
      if (!isFind) {
        state.tagsViewList.push(tag)
        localCache.setItem(TAGS_VIEW, state.tagsViewList)
      }
    },

    /**
     * 为指定的 tag 修改 title
     */
    changeTagsView(state, { index, tag }) {
      state.tagsViewList[index] = tag
      localCache.setItem(TAGS_VIEW, state.tagsViewList)
    },
    /**
     * 删除 tag
     * @param {type: 'other'||'right'||'index'} payload
     */
    removeTagsView(state, { type, index }) {
      switch (type) {
        case 'others':
          state.tagsViewList = [state.tagsViewList[index]]
          break
        case 'index':
          state.tagsViewList.splice(index, 1)
          break
        case 'right':
          state.tagsViewList.splice(
            index + 1,
            state.tagsViewList.length - index + 1
          )
          break
      }
      localCache.setItem(TAGS_VIEW, state.tagsViewList)
    }
  }
}
