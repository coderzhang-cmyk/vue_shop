<template>
  <el-dialog
    title="分配权限"
    :visible.sync="jurisdictionDialogVisible"
    width="50%"
    :before-close="handleClose"
  >
    <!-- 树状区域 -->
    <el-tree
      ref="tagTree"
      :data="jurisdictionList"
      :props="jurisdictionProps"
      node-key="id"
      show-checkbox
      default-expand-all
      :default-checked-keys="defaultCheckedKeys"
    ></el-tree>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleAddTag">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      jurisdictionProps: {
        children: "children",
        label: "authName",
      },
      defaultCheckedKeys: [],
    };
  },
  props: {
    jurisdictionDialogVisible: {
      type: Boolean,
      default: false,
    },
    jurisdictionList: {
      type: Array,
      default() {
        return [];
      },
    },
    defaultPermissionList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  watch: {
    defaultPermissionList(val) {
      this.$nextTick(() => {
        let defaultCheckedKeys = [];
        function getJurisdictionId(obj) {
          for (const key in obj) {
            if (obj[key].children) {
              getJurisdictionId(obj[key].children);
            } else {
              defaultCheckedKeys.push(parseInt(obj[key].id));
            }
          }
        }
        getJurisdictionId(val);
        this.defaultCheckedKeys = defaultCheckedKeys;
      });
    },
  },
  methods: {
    handleClose() {
      this.$emit("handleJurisdictionClose");
    },
    handleAddTag() {
      const ids = [
        ...this.$refs.tagTree.getHalfCheckedKeys(),
        ...this.$refs.tagTree.getCheckedKeys(),
      ].join(",");
      this.$bus.$emit("handleAddTag", ids), this.handleClose();
    },
  },
};
</script>
<style scoped>
</style>