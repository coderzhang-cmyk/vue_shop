<template>
  <section>
    <breadcrumb :text-list="textList" />
    <rights-card :right-list="rightList"/>
  </section>
</template>

<script>
import Breadcrumb from "components/content/breadcrumb/Breadcrumb";

import RightsCard from "./childComps/RightsCard";

import { getRights } from "network/rights";
export default {
  data() {
    return {
      textList: ["权限管理", "权限列表"],
      rightList: []
    };
  },
  created() {
    this.getRights();
  },
  methods: {
    getRights() {
      getRights().then((res) => {
        if (!res.meta.status === 200) {
          return this.$message.error(res.meta.msg);
        }
        this.rightList = res.data
      });
    },
  },
  components: {
    Breadcrumb,
    RightsCard,
  },
};
</script>
<style scoped>
</style>