<template>
  <div>
    <el-card>
      <el-table :data="allRoles" border style="width: 100%">
        <el-table-column
          type="index"
          :label="$t('msg.role.index')"
          width="120"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.role.name')"
          prop="title"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.role.desc')"
          prop="describe"
        ></el-table-column>
        <el-table-column
          #default="{ row }"
          :label="$t('msg.role.action')"
          width="200"
        >
          <el-button
            type="primary"
            size="small"
            @click="onDistributePermissionClick(row)"
            v-permission="['distributePermission']"
            >{{ $t('msg.role.assignPermissions') }}</el-button
          >
        </el-table-column>
      </el-table>
    </el-card>
    <distribute-permission
      v-model="distributePermissionVisible"
      :roleId="selectRoleId"
    ></distribute-permission>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { roleList } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
import distributePermission from './components/DistributePermission'
/**
 * 分配权限
 */
const distributePermissionVisible = ref(false)
const selectRoleId = ref('')
const onDistributePermissionClick = (row) => {
  selectRoleId.value = row.id
  distributePermissionVisible.value = true
}
//获取角色信息
const allRoles = ref([])
const getRoleList = async () => {
  allRoles.value = await roleList()
  console.log(allRoles.value)
}
getRoleList()
watchSwitchLang(getRoleList)
</script>

<style lang="scss" scoped></style>
