<template>
  <div class="navbar">
    <!-- hamburger -->
    <hamburger class="hamburger-container" />
    <!-- breadcrumb -->
    <breadcrumb id="guide-breadcrumb" class="breadcrumb-container" />
    <div class="right-menu">
      <!-- 引导guide -->
      <guide class="right-menu-item hover-effect"></guide>
      <!-- 搜索 -->
      <header-search class="right-menu-item hover-effect"></header-search>
      <!-- 切换全屏 -->
      <screenfull class="right-menu-item hover-effect"></screenfull>
      <!-- 切换主题 -->
      <theme-select class="right-menu-item hover-effect"></theme-select>
      <!-- 切换语言 -->
      <lang-select class="right-menu-item hover-effect"></lang-select>
      <!-- 头像 -->
      <el-dropdown class="avatar-container" trigger="click" type="small">
        <div class="avatar-wrapper">
          <el-avatar
            shape="square"
            :size="40"
            :src="$store.getters.userInfo.avatar"
          />
          <el-icon><Tools /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/"
              ><el-dropdown-item>
                {{ $t('msg.navBar.home') }}
              </el-dropdown-item></router-link
            >
            <a target="_blank" href="https://github.com/awspi"
              ><el-dropdown-item>github</el-dropdown-item></a
            >
            <el-dropdown-item divided @click="logout">
              {{ $t('msg.navBar.logout') }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { Tools } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import Hamburger from '@/components/Hamburger'
import Breadcrumb from '@/components/Breadcrumb'
import LangSelect from '@/components/LangSelect'
import ThemeSelect from '@/components/ThemeSelect'
import Screenfull from '@/components/Screenfull'
import HeaderSearch from '@/components/HeaderSearch'
import Guide from '@/components/Guide'
const store = useStore()
const logout = () => {
  ElMessage.success('退出成功')
  store.dispatch('user/logout')
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.1);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    //hover
    transition: background 0.5s;
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;
    ::v-deep .right-menu-item {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;
      &.hover-effect {
        cursor: pointer;
      }
    }
    ::v-deep .avatar-container {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .el-avatar {
          --el-avatar-background-color: none;
          margin-right: 12px;
        }
      }
    }
  }
}
</style>
