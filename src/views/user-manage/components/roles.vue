<template>
  <div>
    <el-dialog
      :title="$t('msg.excel.roleDialogTitle')"
      :model-value="modelValue"
      @close="closed"
    >
      <el-checkbox-group v-model="userRoleTitleList">
        <el-checkbox
          v-for="item in allRoleList"
          :key="item.id"
          :label="item.title"
        ></el-checkbox>
      </el-checkbox-group>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closed">{{
            $t('msg.universal.cancel')
          }}</el-button>
          <el-button type="primary" @click="onConfirm">{{
            $t('msg.universal.confirm')
          }}</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { roleList, userRoles, updateRole } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
const i18n = useI18n()
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})
// 所有角色
const allRoleList = ref([])
const getListData = async () => {
  allRoleList.value = await roleList()
}
getListData()
watchSwitchLang(getListData)
// 当前用户角色
const userRoleTitleList = ref([])
// 获取当前用户角色
const getUserRoles = async () => {
  const res = await userRoles(props.userId)
  userRoleTitleList.value = res.role.map((item) => item.title)
}
watch(
  () => props.userId,
  (val) => {
    if (val) getUserRoles()
  }
)
//v-model
const emits = defineEmits(['update:modelValue', 'updateRole'])
/**
  确定按钮点击事件
 */
const onConfirm = async () => {
  // 处理数据结构
  const roles = userRoleTitleList.value.map((title) => {
    return allRoleList.value.find((role) => role.title === title)
  })
  await updateRole(props.userId, roles)
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))

  emits('updateRole') //监听角色更新成功事件，重新获取数据
  closed()
}
/**
  关闭按钮点击事件
 */
const closed = () => {
  emits('update:modelValue', false)
}
</script>

<style lang="scss" scoped></style>
