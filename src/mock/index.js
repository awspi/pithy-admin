import Mock from 'mockjs'
import login from './sys/login'
import profile from './sys/profile'

Mock.mock('/mock/sys/login', (req, res) => {
  return login(req, res)
})
Mock.mock('/mock/sys/profile', (req, res) => {
  return profile(req, res)
})
