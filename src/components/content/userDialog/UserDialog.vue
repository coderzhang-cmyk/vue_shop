<template>
  <el-dialog
    :title="sonUserInfo.title"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose"
  >
    <el-form label-width="70px" ref="addUserForm" :model="user" :rules="rules">
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="
            Object.keys(sonUserInfo.information).length
              ? sonUserInfo.information.username
              : user.username
          "
          :disabled="Object.keys(sonUserInfo.information).length ? true : false"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
        v-if="sonUserInfo.genre === 'add'"
      >
        <el-input v-model="user.password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input
          :value="count.emailCount ? user.email : sonUserInfo.information.email"
          @input="handleInputEmail"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input
          :value="
            count.mobileCount ? user.mobile : sonUserInfo.information.mobile
          "
          @input="handleInputMobile"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleUser">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: this.validateEmail, trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: this.validateMobile, trigger: "blur" },
        ],
      },
      count: {
        emailCount: 0,
        mobileCount: 0,
      },
    };
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    sonUserInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    sonUserInfo: {
      // 表示对象中属性变化的处理函数，这个函数只能叫这个名字
      handler(newVal) {
        for (const key in this.user) {
          this.user[key] = this.sonUserInfo.information[key];
        }
      },
      immediate: true,
      deep: true, // 表示开启深度监听
    },
  },
  methods: {
    validateEmail(rule, value, callback) {
      const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (reg.test(value)) {
        return callback();
      }
      callback(new Error("请输入正确的邮箱格式"));
    },
    validateMobile(rule, value, callback) {
      const reg = /^1[3|4|5|7|8][0-9]{9}$/;
      if (value.match(reg)) {
        return callback();
      }
      callback(new Error("请输入正确的手机格式"));
    },
    handleClose() {
      this.$emit("handleClose", false);
      this.$refs.addUserForm.resetFields();
    },
    handleUser() {
      this.$refs.addUserForm.validate((result) => {
        if (!result) {
          return;
        }
        if (this.sonUserInfo.genre === "add") {
          // 添加角色
          this.$bus.$emit("handleAddUser", this.user);
        } else {
          // 修改角色
          const data = {
            email: this.user.email,
            mobile: this.user.mobile,
          };
          this.$bus.$emit(
            "handleEditUser",
            this.sonUserInfo.information.id,
            data
          );
        }

        this.$emit("handleClose", false);
      });
    },
    handleInputEmail(val) {
      this.count.emailCount = 1;
      this.user.email = val;
    },
    handleInputMobile(val) {
      this.count.mobileCount = 1;
      this.user.mobile = val;
    },
  },
};
</script>
<style scoped>
</style>