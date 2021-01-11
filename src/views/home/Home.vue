<template>
  <section id="home">
      <el-button type="info" @click="handleSignOut">退出</el-button>
  </section>
</template>

<script>
export default {
  methods: {
    handleSignOut() {
      this.$router.push('/login')

      sessionStorage.clear()
    }
  }
}

</script>
<style lang="less" scoped>
#home {

}
</style>