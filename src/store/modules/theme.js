import localCache from '@/utils/storage'
import variables from '@/styles/variables.module.scss'
import { MAIN_COLOR, DEFAULT_COLOR } from '@/constant'
export default {
  namespaced: true,
  state: () => ({
    mainColor: localCache.getItem(MAIN_COLOR) || DEFAULT_COLOR,
    variables
  }),
  mutations: {
    setMainColor(state, newColor) {
      state.mainColor = newColor
      state.variables.menuBg = newColor
      localCache.setItem(MAIN_COLOR, newColor)
    }
  }
}
