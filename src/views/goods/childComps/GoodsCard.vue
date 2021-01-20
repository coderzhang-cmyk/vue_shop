<template>
  <el-card>
    <search
      @handleSearch="handleSearch"
      @handleClickButton="handleClickButton"
      @handleInputContent="handleInputContent"
      :type="['input', 'button']"
      btn-text="添加商品"
    />

    <!-- table表格区域 -->
    <el-table :data="goodList" stripe border>
      <el-table-column type="index" label="#"> </el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="550">
      </el-table-column>
      <el-table-column prop="goods_price" label="商品价格"> </el-table-column>
      <el-table-column prop="goods_weight" label="商品重量"> </el-table-column>
      <el-table-column prop="add_time" label="创建时间" width="180">
        <template v-slot="scope">
          {{ scope.row.add_time | formatDate }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template v-slot="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="handleDeleteGoods(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="params.pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="params.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </el-card>
</template>

<script>
import { message } from "common/elem";

import Search from "components/content/search/Search";
export default {
  data() {
    return {
      inputContent: "",
    };
  },
  props: {
    goodList: {
      type: Array,
      default() {
        return [];
      },
    },
    total: {
      type: Number,
      default: 0,
    },
    params: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    handleSizeChange(size) {
      this.$emit("handleSizeChange", size);
    },
    handleCurrentChange(page) {
      this.$emit("handleCurrentChange", page);
    },
    handleSearch() {
      this.inputContent.trim().length !== 0
        ? this.$emit("handleSearchGood", this.inputContent)
        : "";
    },
    handleDeleteGoods(row) {
      message(this, "此操作将永久删除该商品, 是否继续", () => {
        this.$emit("handleDeleteGoods", row.goods_id);
      });
    },
    handleClickButton() {
      this.$router.push("/goods/add");
    },
    handleInputContent(val) {
      this.inputContent = val;
      !val ? this.$emit("getAllGoods") : "";
    },
  },
  components: {
    Search,
  },
};
</script>
<style scoped>
.el-table {
  font-size: 12px;
}
</style>