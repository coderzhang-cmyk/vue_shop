<template>
<el-card>
  <el-table :data="rightList" style="width: 100%" border stripe>
    <el-table-column type="index" label="#"> </el-table-column>
    <el-table-column label="权限管理" prop="authName"> </el-table-column>
    <el-table-column label="路径" prop="path"> </el-table-column>
    <el-table-column label="权限等级">
      <template v-slot="scope">
        <el-tag v-if="scope.row.level === '0'">等级一</el-tag>
        <el-tag type="success" v-else-if="scope.row.level === '1'">等级二</el-tag>
        <el-tag type="info" v-else>等级三</el-tag>
      </template>
    </el-table-column>
  </el-table>

  <!-- 添加角色区域 -->

</el-card>
</template>

<script>
export default {
  props: {
    rightList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
<style scoped>
</style>