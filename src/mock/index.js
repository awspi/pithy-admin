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
import {
  getArticleList,
  articleSort,
  createArticle,
  deleteArticle,
  articleContent,
  editArticle
} from '@/mock/article/article'
//初始化数据
import localCache from '@/utils/storage'
const init = () => {
  //users
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
          },
          {
            id: '5',
            title: '保安队长'
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
  //roles
  if (!localCache.getItem('mock-roles')) {
    localCache.setItem('mock-roles', [
      {
        id: '1',
        title: '超级管理员',
        describe: '唯一账号，可以操作系统所有功能',
        permission: ['1', '1-1', '1-2', '1-3', '2', '2-1', '3', '4', '5']
      },
      {
        id: '2',
        title: '管理员',
        describe: '由超管指定，可以为多个，协助超管管理系统',
        permission: ['1', '1-2', '1-3', '2', '2-1', '3', '4', '5']
      },
      {
        id: '3',
        title: '人事经理',
        describe: '主管人事相关业务',
        permission: ['1', '1-2', '1-3']
      },
      {
        id: '4',
        title: '销售经理',
        describe: '主管销售相关业务',
        permission: []
      },
      {
        id: '5',
        title: '保安队长',
        describe: '主管安保相关业务',
        permission: []
      },
      {
        id: '6',
        title: '员工',
        describe: '普通员工',
        permission: ['4', '5']
      }
    ])
  }
  //article
  if (!localCache.getItem('mock-articles')) {
    localCache.setItem('mock-articles', [
      {
        _id: '612a198d218e733440da07e6',
        ranking: 1,
        title: 'ESLint + Git Hooks',
        author: 'Sunday',
        publicDate: '1629099597000',
        desc: '编码规范',
        content: '<p>测试 富文本 的内容</p>',
        __v: 0
      },
      {
        _id: '612a198d218e733440da07ec',
        ranking: 2,
        title: 'Tags View',
        author: 'Sunday',
        publicDate: '1629099597000',
        desc: '便签快捷导航功能',
        content: '<p>测试 富文本 的内容</p>',
        __v: 0
      },
      {
        _id: '612a198d218e733440da07e4',
        ranking: 3,
        title: 'Element-Plus',
        author: 'Sunday',
        publicDate: '1629099597000',
        desc: '基于 Vue 3.0 的桌面端组件库',
        content: '<p>测试 富文本 的内容</p>',
        __v: 0
      },
      {
        _id: '612a198d218e733440da07ea',
        ranking: 4,
        title: '侧边栏',
        author: 'Sunday',
        publicDate: '1629099597000',
        desc: '根据路由动态生成的 Menu 菜单',
        content: '<p>测试 富文本 的内容</p>',
        __v: 0
      },
      {
        _id: '612a198d218e733440da07eb',
        ranking: 5,
        title: '动态面包屑',
        author: 'Sunday',
        publicDate: '1629099597000',
        desc: '动态生成的面包屑数据',
        content: '<p>测试 富文本 的内容</p>',
        __v: 0
      },
      {
        _id: '612a198d218e733440da07e8',
        ranking: 6,
        title: '权限验证',
        author: 'Sunday',
        publicDate: '1629099597000',
        desc: '页面权限、功能权限、动态权限、权限配置',
        content: '<p>测试 富文本 的内容</p>',
        __v: 0
      },
      {
        _id: '612a198d218e733440da07e5',
        ranking: 7,
        title: 'vue-element-admin',
        author: 'Sunday',
        publicDate: '1629099597000',
        desc: '后台前端解决方案',
        content: '<p>测试 富文本 的内容</p>',
        __v: 0
      },
      {
        _id: '612a198d218e733440da07e3',
        ranking: 8,
        title: 'Vue3 + 全家桶',
        author: 'Sunday',
        publicDate: '1629099597000',
        desc: '项目基于最新的vue3全家桶进行开发',
        content: '<p>测试 富文本 的内容</p>',
        __v: 0
      },
      {
        _id: '612a198d218e733440da07e9',
        ranking: 9,
        title: '功能引导',
        author: 'Sunday',
        publicDate: '1629099597000',
        desc: '对用户的功能引导',
        content: '<p>测试 富文本 的内容</p>',
        __v: 0
      },
      {
        _id: '612a198d218e733440da07e7',
        ranking: 10,
        title: '架构设计',
        author: 'Sunday',
        publicDate: '1629099597000',
        desc: '架构设计',
        content: '<p>测试 富文本 的内容</p>',
        __v: 0
      }
    ])
  }
}
init()
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

//
Mock.mock(/\/mock\/article\/list/, 'get', (req, res) => {
  return getArticleList(req, res)
})
Mock.mock('/mock/article/sort', 'post', (req, res) => {
  return articleSort(req, res)
})
Mock.mock('/mock/article/create', 'post', (req, res) => {
  return createArticle(req, res)
})
Mock.mock(/\/mock\/article\/delete/, 'get', (req, res) => {
  return deleteArticle(req, res)
})
Mock.mock(/\/mock\/article/, 'get', (req, res) => {
  return articleContent(req, res)
})
Mock.mock('/mock/article/edit', 'post', (req, res) => {
  return editArticle(req, res)
})
