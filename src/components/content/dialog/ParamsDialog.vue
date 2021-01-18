<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose"
  >
    <el-form
      ref="form"
      :model="cateParameter"
      label-width="80px"
      :rules="rules"
    >
      <el-form-item :label="`${title.substring(2)}名称`" prop="name">
        <el-input v-model="cateParameter.name"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleParamsInfo">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      cateParameter: {
        name: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: `请输入${this.title.substring(2)}名称`,
            trigger: "blur",
          },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
  },
  watch: {
    name(val) {
      this.cateParameter.name = val;
    },
  },
  methods: {
    handleClose() {
      this.cateParameter.name = "";
      this.$emit("handleClose");
    },
    handleParamsInfo() {
      this.$refs.form.validate((result) => {
        if (result) {
          this.$emit("handleParamsInfo", this.cateParameter.name);
          this.handleClose();
        }
      });
    },
  },
};
</script>
<style scoped>
</style>