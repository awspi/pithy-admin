import { login, getUserInfo } from '@/api/sys'
import md5 from 'md5'
import localCache from '@/utils/storage'
import { TOKEN } from '@/constant/index'
import router, { resetRouter } from '@/router'
import { setTimeStamp } from '@/utils/auth'
export default {
  namespaced: true,
  state: () => ({
    token: localCache.getItem(TOKEN) || '',
    userInfo: {}
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      localCache.setItem(TOKEN, token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    /**
     * 请求登录
     * @param {*} param0
     * @param {*} userInfo
     * @returns
     */
    login({ commit }, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ username: username, password: md5(password) })
          .then((res) => {
            commit('setToken', res.token)
            //跳转
            router.push('/')
            //设置时间戳
            setTimeStamp()
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    logout({ commit }) {
      resetRouter()
      //
      commit('setToken', '')
      commit('setUserInfo', {})
      // localCache.clear()
      localCache.removeItem('token')
      localCache.removeItem('timestamp')
      localCache.removeItem('tagsView')
      localCache.removeItem('mock-token')
      router.push('/login')
    },
    /**
     * 获取用户信息
     */
    async getUserInfo({ commit }, userInfo) {
      const res = await getUserInfo()
      commit('setUserInfo', res)
      console.log(res)
      return res
    }
  }
}
