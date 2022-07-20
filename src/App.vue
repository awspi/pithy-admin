<template>
  <el-config-provider :locale="$store.getters.language === 'zh' ? zhCn : en">
    <router-view
  /></el-config-provider>
</template>

<script setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'
import { useStore } from 'vuex'
const store = useStore()
generateNewStyle(store.getters.mainColor).then((newStyleText) => {
  writeNewStyle(newStyleText)
})
</script>

<style></style>
