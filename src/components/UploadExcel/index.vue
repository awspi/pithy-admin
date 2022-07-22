<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button :loading="loading" type="primary" @click="handleUpload">
        {{ $t('msg.excel.importExcel') }}
      </el-button>
      <input
        type="file"
        ref="excelUploadInputRef"
        calss="excel-upload-input"
        accept=".xlsx,.xls"
        @change="handleChange"
      />
    </div>
    <!-- https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API -->
    <div
      class="drop"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover"
    >
      <svg-icon icon="upload" class="icon"></svg-icon>
      <span>{{ $t('msg.uploadExcel.drop') }}</span>
    </div>
  </div>
</template>

<script setup>
import XLSX from 'xlsx'
import { getHeaderRow, isExcel } from './utils'
import { ref, defineProps } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  //上传之前的回调
  beforeUpload: Function,
  //上传成功的回调
  onSuccess: Function
})
//

const loading = ref(false)
const excelUploadInputRef = ref()

// 拖拽文件
const handleDrop = (e) => {
  if (loading.value) return
  const files = e.dataTransfer.files
  if (files.length !== 1) {
    ElMessage.err('必须要有一个文件')
  }
  const rawFile = files[0]
  if (!isExcel(rawFile)) {
    ElMessage.error('文件必须是 .xlsx, .xls, .csv 格式')
    return false
  }
  upload(rawFile)
}
/**
 * 拖拽悬停时触发
 */
const handleDragover = (e) => {
  e.dataTransfer.dropEffect = 'copy' // 在新位置生成源项的副本
}

//点击上传btn
const handleUpload = () => {
  //触发隐藏域的点击
  excelUploadInputRef.value.click()
}
const handleChange = (e) => {
  const rawFile = e.target.files[0]
  if (!rawFile) return
  upload(rawFile)
}
/**
 * 触发上传事件
 */
const upload = (rawFile) => {
  excelUploadInputRef.value.value = null
  //如果用户没有制定上传前的回调
  if (!props.beforeUpload) {
    readData(rawFile)
    return
  }
  //如果用户制定了上传前的回调,只有返回true才会接着执行
  const before = props.beforeUpload(rawFile)
  if (before) {
    readData(rawFile)
  }
}
/**
 * 读取数据(异步)
 */
const readData = (rawFile) => {
  loading.value = true
  return new Promise((resolve) => {
    const reader = new FileReader()
    //写在readAsArrayBuffer之前,读取完成时触发
    reader.onload = (e) => {
      //读取操作完成时
      const data = e.target.result
      const workbook = XLSX.read(data, { type: 'array' })
      const firstSheetName = workbook.SheetNames[0]
      const workSheet = workbook.Sheets[firstSheetName]
      const header = getHeaderRow(workSheet) //获取表头
      const results = XLSX.utils.sheet_to_json(workSheet)

      generateData({ header, results }) //传入解析之后的数据
      loading.value = false
      resolve()
    }
    reader.readAsArrayBuffer(rawFile)
  })
}
//根据导入内容,生成数据
const generateData = (excelData) => {
  props.onSuccess && props.onSuccess(excelData)
}
</script>

<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #bbb;
    .icon {
      font-size: 60px;
    }
  }
}
</style>
