<template>
  <el-dialog
    title="分配角色"
    :visible.sync="assignRoleVisible"
    width="50%"
    :before-close="handleAssignRoleClose"
  >
    <p>当前的用户：{{ userAssignRoleInfo.username }}</p>
    <p>当前的角色：{{ userAssignRoleInfo.role_name }}</p>
    <p>
      分配新角色：
      <el-select v-model="activeId" placeholder="请选择">
        <el-option
          v-for="item in roleList"
          :key="item.id"
          :label="item.roleName"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </p>

    <span slot="footer" class="dialog-footer">
      <el-button @click="handleAssignRoleClose">取 消</el-button>
      <el-button type="primary" @click="handleAssignRole">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      roleList: [],
      activeId: '', //当下来菜单中的某一个值被选择之后,其id就会变成activeId的值
    }
  },
  props: {
    assignRoleVisible: {
      type: Boolean,
      default: false,
    },
    userAssignRoleInfo: {
      type: Object,
      dfault() {
        return {};
      },
    },
  },
  mounted() {
    this.$bus.$on('getRoles',data => {
    this.roleList = data
    })
  },
  methods: {
    handleAssignRoleClose() {
      this.activeId = ''
      this.$emit("handleAssignRoleClose");
    },
    handleAssignRole() {
      const data = {
        rid: this.activeId
      }
      this.$bus.$emit('handleAssignRole',this.userAssignRoleInfo.id,data)
      this.handleAssignRoleClose()
    }
  },
};
</script>
<style scoped>
</style>