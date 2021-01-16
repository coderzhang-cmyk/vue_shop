<template>
  <el-dialog
    :title="sonUserInfo.title ? sonUserInfo.title : roleInfo.title"
    :visible.sync="dialogVisible"
    width="50%"
    ref="dialog"
    @open="handleDialogOpen"
    :before-close="handleClose"
  >
    <el-form
      label-width="70px"
      ref="addUserForm"
      :model="user"
      :rules="userRules"
      v-if="Object.keys(sonUserInfo).length !== 0"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="user.username"
          :disabled="
            Object.keys(sonUserInfo.information).length === 7 ? true : false
          "
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
        <el-input v-model="user.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="user.mobile"></el-input>
      </el-form-item>
    </el-form>
    <el-form
      label-width="80px"
      ref="role"
      v-else
      title="添加角色"
      :model="role"
      :rules="roleRules"
    >
      <el-form-item label="角色名称" prop="roleName">
        <el-input
          v-model="role.roleName"
          :disabled="Object.keys(roleInfo).length === 5 ? true : false"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="roleDesc">
        <el-input v-model="role.roleDesc"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleDialog">确 定</el-button>
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
      role: {
        roleName: "",
        roleDesc: "",
      },
      userRules: {
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
      roleRules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
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
    // 用户信息
    sonUserInfo: {
      type: Object,
      default() {
        return {};
      },
    },
    // 角色信息
    roleInfo: {
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
        if (Object.keys(this.sonUserInfo).length) {
          for (const key in this.user) {
            this.user[key] = this.sonUserInfo.information[key];
          }
        }
      },
      immediate: true,
      deep: true, // 表示开启深度监听
    },
    roleInfo: {
      handler(newVal) {
        for (const key in this.role) {
          this.role[key] = newVal[key];
        }
      },
      immediate: true,
      deep: true,
    },
  },

  methods: {
    handleDialogOpen() {
      this.$nextTick(() => {
        this.$refs.dialog.open(() => {
          let ref = Object.keys(this.sonUserInfo).length
            ? "addUserForm"
            : "role";
          this.$refs[ref].resetFields();
        });
      });
    },
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
    },
    handleDialog() {
      // user校验
      if (Object.keys(this.sonUserInfo).length) {
        // 添加角色,修改角色
        this.$refs.addUserForm.validate((result) => {
          this.processingFunction(result, () => {
            if (this.sonUserInfo.genre === "add") {
              this.$bus.$emit("handleAddUser", this.user);
            } else {
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
          });
        });
      } else {
        // role校验
        this.$refs.role.validate((result) => {
          // 新增角色,修改角色
          this.processingFunction(result, () => {
            Object.keys(this.roleInfo).length === 5
              ? this.$bus.$emit(
                  "handleEditRoleInfo",
                  this.roleInfo.id,
                  this.role
                )
              : this.$bus.$emit("handleAddRoleInfo", this.role);
          });
        });
      }
      this.$emit("handleClose", false);
    },
    processingFunction(result, fn) {
      if (!result) {
        return;
      }
      fn();
    },
  },
};
</script>
<style scoped>
</style>