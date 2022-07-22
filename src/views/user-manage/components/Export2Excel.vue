<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="modelValue"
    @close="closed"
    width="30%"
  >
    <el-input
      :placeholder="$t('msg.excel.placeholder')"
      v-model="excelName"
    ></el-input>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.excel.close') }}</el-button>
        <el-button type="primary" @click="onConfirm" :loading="loading">{{
          $t('msg.excel.confirm')
        }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'
import { getUserManageAllList } from '@/api/user-manage'
import { USER_RELATIONS } from './Export2ExcelConstants'
import { dateFormat } from '@/utils/date'

const i18n = useI18n()

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
let exportDefaultName = i18n.t('msg.excel.defaultName')
const excelName = ref('')
excelName.value = exportDefaultName
watchSwitchLang(() => {
  exportDefaultName = i18n.t('msg.excel.defaultName')
  excelName.value = exportDefaultName
})

/**
 * 关闭
 */
const emits = defineEmits(['update:modelValue'])
const closed = () => {
  emits('update:modelValue', false)
}
const loading = ref(false)
const onConfirm = async () => {
  loading.value = true
  const allUser = (await getUserManageAllList()).list
  //导入工具包
  const excel = await import('@/utils/Export2Excel')
  const data = formatJson(USER_RELATIONS, allUser)

  excel.export_json_to_excel({
    // excel 表头
    header: Object.keys(USER_RELATIONS),
    // excel 数据（二维数组结构）
    data,
    // 文件名称
    filename: excelName.value || exportDefaultName,
    // 是否自动列宽
    autoWidth: true, //默认
    // 文件类型
    bookType: 'xlsx' //默认
  })
  closed()
}
// 该方法负责将数组转化成二维数组
const formatJson = (headers, rows) => {
  // 首先遍历数组
  // [{ username: '张三'},{},{}]  => [[’张三'],[],[]]
  return rows.map((item) => {
    return Object.keys(headers).map((key) => {
      // 角色特殊处理
      if (headers[key] === 'role') {
        const roles = item[headers[key]]
        return JSON.stringify(roles.map((role) => role.title))
      }
      // 时间格式进行单独处理
      if (headers[key] === 'openTime') {
        return dateFormat(item[headers[key]])
      }
      return item[headers[key]]
    })
  })
}
</script>

<style lang="scss" scoped></style>
