import localCache from '@/utils/storage'

export const userManage = (req, res) => {
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
  return {
    success: true,
    code: 200,
    data: {
      list: localCache.getItem('mock-users'),
      total: localCache.getItem('mock-users').length,
      page: '1',
      size: '10'
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
        'https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207220953290.webp',
      id: id - 1,
      mobile: item.mobile,
      openTime: item.openTime,
      role: [{ id: id, title: item.role }],
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
