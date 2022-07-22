import Mock from 'mockjs'
import login from './sys/login'
import profile from './sys/profile'
import feature from './user/feature'
import chapter from './user/chapter'
import { userManage, importExcel, deteleUser } from './user-manage/user-manage'

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
Mock.mock(/\/mock\/user-manage\/list/, 'get', (req, res) => {
  return userManage(req, res)
})

Mock.mock('/mock/user-manage/batch/import', (req, res) => {
  return importExcel(req, res)
})
Mock.mock(/\/user-manage\/detele\//, 'get', (req, res) => {
  return deteleUser(req, res)
})
