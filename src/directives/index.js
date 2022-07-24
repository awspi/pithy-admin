import print from 'vue3-print-nb' //打印
import permission from './permission'

export default (app) => {
  app.use(print)
  app.directive('permission', permission)
}
