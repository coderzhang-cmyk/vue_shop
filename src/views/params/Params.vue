<template>
  <section>
    <breadcrumb :text-list="textList" />
    <params-card
      :cate-list="cateList"
      @handleChange="handleChange"
      :table-list="tableList"
      :dynamic-parameter="dynamicParameter"
      @handleParamsInfo="handleParamsInfo"
      @handleEditParams="handleEditParams"
      @handleDeleteParams="handleDeleteParams"
      @handleInputConfirm="handleInputConfirm"
      @editTableList="editTableList"
    />
  </section>
</template>

<script>
import Breadcrumb from "components/content/breadcrumb/Breadcrumb";

import ParamsCard from "./childComps/ParamsCard";

import { getCateData, switchType } from "common/mixin";

import {
  getAttribute,
  addParams,
  editParams,
  deleteParams,
} from "network/categories";
export default {
  data() {
    return {
      textList: ["商品管理", "参数列表"],
      dynamicParameter: "many",
      tableList: [],
    };
  },
  mixins: [getCateData, switchType],
  created() {
    this.getCategories();
  },
  methods: {
    getAttribute(cateId, params) {
      getAttribute(cateId, params).then((res) => {
        for (const iterator of res.data) {
          iterator.attr_vals =
            iterator.attr_vals === "" ? [] : iterator.attr_vals.split(" ");
          iterator.inputVisible = false;
          iterator.inputValue = "";
        }
        this.tableList = res.data;
        console.log(this.tableList);
        params.sel === "many"
          ? (this.dynamicParameter = "many")
          : (this.dynamicParameter = "only");
      });
    },
    addParams(id, data) {
      addParams(id, data).then((res) => {
        this.handleRefine(id, data, res, 201);
      });
    },
    editParams(id, attrId, data, fresh) {
      editParams(id, attrId, data).then((res) => {
        fresh ? "" : this.handleRefine(id, data, res, 200);
      });
    },
    deleteParams(id, attrId, row) {
      deleteParams(id, attrId).then((res) => {
        this.handleRefine(id, row, res, 200);
      });
    },
    handleRefine(id, data, res, status) {
      this.handleSwitchType(res, status);
      this.getAttribute(id, {
        sel: data.attr_sel,
      });
    },
    handleChange(id, params) {
      this.getAttribute(id, params);
    },
    handleParamsInfo(id, data) {
      this.addParams(id, data);
    },
    handleEditParams(cateId, attrId, data) {
      this.editParams(cateId, attrId, data);
    },
    handleDeleteParams(row) {
      this.deleteParams(row.cat_id, row.attr_id, row);
    },
    handleInputConfirm(cateId, attrId, data) {
      this.editParams(cateId, attrId, data, "noFresh");
    },
    editTableList() {
      this.tableList = []
    }
  },
  components: {
    Breadcrumb,
    ParamsCard,
  },
};
</script>
<style scoped>
</style>