<template>
  <el-card>
    <el-row>
      <el-col>
        <el-button type="primary" @click="handleAddCate">添加分类</el-button>
      </el-col>
    </el-row>
    <tree-table
      class="tree-table"
      :data="cateList"
      :columns="columns"
      :show-index="true"
      index-text="#"
      :border="true"
      :expand-type="false"
      :selection-type="false"
      :show-row-hover="true"
      @handleEditCate="handleEditCate"
    >
    </tree-table>

    <!-- 分页区域 -->
    <categories-pagination />

    <!-- 添加与编辑区域 -->
    <good-dialog :dialog-visible="dialogVisible" @handleClose="handleClose" :title="title" :cat-id="catId" :cat-name="catName"/>
  </el-card>
</template>

<script>
import TreeTable from "components/common/treeTable/TreeTable";
import GoodDialog from 'components/content/dialog/GoodDialog'

import CategoriesPagination from "./childComps/CategoriesPagination";
export default {
  data() {
    return {
      columns: [
        {
          label: "分类名称",
          prop: "cat_name",
        },
        {
          label: "是否有效",
          type: "template",
          template: "isValid",
        },
        {
          label: "排序",
          type: "template",
          template: "sort",
        },
        {
          label: "操作",
          type: "template",
          template: "operation",
        },
      ],
      dialogVisible: false,
      title: '',
      catId: 0,
      catName: ''
    };
  },
  props: {
    cateList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    handleAddCate() {
      this.$emit('handleAddCate')
      this.title = '添加分类'
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    },
    handleEditCate(row) {
      this.dialogVisible = true
      this.title = '编辑分类'
      this.catId = row.cat_id
      this.catName = row.cat_name
    }
  },
  components: {
    TreeTable,
    GoodDialog,
    CategoriesPagination,
  },
};
</script>
<style lang="less" scoped>
.tree-table {
  margin: 15px 0;
}
</style>