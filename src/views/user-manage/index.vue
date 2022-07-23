<template>
  <div class="user-manage-container">
    <!-- header -->
    <el-card class="header">
      <div>
        <el-button type="primary" @click="onImportExcelClick">
          {{ $t('msg.excel.importExcel') }}</el-button
        >
        <el-button type="success" @click="onToExcelClick">
          {{ $t('msg.excel.exportExcel') }}
        </el-button>
      </div>
    </el-card>
    <!-- table -->
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="#" />
        <el-table-column prop="username" :label="$t('msg.excel.name')" />
        <el-table-column prop="mobile" :label="$t('msg.excel.mobile')" />
        <!-- 头像 -->
        <el-table-column :label="$t('msg.excel.avatar')" align="center">
          <template v-slot="{ row }">
            <el-avatar
              class="avatar"
              :src="row.avatar"
              :preview-src-list="[row.avatar]"
            ></el-avatar>
          </template>
        </el-table-column>
        <!-- 角色 -->
        <el-table-column :label="$t('msg.excel.role')">
          <template v-slot="{ row }">
            <div v-if="row.role.length">
              <el-tag
                v-for="item in row.role"
                :key="item.id"
                size="small"
                type="info"
                >{{ item.title }}</el-tag
              >
            </div>
            <div v-else size="small" type="danger">
              {{ $t('msg.excel.defaultRole') }}
            </div>
          </template>
        </el-table-column>
        <!-- 时间 -->
        <el-table-column :label="$t('msg.excel.openTime')">
          <template #default="{ row }">
            {{ $filters.dateFilter(row.openTime) }}
          </template>
        </el-table-column>

        <!-- 操作 -->
        <el-table-column
          :label="$t('msg.excel.action')"
          fixed="right"
          width="200"
        >
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              @click="onShowClick(row._id)"
              >{{ $t('msg.excel.show') }}</el-button
            >
            <el-button
              type="primary"
              size="small"
              @click="onShowRoleClick(row)"
              >{{ $t('msg.excel.showRole') }}</el-button
            >
            <el-button
              type="primary"
              size="small"
              @click="onRemoveClick(row)"
              >{{ $t('msg.excel.remove') }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 页码 -->
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="size"
        :page-sizes="[2, 5, 10, 20]"
        layout="total,sizes,prev,pager,next,jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- ExportToExcel dialog  -->
    <export-to-excel v-model="exportToExcelVisiable"></export-to-excel>
    <!-- 分配角色dialog  -->
    <role-dialog
      v-model="roleDialogVisible"
      :userId="selectUserId"
      @updateRole="getListData"
    ></role-dialog>
  </div>
</template>

<script setup>
import { ref, onActivated, watch } from 'vue'
import { getUserManageList, deleteUser } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import ExportToExcel from './components/Export2Excel.vue'
import roleDialog from './components/roles.vue'

const i18n = useI18n()

// dialog
const roleDialogVisible = ref(false)
// 分配角色click
const selectUserId = ref('')
const onShowRoleClick = (row) => {
  selectUserId.value = row._id
  roleDialogVisible.value = true
}

// 保证每次打开重新获取用户角色数据
//ifnot 子组件watch(selectUserId)的时候,如果连着打开同一个用户,selectUserId不变,watch不到
watch(roleDialogVisible, (val) => {
  if (!val) selectUserId.value = ''
})

//导出excel
const exportToExcelVisiable = ref(false)
const onToExcelClick = () => {
  exportToExcelVisiable.value = true
}

//获取数据
const tableData = ref([])
const total = ref(0) //总数
const page = ref(1) //页码
const size = ref(2) //每页展示的个数
const getListData = async () => {
  const result = await getUserManageList({
    page: page.value,
    size: size.value
  })
  tableData.value = result.list
  total.value = result.total
}
getListData()
watchSwitchLang(getListData())
//handleSizeChange
const handleSizeChange = (currrentSize) => {
  size.value = currrentSize
  getListData()
}
const handleCurrentChange = (currrentPage) => {
  page.value = currrentPage
  getListData()
}

//excel导入按钮
const router = useRouter()
const onImportExcelClick = () => {
  router.push('/user/import')
}
//row 查看用户详情按钮
const onShowClick = (id) => {
  router.push(`/user/info/${id}`)
}
//row 删除按钮
const onRemoveClick = (row) => {
  ElMessageBox.confirm(
    i18n.t('msg.excel.dialogTitle1') +
      row.username +
      i18n.t('msg.excel.dialogTitle2'),
    {
      type: 'warning'
    }
  ).then(async () => {
    deleteUser(row._id)
    ElMessage.success(i18n.t('msg.excel.removeSuccess'))
    // 重新渲染数据
    getListData()
  })
}

//keep-alive组件被重新激活时,重新查询数据
onActivated(getListData)
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 10px;
    text-align: right;
  }
  ::v-deep .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  ::v-deep .el-tag {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
