<template>
  <section id="goods">
    <!-- 面包屑区域 -->
    <breadcrumb :text-list="textList" />
    <goods-dialog
      :good-list="goodList"
      :total="total"
      :params="params"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      @handleSearchGood="handleSearchGood"
      @getAllGoods="getAllGoods"
      @handleDeleteGoods="handleDeleteGoods"
    />
    <router-view
      @handleTabClickOne="handleTabClickOne"
      :dynamic-parameter="dynamicParameter"
      @handleTabClickTwo="handleTabClickTwo"
      :static-properties="staticProperties"
    />
  </section>
</template>

<script>
import { crumbs, switchType } from "common/mixin";

import GoodsDialog from "./childComps/GoodsDialog";

import { getAttribute } from "network/categories";
import { getGoods, deleteGoods, addGoods } from "network/goods";
export default {
  data() {
    return {
      textList: ["商品管理", "商品列表"],
      params: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      goodList: [],
      total: 0,
      dynamicParameter: [],
      staticProperties: [],
    };
  },
  mixins: [crumbs, switchType],
  created() {
    this.getGoods(this.params);
  },
  mounted() {
    this.$bus.$on("handleAddGood", (data) => {
      this.addGoods(data);
    });
  },
  methods: {
    getGoods(params) {
      getGoods(params).then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error(res.meta.msg);
        }
        this.goodList = res.data.goods;
        this.total = res.data.total;
      });
    },
    deleteGoods(goodsId) {
      deleteGoods(goodsId).then((res) => {
        this.handleSwitchType(res, 200);
        this.getGoods(this.params);
      });
    },
    addGoods(data) {
      addGoods(data).then((res) => {
        console.log(res);
        this.handleSwitchType(res, 201);
        this.getGoods(this.params);
      });
    },
    getAttribute(cateId, params) {
      getAttribute(cateId, params).then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error(res.meta.msg);
        }
        if (params.sel === "many") {
          res.data.forEach((element) => {
            element.attr_vals = element.attr_vals
              ? element.attr_vals.split(" ")
              : [];
          });
          this.dynamicParameter = res.data;
        } else {
          this.staticProperties = res.data;
        }
      });
    },
    handleSizeChange(size) {
      this.params.pagesize = size;
      this.getGoods(this.params);
    },
    handleCurrentChange(page) {
      this.params.pagenum = page;
      this.getGoods(this.params);
    },
    handleSearchGood(inputContent) {
      this.params.query = inputContent;
      this.getGoods(this.params);
    },
    getAllGoods() {
      this.getGoods(this.params);
    },
    handleDeleteGoods(goodsId) {
      this.deleteGoods(goodsId);
    },
    handleTabClickOne(cateId) {
      this.getAttribute(cateId, {
        sel: "many",
      });
    },
    handleTabClickTwo(cateId) {
      this.getAttribute(cateId, {
        sel: "only",
      });
    },
  },
  components: {
    GoodsDialog,
  },
};
</script>
<style lang="less" scoped>
#goods {
  position: relative;
}
</style>