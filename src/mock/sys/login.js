import localCache from '@/utils/storage'

export default function (req, res) {
  const { username, password } = JSON.parse(req.body)
  const users = localCache.getItem('mock-users')
  let token = ''
  const user = users.find((user) => {
    return user.username === username
  })
  if (user) {
    token =
      Math.random().toString(36).substr(2) +
      '-' +
      Math.random().toString(36).substr(2)
    const _id = user._id
    localCache.setItem('mock-token', { username, token, _id })
  }
  //
  if (password === 'e10adc3949ba59abbe56e057f20f883e') {
    return {
      success: true,
      code: 10000,
      data: {
        token
      },
      message: '执行成功'
    }
  } else {
    return {
      code: '999',
      message: '登陆失败'
    }
  }
}
