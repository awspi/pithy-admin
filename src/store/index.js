import { createStore } from 'vuex'
import user from './module/user'
import app from './module/app'
import getters from './getters'
export default createStore({
  state: {},
  getters,
  mutations: {},
  actions: {},
  modules: { user, app }
})
