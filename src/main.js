import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import '@/styles/index.scss' //导入样式表
import installIcons from '@/icons' //注册全局组件svg-icon
import '@/permission' //登录鉴权
import './mock/index.js' //mockjs
const app = createApp(App)
installElementPlus(app)
installIcons(app)

app.use(store).use(router).mount('#app')
