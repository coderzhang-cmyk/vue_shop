<template>
  <tree-table
    :data="data"
    :columns="columns"
    :show-index="showIndex"
    :index-text="indexText"
    :border="border"
    :expand-type="expandType"
    :selection-type="selectionType"
    :show-row-hover="showRowHover"
  >
    <!-- 是否有效 -->
    <template slot="isValid" slot-scope="scope">
      <i
        class="el-icon-success"
        v-if="!scope.row.cat_deleted"
        :style="{ color: '#8fe695' }"
      ></i>
      <i class="el-icon-error" v-else></i>
    </template>
    <!-- 排序 -->
    <template slot="sort" slot-scope="scope">
      <el-tag v-if="scope.row.cat_level === 0">一级</el-tag>
      <el-tag v-else-if="scope.row.cat_level === 1" type="success">二级</el-tag>
      <el-tag v-else type="info">三级</el-tag>
    </template>
    <!-- 操作 -->
    <template slot="operation" slot-scope="scope">
      <el-button
        type="primary"
        icon="el-icon-edit"
        size="mini"
        @click="handleEditCate(scope.row)"
        >编辑</el-button
      >
      <el-button
        type="danger"
        icon="el-icon-delete"
        size="mini"
        @click="handleDeleteCate(scope.row.cat_id)"
        >删除</el-button
      >
    </template>
  </tree-table>
</template>

<script>
import { message } from "common/elem";
export default {
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    showIndex: {
      type: Boolean,
      default: false,
    },
    indexText: {
      type: String,
      default: "",
    },
    border: {
      type: Boolean,
      default: false,
    },
    expandType: {
      type: Boolean,
      default: false,
    },
    selectionType: {
      type: Boolean,
      default: false,
    },
    showRowHover: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleEditCate(row) {
      this.$emit("handleEditCate", row);
    },
    handleDeleteCate(id) {
      message(this, "此操作将永久删除该分类, 是否继续?", () => {
        this.$bus.$emit("handleDeleteCate", id);
      });
    },
  },
};
</script>
<style scoped>
</style>