//快捷访问 getters相当于是vuex中的计算属性
const getters = {
  token: (state) => state.user.token
}
export default getters
