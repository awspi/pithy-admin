import { createStore } from 'vuex'
import user from './module/user'
import getters from './getters'
export default createStore({
  state: {},
  getters,
  mutations: {},
  actions: {},
  modules: { user }
})
