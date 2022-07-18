class LocalCache {
  /**
   * 存储数据
   */
  setItem(key, value) {
    //value分两种情况:1.复杂数据类型->转为string 2.简单数据类型 ->直接保存
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    window.localStorage.setItem(key, value)
  }
  /**
   * 获取数据
   */
  getItem(key) {
    const data = window.localStorage.getItem(key)
    try {
      return JSON.parse(data)
    } catch (error) {
      return data
    }
  }
  /**
   * 删除指定数据
   */
  removeItem(key) {
    window.localStorage.removeItem(key)
  }
  /**
   * 删除所有数据
   */
  clear(key) {
    window.localStorage.clear()
  }
}
export default new LocalCache()
