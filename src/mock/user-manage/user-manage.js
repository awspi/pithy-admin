import localCache from '@/utils/storage'
const getQuery = (url, name) => {
  const index = url.indexOf('?')
  if (index !== -1) {
    const queryStrArr = url.substr(index + 1).split('&')
    for (let i = 0; i < queryStrArr.length; i++) {
      const itemArr = queryStrArr[i].split('=')
      if (itemArr[0] === name) {
        return itemArr[1]
      }
    }
  }
  return null
}
//初始化数据
const init = () => {
  //userManage
  if (!localCache.getItem('mock-users')) {
    localCache.setItem('mock-users', [
      {
        role: [
          {
            id: '1',
            title: '超级管理员'
          }
        ],
        _id: '612710a0ec87aa543c9c341d',
        id: '0',
        openTime: '1433088000000',
        username: 'super-admin',
        mobile: '188xxxx0001',
        avatar:
          'https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207190240867.png'
      },
      {
        role: [
          {
            id: '2',
            title: '管理员'
          },
          {
            id: '5',
            title: '保安队长'
          }
        ],
        _id: '612710a0ec87aa543c9c341e',
        id: '1',
        username: 'admin',
        openTime: '1559318400000',
        mobile: '188xxxx0002',
        avatar:
          'https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207212113528.png'
      }
    ])
  }
}
export const userManage = (req, res) => {
  //初始化数据
  init()
  const userList = localCache.getItem('mock-users')
  // 获取传递参数
  const pageindex = getQuery(req.url, 'page')
  const pagesize = getQuery(req.url, 'size')
  const start = (pageindex - 1) * pagesize
  const end = pagesize * pageindex
  const totalPage = Math.ceil(userList.length / pagesize)
  const returnList = pageindex > totalPage ? [] : userList.slice(start, end)
  return {
    success: true,
    code: 200,
    data: {
      list: returnList,
      total: userList.length,
      page: pageindex,
      size: pagesize
    },
    message: 'success'
  }
}
export const importExcel = (req, res) => {
  const data = JSON.parse(req.body)

  let id = localCache.getItem('mock-users').length + 1
  const newData = []
  data.forEach((item) => {
    const obj = {
      avatar:
        'https://img9.vilipix.com/picture/pages/regular/2021/01/16/23/36/86908634_p0_master1200.jpg?x-oss-process=image/resize,m_fill,w_1000',
      id: id - 1,
      mobile: item.mobile,
      openTime: item.openTime,
      role: [{ id: id, title: item.role }],
      _id: Math.random().toString(36).substr(2),
      username: item.username
    }
    newData.push(obj)
    id++
  })

  localCache.setItem(
    'mock-users',
    localCache.getItem('mock-users').concat(newData)
  )
  return {
    success: true,
    code: 200,
    data: null,
    message: '批量导入员工成功'
  }
}
export const deteleUser = (req, res) => {
  const _id = req.url.split('/')[4]
  const rowData = localCache.getItem('mock-users')
  const newData = []
  rowData.forEach((item) => {
    if (item._id !== _id) {
      newData.push(item)
    }
  })
  localCache.removeItem('mock-users')
  localCache.setItem('mock-users', newData)
  return {
    success: true,
    code: 200,
    data: null,
    message: '删除成功！'
  }
}

export const getUserManageAllList = (req, res) => {
  return {
    success: true,
    code: 200,
    data: {
      list: localCache.getItem('mock-users')
    },
    message: 'success'
  }
}
//写死了
export const userDetail = (req, res) => {
  const _id = req.url.split('/')[4]
  return {
    success: true,
    code: 200,
    data: {
      role: [
        {
          id: '1',
          title: '超级管理员'
        }
      ],
      remark: ['超级管理员', 'BOSS'],
      experience: [
        {
          startTime: '1538323200000',
          endTime: '1551369600000',
          title: '慕课网',
          desc: '混合开发京东商城'
        },
        {
          startTime: '1614528000000',
          endTime: '1625068800000',
          title: '慕课网',
          desc: 'uni-app 开发企业级小程序'
        }
      ],
      _id,
      id: '0',
      openTime: '1433088000000',
      username: 'super-admin',
      title: '超级管理员',
      mobile: '188xxxx0001',
      avatar:
        'https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207212113528.png',
      gender: '男',
      nationality: '汉',
      address: '北京市朝阳区xx大道 11xx0 号 3 层',
      major: '在线职业教育平台',
      glory: '国内领先的线上 IT 教育品牌'
    },
    message: 'success'
  }
}

export const userRoles = (req, res) => {
  const _id = req.url.split('/')[4]
  const userList = localCache.getItem('mock-users')
  const targetUser = userList.find((user) => {
    return user._id === _id
  })
  return {
    success: true,
    code: 200,
    data: targetUser,
    message: 'success'
  }
}
export const updateRole = (req, res) => {
  const userList = localCache.getItem('mock-users')
  const _id = req.url.split('/')[4]
  const roles = JSON.parse(req.body).roles
  const newUserList = userList.map((user) => {
    if (user._id === _id) {
      user.role = roles
    }
    return user
  })
  localCache.setItem('mock-users', newUserList)
  return { success: true, code: 200, data: null, message: '更新成功' }
}
