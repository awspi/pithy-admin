import localCache from '@/utils/storage'
//初始化数据

export const roleList = (req, res) => {
  const roles = localCache.getItem('mock-roles')
  return {
    success: true,
    code: 200,
    data: roles,
    message: '获取资料成功'
  }
}
export const getRolePermisson = (req, res) => {
  const roleId = req.url.split('/')[4]
  const roles = localCache.getItem('mock-roles')
  const targetRole = roles.find((role) => {
    return role.id === roleId
  })
  return {
    success: true,
    code: 200,
    data: targetRole.permission,
    message: '获取资料成功'
  }
}
export const distribute = (req, res) => {
  const permissions = JSON.parse(req.body).permissions
  const roleId = JSON.parse(req.body).roleId
  const roles = localCache.getItem('mock-roles')
  const newRolerList = roles.map((role) => {
    if (role.id === roleId) {
      role.permission = permissions
    }
    return role
  })
  localCache.setItem('mock-roles', newRolerList)
  return { success: true, code: 200, data: null, message: '更新成功' }
}
