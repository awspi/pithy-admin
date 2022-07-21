//快捷访问 getters相当于是vuex中的计算属性
import { generateColors } from '@/utils/theme'
import { MAIN_COLOR } from '@/constant'
import localCahe from '@/utils/storage'
const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  /**
   *
   * @param {*} state
   * @returns  true 表示用户信息已经存在
   */
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  cssVar: (state) => ({
    ...state.theme.variables,
    ...generateColors(localCahe.getItem(MAIN_COLOR))
  }),
  sidebarOpened: (state) => state.app.sidebarOpened,
  language: (state) => state.app.language,
  mainColor: (state) => state.theme.mainColor,
  tagsViewList: (state) => state.app.tagsViewList
}
export default getters
