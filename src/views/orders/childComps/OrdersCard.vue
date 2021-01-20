<template>
  <el-card class="box-card">
    <search
      @handleSearch="handleSearch"
      @handleInputContent="handleInputContent"
      :type="['input']"
      btn-text="添加用户"
    />

    <!-- table表格区域 -->
    <el-table :data="goods" style="width: 100%" border stripe>
      <el-table-column label="#" type="index"> </el-table-column>
      <el-table-column prop="order_number" label="订单编号"> </el-table-column>
      <el-table-column prop="order_price" label="订单价格"> </el-table-column>
      <el-table-column label="是否付款">
        <template v-slot="scope">
          <el-tag type="success" v-if="scope.row.order_pay === '1'"
            >已付款</el-tag
          >
          <el-tag type="danger" v-else>未付款</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货"> </el-table-column>
      <el-table-column label="下单时间">
        <template v-slot="scope">
          {{ scope.row.create_time | formatDate }}
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="操作">
        <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEditAddress"></el-button>
        <el-button
          type="success"
          icon="el-icon-location"
          size="mini"
          @click="handleLogistics"
        ></el-button>
      </el-table-column>
    </el-table>

    <!-- 修改地址区域 -->
    <orders-edit-address @handleClose="handleClose" :dialog-visible="dialogVisible"/>

    <!-- 物流信息区域 -->
<orders-logistics @handleCloseLogistics="handleCloseLogistics" :logistics-dialog-visible="logisticsDialogVisible"/>
  </el-card>
</template>

<script>
import Search from "components/content/search/Search";

import OrdersEditAddress from './chilComps/OrdersEditAddress'
import OrdersLogistics from './chilComps/OrdersLogistics'

export default {
  data() {
    return {
      dialogVisible: false,
      logisticsDialogVisible: false
    }
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    handleSearch() {},
    handleInputContent(val) {
      console.log(val);
    },
    handleClose() {
      this.dialogVisible = false
    },
    handleEditAddress() {
      this.dialogVisible = true
    },
    handleLogistics() {
      this.logisticsDialogVisible = true
      this.$emit('handleLogistics')
    },
    handleCloseLogistics() {
      this.logisticsDialogVisible = false
    }
  },

  components: {
    Search,
    OrdersEditAddress,
    OrdersLogistics
  },
};
</script>
<style scoped>
.el-table {
  font-size: 12px;
}
</style>