<template>
  <section id="login">
    <div class="box">
      <!-- 展示图片 -->
      <div class="frame"></div>
      <!-- 输入框及按钮 -->
      <home-entry />
    </div>
  </section>
</template>

<script>
import HomeEntry from "./childComps/HomeEntry";
export default {
  data() {
    return {};
  },
  components: {
    HomeEntry,
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