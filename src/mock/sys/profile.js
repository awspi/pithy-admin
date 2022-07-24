import localCache from '@/utils/storage'
const RELATIONS = [
  {
    id: '1',
    permissionName: '员工管理',
    permissionMark: 'userManage',
    permissionDesc: '员工管理菜单',
    children: [
      {
        id: '1-1',
        permissionName: '分配角色',
        permissionMark: 'distributeRole',
        permissionDesc: '为员工分配角色'
      },
      {
        id: '1-2',
        permissionName: '导入员工',
        permissionMark: 'importUser',
        permissionDesc: '通过 excel 导入员工'
      },
      {
        id: '1-3',
        permissionName: '删除员工',
        permissionMark: 'removeUser',
        permissionDesc: '删除员工'
      }
    ]
  },
  {
    id: '2',
    permissionName: '角色列表',
    permissionMark: 'roleList',
    permissionDesc: '角色列表菜单',
    children: [
      {
        id: '2-1',
        permissionName: '分配权限',
        permissionMark: 'distributePermission',
        permissionDesc: '为角色分配权限'
      }
    ]
  },
  {
    id: '3',
    permissionName: '权限列表',
    permissionMark: 'permissionList',
    permissionDesc: '权限列表菜单',
    children: []
  },
  {
    id: '4',
    permissionName: '文章排名',
    permissionMark: 'articleRanking',
    permissionDesc: '文章排名菜单',
    children: []
  },
  {
    id: '5',
    permissionName: '创建文章',
    permissionMark: 'articleCreate',
    permissionDesc: '创建文章页面',
    children: []
  }
]
const getUserPermission = (_id) => {
  const userList = localCache.getItem('mock-users')
  const roles = localCache.getItem('mock-roles')
  const userRoles = userList.find((user) => {
    return user._id === _id
  }).role
  const permission = [] //代号
  userRoles.forEach((userRole) => {
    const tragetRole = roles.find((role) => {
      return role.title === userRole.title
    })

    permission.push(...tragetRole.permission)
  })
  //
  const permissionMenus = [] //页面权限
  const permissionPoints = [] //功能权限
  RELATIONS.forEach((relation) => {
    if (permission.indexOf(relation.id) !== -1) {
      permissionMenus.push(relation.permissionMark)
    }
    if (relation.children.length) {
      const children = relation.children
      children.forEach((child) => {
        if (permission.indexOf(child.id) !== -1) {
          permissionPoints.push(child.permissionMark)
        }
      })
    }
  })
  return {
    menus: permissionMenus,
    points: permissionPoints
  }
}
export default function (req, res) {
  const _id = localCache.getItem('mock-token')._id
  const permission = getUserPermission(_id)

  const username = localCache.getItem('mock-token').username
  const roleId = localCache.getItem('mock-token').roleId
  const roleTitle =
    typeof localCache.getItem('mock-token').roleTitle === 'string'
      ? localCache.getItem('mock-token').roleTitle
      : localCache.getItem('mock-token').roleTitle.join(' ')
  //动态路由用的是permission ,role的展示不影响
  return {
    success: true,
    code: 200,
    data: {
      role: [
        {
          id: roleId,
          title: roleTitle
        }
      ],
      _id: '612710a0ec87aa543c9c341d',
      id: '0',
      username,
      title: roleTitle,
      avatar:
        'https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207190240867.png',

      permission
    },
    message: '获取资料成功'
  }
}
