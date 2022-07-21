<template>
  <div
    class="app-wrapper"
    :class="[$store.getters.sidebarOpened ? 'openSiderbar' : 'hideSidebar']"
  >
    <!-- 左侧menu  -->
    <side-bar
      class="sidebar-container"
      :style="{ backgroundColor: $store.getters.cssVar.menuBg }"
    >
    </side-bar>
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部navbar -->
        <nav-bar></nav-bar>
        <!-- tags -->
        <tags-view></tags-view>
      </div>
      <!-- 内容区 -->
      <app-main></app-main>
    </div>
  </div>
</template>

<script setup>
import NavBar from './components/Navbar.vue'
import AppMain from './components/AppMain.vue'
import SideBar from './components/Sidebar'
import TagsView from '@/components/TagsView'
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.module.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width #{$sideBarDuration};
}
.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}
</style>
