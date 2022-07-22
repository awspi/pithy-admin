import request from '@/utils/request'
/**
 * 获取用户列表
 */
export const getUserManageList = (data) => {
  return request({
    url: '/user-manage/list',
    // params: data //上线时应该是params
    data
  })
}
/**
 * 批量导入
 */
export const userBatchImport = (data) => {
  return request({
    url: '/user-manage/batch/import',
    method: 'POST',
    data
  })
}
