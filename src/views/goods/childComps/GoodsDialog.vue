<template>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input
          placeholder="请输入内容"
          v-model="inputContent"
          clearable
          class="input-with-select"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="handleSearchGood"
          ></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="handleSkipGoodsAdd">添加商品</el-button>
      </el-col>
    </el-row>

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
  filters: {
    formatDate(val) {
      const date = new Date(val);
      const y = date.getFullYear();
      const m =
        date.getMonth() + 1 > 10
          ? date.getMonth() + 1
          : `0${date.getMonth() + 1}`;
      const d = date.getDate() > 10 ? date.getDate() : `0${date.getDate()}`;
      const h = date.getHours() > 10 ? date.getHours() : `0${date.getHours()}`;
      const b =
        date.getMinutes() > 10 ? date.getMinutes() : `0${date.getMinutes()}`;
      const s =
        date.getSeconds() > 10 ? date.getSeconds() : `0${date.getSeconds()}`;
      return `${y}-${m}-${d} ${h}:${b}:${s}`;
    },
  },
  watch: {
    inputContent(val) {
      console.log(!val);
      !val ? this.$emit("getAllGoods") : "";
    },
  },
  methods: {
    handleSizeChange(size) {
      this.$emit("handleSizeChange", size);
    },
    handleCurrentChange(page) {
      this.$emit("handleCurrentChange", page);
    },
    handleSearchGood() {
      this.inputContent.trim().length !== 0
        ? this.$emit("handleSearchGood", this.inputContent)
        : "";
    },
    handleDeleteGoods(row) {
      message(this, "此操作将永久删除该商品, 是否继续", () => {
        this.$emit("handleDeleteGoods",row.goods_id);
      });
    },
    handleSkipGoodsAdd() {
      this.$router.push('/goods/add')
    }
  },
};
</script>
<style scoped>
.el-table {
  font-size: 12px;
}
</style>