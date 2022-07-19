<template>
  <el-dropdown
    class="international"
    trigger="click"
    @command="handleSetLanguage"
  >
    <div>
      <el-tooltip content="国际化" :effect="effect">
        <svg-icon icon="language"></svg-icon>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh"
          >中文</el-dropdown-item
        >
        <el-dropdown-item :disabled="language === 'en'" command="en"
          >English</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
const store = useStore()
const language = computed(() => {
  return store.getters.language
})
defineProps({
  //组件皮肤
  effect: {
    type: String,
    default: 'dark',
    validator: (value) => {
      // 这个值必须匹配下列字符串中的一个
      return ['dark', 'light'].indexOf(value) !== -1
    }
  }
})
//切换语言
const i18n = useI18n()
const handleSetLanguage = (lang) => {
  //切换i18n的locate
  i18n.locale.value = lang
  //修改vuex中的language
  store.commit('app/setLanguage', lang)
  ElMessage.success(i18n.t('msg.toast.switchLangSuccess'))
}
</script>

<style lang="scss" scoped></style>
