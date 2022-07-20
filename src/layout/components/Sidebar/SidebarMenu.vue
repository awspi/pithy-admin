<template>
  <el-menu
    :collapse="!$store.getters.sidebarOpened"
    :default-active="activeMenu"
    :uniqueOpened="true"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    router
  >
    <sidebar-item
      v-for="item in routes"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { filterRoutes, generateMenus } from '@/utils/route'
import SidebarItem from './SidebarItem.vue'
const router = useRouter()
const routes = computed(() => {
  const fRoutes = filterRoutes(router.getRoutes())
  return generateMenus(fRoutes)
})
// console.log(JSON.stringify(routes.value))

//默认激活菜单
const route = useRoute()
const activeMenu = computed(() => {
  return route.path
})
</script>

<style lang="scss" scoped></style>
