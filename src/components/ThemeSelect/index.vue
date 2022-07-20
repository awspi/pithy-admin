<template>
  <el-dropdown
    v-bind="$attrs"
    trigger="click"
    class="theme"
    @command="handleSetTheme"
  >
    <!-- icon -->
    <div>
      <el-tooltip :content="$t('msg.navBar.themeChange')"
        ><svg-icon icon="change-theme"
      /></el-tooltip>
    </div>
    <!-- menu  -->
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">
          {{ $t('msg.theme.themeColorChange') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- 弹出层 -->
  <div>
    <select-color v-model="selectColorVisiable"></select-color>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SelectColor from './components/SelectColor.vue'

//dialog
const selectColorVisiable = ref(false)

const handleSetTheme = (command) => {
  selectColorVisiable.value = true
}
</script>

<style lang="scss" scoped></style>
