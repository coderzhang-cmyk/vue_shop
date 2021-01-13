<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">{{
      textList[0]
    }}</el-breadcrumb-item>
    <el-breadcrumb-item
      v-for="(item, index) in textList.slice(1)"
      :key="index"
      >{{ item }}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>

<script>
export default {
  props: {
    textList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 12px;
}
</style>