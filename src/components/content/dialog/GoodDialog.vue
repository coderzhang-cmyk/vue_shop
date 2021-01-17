<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose"
  >
    <el-form ref="goodDialog" :model="data" label-width="100px" :rules="rules">
      <el-form-item label="分类名称：" prop="cat_name">
        <el-input v-model="data.cat_name"></el-input>
      </el-form-item>
      <el-form-item label="父级分类：" v-show="title === '添加分类'">
        <el-cascader
          v-model="slectId"
          :options="options"
          :props="props"
          clearable
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleCateInfo">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      data: {
        cat_name: "",
        cat_pid: 0,
        cat_level: 0,
      },
      rules: {
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
      slectId: [],
      options: [],
      props: {
        expandTrigger: "hover",
        value: "cat_id",
        label: "cat_name",
        children: "children",
        checkStrictly: true,
      },
    };
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    catId: {
      type: Number,
      default: 0,
    },
    catName: {
      type: String,
      default: ''
    }
  },
  watch: {
    catName(val) {
      this.data.cat_name = val
    }
  },
  mounted() {
    this.$bus.$on("secondLevelCateList", (res) => {
      this.options = res;
    });
  },
  methods: {
    handleClose() {
      this.$refs.goodDialog.resetFields();
      this.slectId = [];
      this.data.cat_name = ''
      this.$emit("handleClose");
    },
    handleChange() {
      if (Object.keys(this.slectId).length) {
        this.data.cat_pid = this.slectId[this.slectId.length - 1];
        this.data.cat_level = this.slectId.length;
        return;
      }
      this.data.cat_pid = 0;
      this.data.cat_level = 0;
    },
    handleCateInfo() {
      this.$refs.goodDialog.validate((result) => {
        if (result) {
          if (this.title === "添加分类") {
            this.$bus.$emit("handleAddCateInfo", this.data);
          } else {
            const data = {
              cat_name: this.data.cat_name,
            };
            this.$bus.$emit("handleEditCateInfo", this.catId, data);
          }

          this.handleClose();
        }
      });
    },
  },
};
</script>
<style scoped>
.el-cascader {
  width: 100%;
}
</style>