<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
    <el-tree
      :data="allPermission"
      ref="treeRef"
      show-checkbox
      check-strictly
      default-expand-all
      node-key="id"
      :props="defaultProps"
    ></el-tree>
    <template #footer>
      <span class="dialog-fooer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button @click="onConfirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { permissionList } from '@/api/permission'
import { watchSwitchLang } from '@/utils/i18n'
import { rolePermission, distributePermission } from '@/api/role'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
const i18n = useI18n()
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  roleId: {
    type: String,
    required: true
  }
})
// tree 节点
const treeRef = ref()
//获取当前role的权限
const getRolePermission = async (roleId) => {
  const checkedKeys = await rolePermission(roleId)
  treeRef.value.setCheckedKeys(checkedKeys)
}
watch(
  () => props.roleId,
  (val) => {
    if (val) getRolePermission(props.roleId)
  }
)
// 属性结构配置
const defaultProps = {
  children: 'children',
  label: 'permissionName'
}
//获取所有角色权限
const allPermission = ref([])
const getPermissionList = async () => {
  allPermission.value = await permissionList()
  console.log(allPermission)
}
getPermissionList()
watchSwitchLang(getPermissionList)
const emits = defineEmits(['update:modelValue'])
const closed = () => {
  emits('update:modelValue', false)
}
const onConfirm = async () => {
  await distributePermission({
    roleId: props.roleId,
    permissions: treeRef.value.getCheckedKeys()
  })
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  closed()
}
</script>

<style lang="scss" scoped></style>
