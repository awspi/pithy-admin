<template>
  <div class="navbar">
    <div class="right-menu">
      <!-- 头像 -->
      <el-dropdown class="avatar-container" trigger="hover" type="small">
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
              ><el-dropdown-item>主页</el-dropdown-item></router-link
            >
            <a target="_blank" href="https://github.com/awspi"
              ><el-dropdown-item>github</el-dropdown-item></a
            >
            <el-dropdown-item divided @click="logout"
              >退出登录</el-dropdown-item
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
  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;
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
