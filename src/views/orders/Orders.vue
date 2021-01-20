<template>
  <section>
    <breadcrumb :textList="textList" />
    <orders-card :goods="goods" @handleLogistics="handleLogistics"/>
  </section>
</template>

<script>
import { crumbs } from "common/mixin";

import OrdersCard from "./childComps/OrdersCard";

import { getOrders,getKuaiDi } from "network/orders";
export default {
  data() {
    return {
      textList: ["订单管理", "订单列表"],
      params: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      goods: [],
      total: 0,
      logisticsList: []
    };
  },
  mixins: [crumbs],
  created() {
    this.getOrders(this.params);
  },
  watch: {
    logisticsList(val) {
      this.$bus.$emit('logisticsList',val)
    }
  },
  methods: {
    getOrders(params) {
      getOrders(params).then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error(res.meta.msg);
        }
        this.goods = res.data.goods
        this.total = res.data.total
      });
    },
    getKuaiDi(id) {
      getKuaiDi(id).then(res => {
        console.log(res);
        res.meta.status !== 200 ? this.$message.error(res.meta.msg) : this.logisticsList = res.data
      })
    },
    handleLogistics() {
      this.getKuaiDi(1106975712662)
    }
  },
  components: {
    OrdersCard,
  },
};
</script>
<style scoped>
</style>