<template>
  <section>
    <breadcrumb :text-list="textList" />
    <categories-card :cate-list="cateList" @handleAddCate="handleAddCate" />
  </section>
</template>

<script>
import Breadcrumb from "components/content/breadcrumb/Breadcrumb";

import CategoriesCard from "./childComps/CategoriesCard";

import { getCateData } from "common/mixin";

import {
  getCategories,
  addCategorie,
  editCategorie,
  deleteCategorie,
} from "network/categories";
export default {
  data() {
    return {
      textList: ["商品管理", "商品分类"],
      total: 0,
    };
  },
  watch: {
    params: {
      handler(val) {
        this.$bus.$emit("params", val);
      },
      immediate: true,
    },
    total(val) {
      this.$bus.$emit("total", val);
    },
  },
  mixins: [getCateData],
  created() {
    this.getCategories(this.params);
  },
  mounted() {
    this.$bus.$on("handleSizeChange", (size) => {
      this.params.pagesize = size;
      this.getCategories(this.params);
    });
    this.$bus.$on("handleCurrentChange", (page) => {
      this.params.pagenum = page;
      this.getCategories(this.params);
    });
    this.$bus.$on("handleAddCateInfo", (data) => {
      this.addCategorie(data);
    });
    this.$bus.$on("handleEditCateInfo", (id, data) => {
      this.editCategorie(id, data);
    });
    this.$bus.$on("handleDeleteCate", (id) => {
      this.deleteCategorie(id);
    });
  },
  methods: {
    addCategorie(data) {
      addCategorie(data).then((res) => {
        this.handleGetCartegories(res, 201);
      });
    },
    editCategorie(id, data) {
      editCategorie(id, data).then((res) => {
        this.handleGetCartegories(res, 200);
      });
    },
    deleteCategorie(id) {
      deleteCategorie(id).then((res) => {
        this.handleGetCartegories(res, 200);
      });
    },
    handleGetCartegories(res, status) {
      let type = res.meta.status === status ? "success" : "error";
      this.$message[type](res.meta.msg);
      this.getCategories(this.params);
    },
    handleAddCate() {
      const params = [];
      for (const key in this.params) {
        params[key] = this.params[key];
      }
      params.type = 2;
      params.pagesize = this.total;
      console.log(params);
      this.getCategories(params);
    },
  },
  components: {
    Breadcrumb,
    CategoriesCard,
  },
};
</script>
<style scoped>
</style>