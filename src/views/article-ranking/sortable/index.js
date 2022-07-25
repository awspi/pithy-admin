import Sortable from 'sortablejs'
import { ref } from 'vue'
import { articleSort } from '@/api/article'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'
//
export const tableRef = ref()
export const initSortable = (tableData, cb) => {
  //1.要拖拽的元素
  const el = tableRef.value.$el.querySelectorAll('.el-table__body > tbody')[0]
  // 2. 配置对象
  Sortable.create(el, {
    //拖拽时的类名
    ghostClass: 'sortable-ghost',
    // 拖拽结束的回调方法
    async onEnd(event) {
      const { newIndex, oldIndex } = event //下标
      // 修改数据
      console.log(tableData.value[oldIndex].ranking)
      console.log(tableData.value[newIndex].ranking)
      await articleSort({
        initRanking: tableData.value[oldIndex].ranking,
        finalRanking: tableData.value[newIndex].ranking
      })
      ElMessage.success({
        message: i18n.global.t('msg.article.sortSuccess'),
        type: 'success'
      })
      // 直接重新获取数据无法刷新 table！！
      tableData.value = []
      // 重新获取数据
      cb && cb()
    }
  })
}
