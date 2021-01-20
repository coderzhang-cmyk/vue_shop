<template>
  <el-dialog
    title="物流信息"
    :visible.sync="logisticsDialogVisible"
    width="50%"
    :before-close="handleCloseLogistics"
  >
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in logisticsList"
        :key="index"
        :timestamp="activity.time"
        
      color="#0bbd87"
      >
        {{ activity.context }}
      </el-timeline-item>
    </el-timeline>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCloseLogistics">取 消</el-button>
      <el-button type="primary" @click="handleCloseLogistics">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      logisticsList: []
    }
  },
  props: {
    logisticsDialogVisible: {
      type: Boolean,
      default: [],
    },
  },
  mounted() {
    this.$bus.$on('logisticsList',val => {
      this.logisticsList = val
    })
  },
  methods: {
    handleCloseLogistics() {
      this.$emit("handleCloseLogistics");
    },
  },
};
</script>
<style scoped>
</style>