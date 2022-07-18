export default function (req, res) {
  const { username, password } = JSON.parse(req.body)
  if (
    username === 'super-admin' &&
    password === 'e10adc3949ba59abbe56e057f20f883e'
  ) {
    return {
      success: true,
      code: 10000,
      data: {
        token: 'd8c6ed7a-3fd4-46e4-a477-b20d1ce9cda0'
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
