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

export const userManage = (req, res) => {
  //初始化数据
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
