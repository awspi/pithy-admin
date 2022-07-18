import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant'
import localCache from '@/utils/storage'

/**
 * 获取时间戳
 */
export function getTimeStamp() {
  return localCache.getItem(TIME_STAMP)
}

/**
 * 设置时间戳
 */
export function setTimeStamp() {
  localCache.setItem(TIME_STAMP, Date.now())
}

/**
 * 是否超时
 */
export function isCheckTimeout() {
  //当前时间
  const currentTime = Date.now()
  //缓存时间
  const timestamp = getTimeStamp()
  return currentTime - timestamp > TOKEN_TIMEOUT_VALUE
}
