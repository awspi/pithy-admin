import Mock from 'mockjs'
import login from './sys/login'

Mock.mock('/mock/sys/login', (req, res) => {
  return login(req, res)
})
