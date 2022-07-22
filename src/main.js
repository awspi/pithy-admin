import { createApp } from 'vue'
import i18n from '@/i18n' // i18n
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import '@/styles/index.scss' //导入样式表
import installIcons from '@/icons' //注册全局组件svg-icon
import '@/permission' //登录鉴权
import installFilter from '@/filter' //处理时间filter
import './mock/index.js' //mockjs
const app = createApp(App)
installElementPlus(app)
installIcons(app)
installFilter(app)
app.use(store).use(router).use(i18n).mount('#app')
