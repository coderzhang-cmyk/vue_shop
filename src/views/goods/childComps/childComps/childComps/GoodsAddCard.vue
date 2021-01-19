<template>
  <el-card>
    <!-- 提示区域 -->
    <el-alert
      title="添加商品信息"
      type="info"
      :closable="false"
      center
      show-icon
    >
    </el-alert>

    <!--步骤条  -->
    <el-steps
      :space="200"
      :active="Number(active)"
      finish-status="success"
      align-center
    >
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>

    <!-- tab区域 -->
    <el-form :model="goodsInfo" :rules="rules" label-position="top" ref="form">
      <el-tabs
        tab-position="left"
        v-model="active"
        :before-leave="handleBeforeLeave"
        @tab-click="handleTabClick"
      >
        <el-tab-pane label="基本信息" name="0">
          <el-form-item label="商品名称" prop="goods_name">
            <el-input v-model="goodsInfo.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="goods_price">
            <el-input
              v-model="goodsInfo.goods_price"
              type="number"
              min="1"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品重量" prop="goods_number">
            <el-input
              v-model="goodsInfo.goods_number"
              type="number"
              min="1"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="goods_weight">
            <el-input
              v-model="goodsInfo.goods_weight"
              type="number"
              min="1"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品分类" prop="">
            <el-cascader
              v-model="selectId"
              :options="cateList"
              :props="props"
              clearable
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="1">
          <el-form-item
            :label="item.attr_name"
            v-for="(item, index) in dynamicParameter"
            :key="item.attr_id"
          >
            <el-checkbox-group v-model="item.attr_vals">
              <el-checkbox
                :label="iten"
                v-for="(iten, indey) in item.attr_vals"
                :key="indey"
                border
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品属性">
          <el-form-item
            :label="item.attr_name"
            v-for="(item, index) in staticProperties"
            :key="item.attr_id"
          >
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品图片" name="3">
          <el-upload
            :action="action"
            list-type="picture"
            :headers="headers"
            :on-success="handlePictureSuccess"
            :before-remove="handlePictureRemove"
            :on-preview="handlePicturePreview"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="4">
          <quill-editor v-model="goodsInfo.goods_introduce"> </quill-editor>
          <el-button type="primary" class="add-button" @click="handleAddGood"
            >添加商品</el-button
          >
        </el-tab-pane>
      </el-tabs>
    </el-form>

    <!-- 图片详情区域 -->
    <el-dialog title="图片预览" :visible.sync="dialogVisible" width="50%">
      <img :src="imgUrl" alt="" class="upload-img" />
    </el-dialog>
  </el-card>
</template>

<script>
import { getCateData } from "common/mixin";
export default {
  data() {
    return {
      active: 0,
      goodsInfo: {
        goods_name: "",
        goods_price: 0,
        goods_number: 0,
        goods_cat: [],
        goods_weight: 0,
        goods_introduce: "",
        pics: [],
        attrs: [],
      },
      rules: {
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        goods_price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
        ],
        goods_number: [
          { required: true, message: "请输入商品重量", trigger: "blur" },
        ],
        goods_weight: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
        ],
      },
      props: {
        expandTrigger: "hover",
        label: "cat_name",
        value: "cat_id",
        children: "children",
      },
      selectId: [],
      action: "http://timemeetyou.com:8889/api/private/v1/upload",
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
      imgUrl: "",
      dialogVisible: false,
    };
  },
  props: {
    dynamicParameter: {
      type: Array,
      default() {
        return [];
      },
    },
    staticProperties: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  mixins: [getCateData],
  created() {
    this.getCategories();
  },
  methods: {
    handleChange() {
      this.selectId = this.selectId.length === 3 ? this.selectId : [];
      this.goodsInfo.goods_cat = this.selectId;
    },
    handleBeforeLeave(activeName, oldActiveName) {
      console.log(oldActiveName);
      if (oldActiveName === "0" && this.selectId.length !== 3) {
        this.$message.error("请选择商品分类");
        return false;
      }
    },
    handleTabClick() {
      switch (this.active) {
        case "1":
          this.$emit(
            "handleTabClickOne",
            this.selectId[this.selectId.length - 1]
          );
          break;
        case "2":
          this.$emit(
            "handleTabClickTwo",
            this.selectId[this.selectId.length - 1]
          );
          break;
        default:
          break;
      }
    },
    handlePictureSuccess(response) {
      this.goodsInfo.pics.push({
        pic: response.data.tmp_path,
      });
    },
    handlePictureRemove(response) {
      let i = this.goodsInfo.pics.indexOf(
        (item) => item.pic === response.data.tmp_path
      );
      this.goodsInfo.pics.splice(i);
    },
    handlePicturePreview(file) {
      this.imgUrl = file.response.data.url;
      this.dialogVisible = true;
    },
    handleAddGood() {
      this.$refs.form.validate((result) => {
        if (!result) {
          return;
        }
        this.goodsInfo.goods_cat = this.goodsInfo.goods_cat.join(",");
        this.staticProperties.forEach((item) => {
          this.goodsInfo.attrs.push({
            attr_id: item.attr_id,
            attr_value: item.attr_vals,
          });
        });
        this.dynamicParameter.forEach((item) => {
          this.goodsInfo.attrs.push({
            attr_id: item.attr_id,
            attr_value: item.attr_vals.join(","),
          });
        });
        console.log(this.goodsInfo.attrs);

        this.$bus.$emit("handleAddGood", this.goodsInfo);
        this.$router.push("/goods");
      });
    },
  },
};
</script>
<style scoped>
.upload-img {
  width: 100%;
}
.add-button {
  margin-top: 15px;
}
</style>