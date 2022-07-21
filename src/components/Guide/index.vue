<template>
  <div>
    <el-tooltip :content="$t('msg.navBar.guide')">
      <svg-icon id="guide-start" icon="guide" @click="onClick" />
    </el-tooltip>
  </div>
</template>

<script setup>
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import steps from './steps'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
const i18n = useI18n()
let driver = null
onMounted(() => {
  driver = new Driver({
    // 禁止点击蒙版关闭
    allowClose: false,
    closeBtnText: i18n.t('msg.guide.close'),
    nextBtnText: i18n.t('msg.guide.next'),
    prevBtnText: i18n.t('msg.guide.prev')
  })
})
const onClick = () => {
  driver.defineSteps(steps(i18n))
  driver.start()
  setOpacity()
}
//设置成透明
const setOpacity = () => {
  const style = document.createElement('style')
  style.innerText =
    '#driver-highlighted-element-stage{display: block; left: 1216px; top: 1.84375px; position: absolute; width: 44px; height: 44px; background-color: rgb(255, 255, 255,0.3) !important;}'
  document.head.appendChild(style)
}
</script>

<style scoped></style>
