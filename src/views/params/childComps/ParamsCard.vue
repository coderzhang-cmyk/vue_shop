<template>
  <el-card>
    <el-alert
      title="注意：只允许为第三级分类设置相关参数！"
      type="warning"
      show-icon
    >
    </el-alert>

    <!-- 选择商品区域 -->
    <el-row class="select-row">
      <el-col>
        <span
          >选择商品分类：
          <el-cascader
            v-model="selectId"
            :options="cateList"
            :props="props"
            @change="handleChange"
            clearable
          ></el-cascader
        ></span>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="动态参数" name="many">
        <el-button
          type="primary"
          size="medium"
          :disabled="disabled"
          @click="handleAddParameter"
          >添加参数</el-button
        >
      </el-tab-pane>
      <el-tab-pane label="静态属性" name="only">
        <el-button
          type="primary"
          size="medium"
          :disabled="disabled"
          @click="handleAddAttribute"
          >添加属性</el-button
        >
      </el-tab-pane>
    </el-tabs>
    <!-- table表格区域 -->
    <el-table :data="tableList" stripe border style="width: 100%">
      <el-table-column type="expand">
        <template v-slot="scope">
          <el-tag
            v-if="scope.row.attr_vals"
            v-for="(item, index) in scope.row.attr_vals"
            :key="index"
            closable
            @close="handleTagClose(scope.row, index)"
            >{{ item }}</el-tag
          >
          <el-input
            class="input-new-tag"
            v-if="scope.row.inputVisible"
            v-model="scope.row.inputValue"
            ref="saveInput"
            size="small"
            @keyup.enter.native="handleInputConfirm(scope.row)"
            @blur="handleInputConfirm(scope.row)"
          >
          </el-input>
          <el-button v-else size="small" @click="showInput(scope.row)"
            >+ New Tag</el-button
          >
        </template>
      </el-table-column>
      <el-table-column type="index" label="#"> </el-table-column>
      <el-table-column
        prop="attr_name"
        :label="dynamicParameter !== 'many' ? '属性名称' : '参数名称'"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="handleEditParams(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="handleDeleteParams(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加与修改弹出框区域 -->
    <params-dialog
      :dialog-visible="dialogVisible"
      @handleClose="handleClose"
      :title="title"
      @handleParamsInfo="handleParamsInfo"
      :name="name"
    />
  </el-card>
</template>

<script>
import { message } from "common/elem";

import ParamsDialog from "components/content/dialog/ParamsDialog";

export default {
  data() {
    return {
      props: {
        expandTrigger: "hover",
        value: "cat_id",
        label: "cat_name",
      },
      selectId: [],
      activeName: "many",
      disabled: true,
      dialogVisible: false,
      title: "",
      name: "",
      currentLineInfo: {}, //当前行信息
      inputVisible: false,
      inputValue: "",
    };
  },
  props: {
    cateList: {
      type: Array,
      default() {
        return [];
      },
    },
    tableList: {
      type: Array,
      default() {
        return [];
      },
    },
    dynamicParameter: {
      type: String,
      default: "",
    },
  },
  watch: {
    selectId(val) {},
  },
  methods: {
    handleChange() {
      let result = this.selectId.length !== 3;
      if (result) {
        this.selectId = [];
       
       this.$emit('editTableList')
      }
      this.disabled = result ? true : false;
      this.handleParams();
    },
    handleClick() {
      this.handleParams();
    },
    handleParams() {
      if (!(this.selectId.length !== 3)) {
        const params = {
          sel: this.activeName,
        };
        this.$emit(
          "handleChange",
          this.selectId[this.selectId.length - 1],
          params
        );
      }
    },
    handleAddParameter() {
      this.title = "添加参数";
      this.dialogVisible = true;
    },
    handleAddAttribute() {
      this.title = "添加属性";
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    handleParamsInfo(name) {
      this.attr_name = name;
      const data = {
        attr_name: name,
        attr_sel: this.activeName,
      };
      if (this.name) {
        this.$emit(
          "handleEditParams",
          this.currentLineInfo.cat_id,
          this.currentLineInfo.attr_id,
          data
        );
      } else {
        this.$emit(
          "handleParamsInfo",
          this.selectId[this.selectId.length - 1],
          data
        );
      }
    },
    handleEditParams(row) {
      this.currentLineInfo = row;
      this.title = row.attr_sel === "many" ? "修改参数" : "修改属性";
      this.name = row.attr_name;
      this.dialogVisible = true;
    },
    handleDeleteParams(row) {
      let type = row.attr_sel === "many" ? "参数" : "属性";
      message(this, `此操作将永久删除该${type}, 是否继续?`, () => {
        this.$emit("handleDeleteParams", row);
      });
    },
    handleTagClose(row, index) {
      row.attr_vals.splice(index);
      this.handleMerge(row);
    },
    handleInputConfirm(row) {
      row.inputVisible = false;
      if (row.inputValue.trim().length !== 0) {
        row.attr_vals.push(row.inputValue);
        this.handleMerge(row);
        row.inputValue = "";
      }
    },
    showInput(row) {
      row.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveInput.$refs.input.focus();
      });
    },
    handleMerge(row) {
      const data = {
        attr_name: row.attr_name,
        attr_sel: row.attr_sel,
        attr_vals: row.attr_vals.join(" "),
      };
      this.$emit("handleInputConfirm", row.cat_id, row.attr_id, data);
    },
  },
  components: {
    ParamsDialog,
  },
};
</script>
<style lang="less" scoped>
.select-row {
  margin: 15px 0;
}
.el-tag {
  margin-right: 15px;
  margin-bottom: 10px;
}
.input-new-tag {
  width: 120px;
}
</style>