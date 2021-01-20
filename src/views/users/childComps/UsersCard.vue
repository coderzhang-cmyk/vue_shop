<template>
  <el-card class="box-card">
    <search
      @handleSearch="handleSearch"
      @handleClickButton="handleClickButton"
      @handleInputContent="handleInputContent"
      :type="['input', 'button']"
      btn-text="添加用户"
    />
    <el-table :data="userInfo.userList" style="width: 100%" stripe border>
      <el-table-column label="#" type="index" width="50"> </el-table-column>
      <el-table-column label="姓名" prop="username"> </el-table-column>
      <el-table-column label="邮箱" prop="email"> </el-table-column>
      <el-table-column label="电话" prop="mobile"> </el-table-column>
      <el-table-column label="角色" prop="role_name"> </el-table-column>
      <el-table-column label="状态">
        <!-- 使用作用域插槽拿到子组件中的数据,重新以某种形式进行展示,scoped.row表示这一行显示的内容 -->
        <template v-slot="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#389aff"
            @change="handleSwitchChange(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template v-slot="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="handleEditUserInfo(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="handleDeleteUser(scope.row.id)"
          ></el-button>
          <el-tooltip
            effect="dark"
            content="分配角色"
            placement="top"
            :enterable="false"
          >
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="handleUserAssignRole(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="userInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="userInfo.total"
    >
    </el-pagination>

    <!-- 添加用户区域与修改用户信息区域 -->
    <Dialog
      @handleClose="handleClose"
      :dialog-visible="dialogVisible"
      :sonUserInfo="sonUserInfo"
    />
    <!-- 分配角色区域 -->
    <user-assign-role
      :assign-role-visible="assignRoleVisible"
      @handleAssignRoleClose="handleAssignRoleClose"
      :user-assign-role-info="userAssignRoleInfo"
    />
  </el-card>
</template>

<script>
import Dialog from "components/content/dialog/Dialog";
import Search from "components/content/search/Search";

import UserAssignRole from "./childComps/UserAssignRole";

import { message } from "common/elem";
export default {
  data() {
    return {
      searchContent: "",
      dialogVisible: false,
      sonUserInfo: {
        genre: "",
        title: "",
        information: {},
      },
      assignRoleVisible: false,
      userAssignRoleInfo: {},
    };
  },
  props: {
    userInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    handleSearch() {
      this.$emit("handleSearchUser", this.searchContent);
    },
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(page) {
      this.$emit("handleCurrentChange", page);
    },
    handleSwitchChange(row) {
      this.$emit("handleSwitchChange", row);
    },
    handleClickButton() {
      this.dialogVisible = true;
      (this.sonUserInfo.genre = "add"), (this.sonUserInfo.title = "添加用户");
    },
    handleClose(close) {
      this.dialogVisible = close;
      this.sonUserInfo.information = {};
    },
    handleEditUserInfo(row) {
      this.dialogVisible = true;

      (this.sonUserInfo.genre = "edit"), (this.sonUserInfo.title = "修改用户");
      this.sonUserInfo.information = row;
    },
    handleDeleteUser(id) {
      message(this, "此操作将永久删除该用户, 是否继续?", () => {
        this.$bus.$emit("handleDeleteUser", id);
      });
    },
    handleUserAssignRole(row) {
      this.userAssignRoleInfo = row;
      this.$emit("handleUserAssignRole");
      this.assignRoleVisible = true;
    },
    handleAssignRoleClose() {
      this.assignRoleVisible = false;
    },
    handleInputContent(val) {
      this.searchContent = val;
      this.$emit("handleSearchUser", val);
    },
  },
  components: {
    Dialog,
    Search,
    UserAssignRole,
  },
};
</script>
<style lang="less" scoped>
</style>