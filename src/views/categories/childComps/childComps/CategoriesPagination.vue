<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="params.pagenum"
    :page-sizes="[2, 4, 6, 8]"
    :page-size="params.pagesize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
  >
  
  </el-pagination>
</template>

<script>
export default {
  data() {
    return {
      total: 0,
      params: {},
    };
  },
  mounted() {
    this.$bus.$on("total", (val) => {
      this.total = val;
    });
    this.$bus.$on("params", (params) => {
      this.params = params;
    });
  },
  methods: {
    handleSizeChange(size) {
      this.$bus.$emit("handleSizeChange", size);
    },
    handleCurrentChange(page) {
      this.$bus.$emit("handleCurrentChange", page);
    },
  },
};
</script>
<style scoped>
</style>