import { createStore } from 'vuex'
import user from './module/user'
import app from './module/app'
import theme from './module/theme'
import getters from './getters'
export default createStore({
  state: {},
  getters,
  mutations: {},
  actions: {},
  modules: { user, app, theme }
})
