<template>
  <section>
    <!-- 面包屑区域 -->
    <breadcrumb :text-list="textList" />
    <!-- 卡片区域 -->
    <users-card
      :user-info="userInfo"
      @handleSearchUser="handleSearchUser"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      @handleSwitchChange="handleSwitchChange"
      @handleUserAssignRole="handleUserAssignRole"
    />
  </section>
</template>

<script>
import Breadcrumb from "components/content/breadcrumb/Breadcrumb";

import UsersCard from "./childComps/UsersCard";

import { switchType } from "common/mixin";

import {
  getUsers,
  modifyUsersState,
  addUser,
  editUser,
  deleteUser,
  getRoles,
  assignRoles,
} from "network/users";
export default {
  data() {
    return {
      textList: ["用户管理", "用户列表"],
      userInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2,
        total: 0,
        userList: [],
      },
    };
  },
  mixins: [switchType],
  created() {
    this.getUsers(
      this.userInfo.pagenum,
      this.userInfo.pagesize,
      this.userInfo.query
    );
  },
  mounted() {
    this.$bus.$on("handleAddUser", (data) => {
      this.addUser(data);
    });
    this.$bus.$on("handleEditUser", (id, data) => {
      this.editUser(id, data);
    });
    this.$bus.$on("handleDeleteUser", (id) => {
      this.deleteUser(id);
    });
    this.$bus.$on("handleAssignRole", (id, data) => {
      this.assignRoles(id, data);
    });
  },
  methods: {
    getUsers(pagenum, pagesize, query) {
      getUsers(pagenum, pagesize, query).then((res) => {
        if (res.meta.status === 200) {
          this.userInfo.userList = res.data.users;
          this.userInfo.total = res.data.total;
        } else {
          this.$message.error(res.meta.msg);
        }
      });
    },
    modifyUsersState(user_id, type) {
      modifyUsersState(user_id, type).then((res) => {
        this.handleSwitchType(res, 200);
      });
    },
    addUser(data) {
      addUser(data).then((res) => {
        this.handleSwitchType(res, 201);
        this.handleGetUser();
      });
    },
    editUser(id, data) {
      editUser(id, data).then((res) => {
        this.handleSwitchType(res, 200);
        this.handleGetUser();
      });
    },
    deleteUser(id) {
      deleteUser(id).then((res) => {
        this.handleSwitchType(res, 200);
        this.handleGetUser();
      });
    },
    getRoles() {
      getRoles().then((res) => {
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
        this.$bus.$emit("getRoles", res.data);
      });
    },
    assignRoles(id, data) {
      assignRoles(id, data).then((res) => {
        this.handleSwitchType(res, 200);
        this.handleGetUser();
      });
    },
    handleGetUser() {
      this.getUsers(
        this.userInfo.pagenum,
        this.userInfo.pagesize,
        this.userInfo.query
      );
    },
    handleSearchUser(query) {
      this.userInfo.query = query;
      this.getUsers(this.userInfo.pagenum, this.userInfo.pagesize, query);
    },
    handleSizeChange(val) {
      this.userInfo.pagesize = val;
      this.getUsers(this.userInfo.pagenum, val, this.userInfo.query);
    },
    handleCurrentChange(page) {
      this.userInfo.pagenum = page;
      this.getUsers(page, this.userInfo.pagesize, this.userInfo.query);
    },
    handleSwitchChange(row) {
      this.modifyUsersState(row.id, row.mg_state);
    },
    handleUserAssignRole() {
      this.getRoles();
    },
  },
  components: {
    Breadcrumb,
    UsersCard,
  },
};
</script>
<style scoped>
</style>