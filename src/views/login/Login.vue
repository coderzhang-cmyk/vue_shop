<template>
  <section id="login">
    <div class="box">
      <!-- 展示图片 -->
      <div class="frame"></div>
      <!-- 输入框及按钮 -->
      <login-entry @handleLogin="handleLogin" />
    </div>
  </section>
</template>

<script>
import LoginEntry from "./childComps/LoginEntry";

import { getLogin } from "network/login";
export default {
  data() {
    return {};
  },
  methods: {
    getLogin(data) {
      getLogin(data).then((res) => {
        let type = "";
        if (res.meta.status === 200) {
          type = "success";
          // 后续请求中会使用到token,所以将token保存起来
          console.log(res.data.token);
          sessionStorage.setItem('token',res.data.token)
          this.$router.push('/home')
        } else {
          type = "error";
        }
        this.$message({
          message: res.meta.msg,
          type,
        });
      });
    },

    handleLogin(data) {
      this.getLogin(data);
    },
  },
  components: {
    LoginEntry,
  },
};
</script>
<style lang="less" scoped>
@import url("assets/css/mixin");
#login {
  height: 100vh;
  background-color: #274a6c;
  .box {
    .among();
    width: 450px;
    height: 300px;
    border-radius: 5px;
    background-color: #fff;
    .frame {
      .among();
      top: 10px;
      width: 130px;
      height: 130px;
      border: 1px solid #eeeeee;
      border-radius: 50%;
      background: #fff url("~assets/img/login/login.jpg") no-repeat center 10px/70%
        70%;
      box-shadow: 0 0 10px #eee;
    }
  }
}
</style>