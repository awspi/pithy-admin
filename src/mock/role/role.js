import localCache from '@/utils/storage'
//初始化数据
const init = () => {
  //userManage
  if (!localCache.getItem('mock-roles')) {
    localCache.setItem('mock-roles', [
      {
        id: '1',
        title: '超级管理员',
        describe: '唯一账号，可以操作系统所有功能',
        permission: ['1', '1-1', '1-2', '1-3', '2', '2-1', '3', '4', '5']
      },
      {
        id: '2',
        title: '管理员',
        describe: '由超管指定，可以为多个，协助超管管理系统',
        permission: ['1', '1-2', '1-3', '2', '2-1', '3', '4', '5']
      },
      {
        id: '3',
        title: '人事经理',
        describe: '主管人事相关业务',
        permission: ['1', '1-2', '1-3']
      },
      {
        id: '4',
        title: '销售经理',
        describe: '主管销售相关业务',
        permission: []
      },
      {
        id: '5',
        title: '保安队长',
        describe: '主管安保相关业务',
        permission: []
      },
      {
        id: '6',
        title: '员工',
        describe: '普通员工',
        permission: ['4', '5']
      }
    ])
  }
}
export const roleList = (req, res) => {
  init()
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
