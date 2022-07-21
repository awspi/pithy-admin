<template>
  <div @click="onToggle">
    <svg-icon
      id="guide-full"
      :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
    ></svg-icon>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import screenfull from 'screenfull'

const isFullscreen = ref(false)

const onToggle = () => {
  screenfull.toggle()
}
const change = () => {
  isFullscreen.value = !isFullscreen.value
}
//监听screenfull的变化
// 设置侦听器
onMounted(() => {
  screenfull.on('change', change)
})
// 取消侦听器
onUnmounted(() => {
  screenfull.off('change', change)
})
</script>

<style lang="scss" scoped></style>
