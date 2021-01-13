<template>
  <el-card class="box-card">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="searchContent" clearable>
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="handleSearchUser"
          ></el-button
        ></el-input>
      </el-col>
      <el-col :span="5">
        <el-button type="primary" class="add" @click="handleAddUser"
          >添加用户</el-button
        ></el-col
      >
    </el-row>
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
    <user-dialog
      @handleClose="handleClose"
      :dialog-visible="dialogVisible"
      :sonUserInfo="sonUserInfo"
    />
  </el-card>
</template>

<script>
import UserDialog from "components/content/userDialog/UserDialog";

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
  watch: {
    searchContent(val) {
      this.$emit("handleSearchUser", val);
    },
  },
  methods: {
    handleSearchUser() {
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
    handleAddUser() {
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
      console.log(row);
      this.sonUserInfo.information = row;
    },
    handleDeleteUser(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$bus.$emit('handleDeleteUser',id)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  components: {
    UserDialog,
  },
};
</script>
<style lang="less" scoped>
</style>