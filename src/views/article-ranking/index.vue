<template>
  <div class="article-ranking-container">
    <el-card class="header">
      <div class="dynamic-box">
        <span class="title">{{ $t('msg.article.dynamicTitle') }}</span>
        <el-checkbox-group v-model="selectDynamicLabel">
          <el-checkbox
            v-for="(item, index) in dynamicData"
            :key="index"
            :label="item.label"
            >{{ item.label }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
    </el-card>
    <el-card>
      <el-table ref="tableRef" :data="tableData" border>
        <el-table-column
          v-for="(item, index) in tableColumns"
          :key="index"
          :label="item.label"
          :prop="item.prop"
        >
          <!-- 相对时间 -->
          <template #default="{ row }" v-if="item.prop === 'publicDate'">
            {{ $filters.relativeTime(row.publicDate) }}</template
          >
          <!-- aciton -->
          <template #default="{ row }" v-else-if="item.prop === 'action'">
            <el-button type="primary" @click="onShowClick(row)">{{
              $t('msg.article.show')
            }}</el-button>
            <el-button type="danger" @click="onRemoveClick(row)">{{
              $t('msg.article.remove')
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 50, 100, 200]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onActivated, onMounted } from 'vue'
import { getArticleList, deleteArticle } from '@/api/article'
import { watchSwitchLang } from '@/utils/i18n'
import { dynamicData, selectDynamicLabel, tableColumns } from './dynamic'
import { initSortable, tableRef } from './sortable'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
const router = useRouter()
const i18n = useI18n()
// 表格拖拽相关
onMounted(() => {
  initSortable(tableData, getListData) //传入tableData是响应式对象,如果传入tableData.value则是挂载时候的具体值 []
})

//action
const onShowClick = (row) => {
  router.push(`/article/${row._id}`)
}
const onRemoveClick = (row) => {
  ElMessageBox.confirm(
    i18n.t('msg.article.dialogTitle1') +
      row.title +
      i18n.t('msg.article.dialogTitle2'),
    {
      type: 'warning'
    }
  ).then(async () => {
    await deleteArticle(row._id)
    ElMessage.success(i18n.t('msg.article.removeSuccess'))
    tableData.value = [] //el-table需要先置空再能刷新
    getListData()
  })
}
//pagination
/**
 * size 改变触发
 */
const handleSizeChange = (currentSize) => {
  size.value = currentSize
  getListData()
}
/**
 * 页码改变触发
 */
const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getListData()
}
//数据相关
const page = ref(1)
const size = ref(10)
const tableData = ref([])
const total = ref(0)

const getListData = async () => {
  const result = await getArticleList({
    page: page.value,
    size: size.value
  })
  tableData.value = result.list
  total.value = result.total
}
getListData()
watchSwitchLang(getListData)
// 组件切换重新加载
onActivated(getListData)
</script>

<style lang="scss" scoped>
.article-ranking-container {
  .header {
    margin-bottom: 20px;
    .dynamic-box {
      display: flex;
      align-items: center;
      .title {
        margin-right: 20px;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }

  ::v-deep .el-table__row {
    cursor: pointer;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
::v-deep .sortable-ghost {
  opacity: 0.6;
  color: #fff !important;
  background: rgba(0, 0, 0, 0.3) !important;
}
</style>
