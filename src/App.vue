<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style lang="less" scoped>
@import url('assets/css/base');
#app {
  height: 100vh;
}
</style>
