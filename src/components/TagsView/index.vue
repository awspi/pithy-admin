<template>
  <div class="tags-view-container">
    <router-link
      v-for="(tag, index) in $store.getters.tagsViewList"
      :key="tag.fullPath"
      class="tags-view-item"
      :class="isActive(tag) ? 'active' : ''"
      :to="{ path: tag.fullPath }"
      :style="{
        backgroundColor: isActive(tag) ? $store.getters.cssVar.menuBg : '',
        borderColor: isActive(tag) ? $store.getters.cssVar.menuBg : ''
      }"
      @contextmenu.prevent="openMenu($event, index)"
    >
      {{ tag.title }}
      <!-- X图标 (非选中状态才显示) -->
      <svg-icon
        v-show="!isActive(tag)"
        icon="close"
        @click.prevent.stop="onCloseClick(index)"
        class="close-icon"
      ></svg-icon>
    </router-link>
    <context-menu
      v-show="visiable"
      :index="selectIndex"
      :style="menuStyle"
    ></context-menu>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import ContextMenu from './ContextMenu.vue'

/**
 * 是否被选中
 */
const route = useRoute()
const isActive = (tag) => {
  return tag.path === route.path
}
/**
 * 关闭事件
 */
const store = useStore()
const onCloseClick = (index) => {
  store.commit('app/removeTagsView', {
    type: 'index',
    index
  })
}
/**
 * 鼠标右键打开菜单
 */
const menuStyle = ref({
  left: 0,
  top: 0
})
const selectIndex = ref(0)
const visiable = ref(false)
const openMenu = (e, index) => {
  const { x, y } = e //获取鼠标坐标
  menuStyle.value.left = x + 'px'
  menuStyle.value.top = y + 'px'
  selectIndex.value = index
  visiable.value = !visiable.value
}
/**
 * 点击页面空白处关闭菜单
 */
const closeMenu = () => {
  visiable.value = false
}
watch(visiable, (value) => {
  if (value) {
    //添加监听器
    document.body.addEventListener('click', closeMenu)
  } else {
    //移除监听器
    document.body.removeEventListener('click', closeMenu)
  }
})
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      color: #fff;
      &::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
      }
    }
    // close 按钮
    .close-icon {
      width: 16px;
      height: 16px;
      line-height: 10px;
      vertical-align: sub;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
