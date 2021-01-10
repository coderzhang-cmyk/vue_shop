<template>
  <el-form ref="form" class="form" :model="form"  :rules="rules">
    <el-form-item prop="username">
      <el-input v-model="form.username">
        <i slot="prefix" class="iconfont icon-touxiang"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input show-password v-model="form.password">
        <i slot="prefix" class="iconfont icon-mima"></i>
      </el-input>
    </el-form-item>
    <el-form-item class="button">
      <el-button type="primary">登录</el-button>
      <el-button type="info">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
         username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
          ]
      }
    };
  },
};
</script>
<style lang="less" scoped>
.form {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 0 20px;
  .button {
    text-align: right;
  }
}
</style>