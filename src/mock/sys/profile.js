export default function (req, res) {
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
      _id: '612710a0ec87aa543c9c341d',
      id: '0',
      username: 'super-admin',
      title: '超级管理员',
      avatar:
        'https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207190240867.png',
      permission: {
        menus: [
          'userManage',
          'roleList',
          'permissionList',
          'articleRanking',
          'articleCreate'
        ],
        points: [
          'distributeRole',
          'importUser',
          'removeUser',
          'distributePermission'
        ]
      }
    },
    message: '获取资料成功'
  }
}
