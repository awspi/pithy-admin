<template>
  <el-config-provider :locale="$store.getters.language === 'zh' ? zhCn : en">
    <router-view
  /></el-config-provider>
</template>

<script setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
</script>

<style></style>
