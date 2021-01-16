<template>
  <el-card>
    <el-row>
      <el-col>
        <el-button type="primary" @click="handleAddRole">添加角色</el-button>
      </el-col>
    </el-row>
    <!-- 表格区域 -->
    <el-table :data="roleList" style="width: 100%" border stripe>
      <el-table-column type="expand">
        <template v-slot="scope">
          <el-row
            v-for="(item, index) in scope.row.children"
            :class="['bb', index ? '' : 'bt', 'center']"
            :key="item.id"
          >
            <el-col :span="5">
              <el-row>
                <el-tag @close="handleDeleteTag(scope.row, item.id)" closable>
                  {{ item.authName }}</el-tag
                >
                <i class="el-icon-caret-right"></i>
              </el-row>
            </el-col>
            <el-col :span="19">
              <el-row
                v-for="(iten, indey) in item.children"
                :key="iten.id"
                :class="[indey ? 'bt' : '', 'center']"
              >
                <el-col :span="6">
                  <el-tag
                    type="success"
                    @close="handleDeleteTag(scope.row, iten.id)"
                    closable
                  >
                    {{ iten.authName }}</el-tag
                  >
                  <i class="el-icon-caret-right"></i>
                </el-col>
                <el-col :span="18">
                  <el-tag
                    type="warning"
                    v-for="(iteo, indez) in iten.children"
                    :key="iteo.id"
                    closable
                    @close="handleDeleteTag(scope.row, iteo.id)"
                  >
                    {{ iteo.authName }}</el-tag
                  >
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" label="#"> </el-table-column>
      <el-table-column label="角色名称" prop="roleName"> </el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"> </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="handleEditRole(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="handleDeleteRole(scope.row)"
            >删除</el-button
          >
          <el-button
            type="warning"
            icon="el-icon-setting"
            size="mini"
            @click="handleAssignPermissions(scope.row)"
            >分配权限</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <Dialog
      :dialog-visible="dialogVisible"
      @handleClose="handleClose"
      :role-info="roleInfo"
    />

    <!-- 分配权限区域 -->
    <roles-jurisdiction
      :jurisdiction-dialog-visible="jurisdictionDialogVisible"
      @handleJurisdictionClose="handleJurisdictionClose"
      :jurisdiction-list="jurisdictionList"
      :default-permission-list="defaultPermissionList"
    />
  </el-card>
</template>

<script>
import Dialog from "components/content/dialog/Dialog";

import RolesJurisdiction from "./childComps/RolesJurisdiction";

import { message } from "common/elem";

export default {
  data() {
    return {
      dialogVisible: false,
      roleInfo: {},
      jurisdictionDialogVisible: false,
      defaultPermissionList: [], //默认权限列表
    };
  },
  props: {
    roleList: {
      type: Array,
      default() {
        return [];
      },
    },
    jurisdictionList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    handleAddRole() {
      this.dialogVisible = true;
      this.roleInfo = {};
      this.roleInfo.title = "添加角色";
    },
    handleClose(close) {
      this.dialogVisible = close;
    },
    handleEditRole(row) {
      this.roleInfo = row;
      this.roleInfo.title = "修改角色";
      this.dialogVisible = true;
    },
    handleDeleteRole(row) {
      message(this, "此操作将永久删除该角色, 是否继续?", () => {
        this.$bus.$emit("handleDeleteRoleInfo", parseInt(row.id));
      });
    },
    handleDeleteTag(role, rightId) {
      message(this, "此操作将永久删除该权限, 是否继续?", () => {
        this.$bus.$emit("handleDeleteTag", role, rightId);
      });
    },
    handleAssignPermissions(row) {
      this.$bus.$emit("handleAssignPermissions",row.id);
      this.defaultPermissionList = row.children;
      this.jurisdictionDialogVisible = true;
    },
    handleJurisdictionClose() {
      this.jurisdictionDialogVisible = false;
    },
  },
  components: {
    Dialog,
    RolesJurisdiction,
  },
};
</script>
<style lang="less" scoped>
@import url("assets/css/mixin");
.el-tag {
  margin: 7px;
}
.bt {
  border-top: 1px solid #eaeaea;
}
.bb {
  border-bottom: 1px solid #eaeaea;
}
.center {
  .set-flex();
}
</style>