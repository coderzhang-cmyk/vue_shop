<template>
  <el-dialog
    title="修改地址"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose"
  >
    <el-form ref="form" :model="addressInfo" :rules="rules" label-width="100px">
      <el-form-item label="省市区/县" prop="division">
        <el-cascader
          v-model="selectAddress"
          :options="cityOptions"
          :props="{ expandTrigger: 'hover' }"
           @change="handleChange"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="详细地址" prop="detail">
        <el-input v-model="addressInfo.detail"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleClose">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import cityOptions from "common/city_data2017_element.js";
export default {
  data() {
    return {
      addressInfo: {
        division: "",
        detail: "",
      },
      rules: {
        division: [{ required: true, message: "请选择区域", trigger: "blur" }],
        detail: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
        ],
      },
      selectAddress: [],
      cityOptions: cityOptions,
    };
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClose() {
      this.$emit("handleClose");
    },
    handleChange() {
      console.log(this.selectAddress);
    }
  },
};
</script>
<style lang="less" scoped>
.el-cascader {
  width: 100%;
}
</style>