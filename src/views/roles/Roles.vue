<template>
  <section>
    <breadcrumb :text-list="textList" />
    <roles-card :role-list="roleList" :jurisdiction-list="jurisdictionList" />
  </section>
</template>

<script>
import Breadcrumb from "components/content/breadcrumb/Breadcrumb";

import RolesCard from "./childComps/RolesCard";

import {
  getRoles,
  addRole,
  editRole,
  deleteRole,
  deleteTag,
  getTag,
  addTag,
} from "network/roles";
export default {
  data() {
    return {
      textList: ["权限管理", "角色列表"],
      roleList: [],
      jurisdictionList: [],
      roleId: "",
    };
  },
  created() {
    this.getRoles();
  },
  mounted() {
    this.$bus.$on("handleAddRoleInfo", (res) => {
      this.addRole(res);
    });
    this.$bus.$on("handleEditRoleInfo", (id, data) => {
      this.editRole(Number(id), data);
    });
    this.$bus.$on("handleDeleteRoleInfo", (id) => {
      this.deleteRole(id);
    });
    this.$bus.$on("handleDeleteTag", (role, rightId) => {
      this.deleteTag(role, rightId);
    });
    this.$bus.$on("handleAssignPermissions", (roleId) => {
      this.roleId = roleId;
      this.getTag();
    }),
      this.$bus.$on("handleAddTag", (rids) => {
        this.addTag(this.roleId, { rids });
      });
  },
  methods: {
    getRoles() {
      getRoles().then((res) => {
        if (!res.meta.status === 200) {
          return this.$message.error(res.meta.msg);
        }
        this.roleList = res.data;
      });
    },
    addRole(data) {
      addRole(data).then((res) => {
        this.handleUnifiedOperation(res, 201);
      });
    },
    editRole(id, data) {
      editRole(id, data).then((res) => {
        this.handleUnifiedOperation(res, 200);
      });
    },
    deleteRole(id) {
      deleteRole(id).then((res) => {
        this.handleUnifiedOperation(res, 200);
      });
    },
    deleteTag(role, rightId) {
      deleteTag(Number(role.id), rightId).then((res) => {
        this.handleUnifiedOperation(res, 200, role);
      });
    },
    getTag() {
      getTag().then((res) => {
        this.jurisdictionList = res.data;
      });
    },
    addTag(roleId, data) {
      addTag(roleId, data).then((res) => {
       this.handleUnifiedOperation(res,200)
      });
    },
    handleUnifiedOperation(res, status, role) {
      let type = res.meta.status === status ? "success" : "error";
      this.$message[type](res.meta.msg);

      role ? (role.children = res.data) : this.getRoles();
    },
  },
  components: {
    Breadcrumb,
    RolesCard,
  },
};
</script>
<style scoped>
</style>