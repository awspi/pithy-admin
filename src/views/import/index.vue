<template>
  <div class="">
    <upload-excel :onSuccess="onSuccess"></upload-excel>
  </div>
</template>

<script setup>
import {} from 'vue'
import UploadExcel from '@/components/UploadExcel'
import { USER_RELATIONS, formatDate } from './utils'
import { userBatchImport } from '@/api/user-manage'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
const i18n = useI18n()
const router = useRouter()
/**
 * excel解析成功回调 上传
 */
const onSuccess = async ({ results }) => {
  const updateData = generateData(results)
  await userBatchImport(updateData)
  ElMessage.success({
    type: 'success',
    message: results.length + i18n.t('msg.excel.importSuccess')
  })
  router.push('/user/manage')
}
/**
 * 筛选数据
 */
const generateData = (results) => {
  const arr = []
  results.forEach((item) => {
    const userInfo = {}
    Object.keys(item).forEach((key) => {
      if (USER_RELATIONS[key] === 'openTime') {
        userInfo[USER_RELATIONS[key]] = formatDate(item[key])
        return
      }
      userInfo[USER_RELATIONS[key]] = item[key]
    })
    arr.push(userInfo)
  })
  return arr
}
</script>

<style lang="scss" scoped></style>
