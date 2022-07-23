import Mock from 'mockjs'
import login from './sys/login'
import profile from './sys/profile'
import feature from './user/feature'
import chapter from './user/chapter'
import {
  userManage,
  importExcel,
  deteleUser,
  getUserManageAllList,
  userDetail,
  userRoles,
  updateRole
} from './user-manage/user-manage'
import { roleList, distribute, getRolePermisson } from './role/role'
import { permissionList } from './permission/permission'

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
Mock.mock('/mock/user-manage/all-list', 'get', (req, res) => {
  return getUserManageAllList(req, res)
})
Mock.mock(/\/user-manage\/detail/, 'get', (req, res) => {
  return userDetail(req, res)
})
Mock.mock(/\/mock\/user-manage\/role/, 'get', (req, res) => {
  return userRoles(req, res)
})
Mock.mock(/\/user-manage\/update-role/, 'post', (req, res) => {
  return updateRole(req, res)
})

//
Mock.mock('/mock/role/list', 'get', (req, res) => {
  return roleList(req, res)
})
Mock.mock('/mock/role/distribute-permission', 'post', (req, res) => {
  return distribute(req, res)
})
Mock.mock(/\/mock\/role\/permission/, 'get', (req, res) => {
  return getRolePermisson(req, res)
})
//
Mock.mock('/mock/permission/list', 'get', (req, res) => {
  return permissionList(req, res)
})
