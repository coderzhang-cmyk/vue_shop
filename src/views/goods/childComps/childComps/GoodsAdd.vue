<template>
  <section class="add-goods">
    <breadcrumb :text-list="textList" />

    <goods-add-card
      @handleTabClickOne="handleTabClickOne"
      :dynamic-parameter="dynamicParameter"
      @handleTabClickTwo="handleTabClickTwo"
      :static-properties="staticProperties"
    />
  </section>
</template>

<script>
import { crumbs } from "common/mixin";

import GoodsAddCard from "./childComps/GoodsAddCard";
export default {
  data() {
    return {
      textList: ["商品管理", "添加商品"],
    };
  },
  props: {
    dynamicParameter: {
      type: Array,
      default() {
        return [];
      },
    },
    staticProperties: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  mixins: [crumbs],
  methods: {
    handleTabClickOne(cateId) {
      this.$emit("handleTabClickOne", cateId);
    },
    handleTabClickTwo(cateId) {
      this.$emit("handleTabClickTwo", cateId);
    },
  },
  components: {
    GoodsAddCard,
  },
};
</script>
<style scoped>
.add-goods {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #eaedf2;
}
</style>