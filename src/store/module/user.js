import { login } from '@/api/sys'
import md5 from 'md5'
import localCache from '@/utils/storage'
import { TOKEN } from '@/constant/index'
export default {
  namespaced: true,
  state: () => ({
    token: localCache.getItem(TOKEN) || ''
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      localCache.setItem(TOKEN, token)
    }
  },
  actions: {
    login({ commit, dispatch }, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ username: username, password: md5(password) })
          .then((res) => {
            commit('setToken', res.token)
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}
