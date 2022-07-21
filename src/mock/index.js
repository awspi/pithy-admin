import Mock from 'mockjs'
import login from './sys/login'
import profile from './sys/profile'
import feature from './user/feature'
import chapter from './user/chapter'

Mock.mock('/mock/sys/login', (req, res) => {
  return login(req, res)
})
Mock.mock('/mock/sys/profile', (req, res) => {
  return profile(req, res)
})
Mock.mock('/mock/user/feature', (req, res) => {
  return feature(req, res)
})
Mock.mock('/mock/user/chapter', (req, res) => {
  return chapter(req, res)
})
