<template>
  <el-row :gutter="20">
    <el-col :span="8"  v-if="type.includes('input')">
      <el-input placeholder="请输入内容" v-model="inputContent" clearable>
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="handleSearch"
        ></el-button>
      </el-input>
    </el-col>
    <el-col :span="4"  v-if="type.includes('button')">
      <el-button type="primary" @click="handleClickButton">{{btnText}}</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      inputContent: ''
    }
  },
  props: {
    type: {
      type: Array,
      default() {
        return []
      }
    },
    btnText: {
      type: String,
      default: ''
    }
  },
  watch: {
    inputContent(val) {
      this.$emit('handleInputContent',val)
    }
  },
  methods: {
    handleSearch() {
      this.$emit("handleSearch");
    },
    handleClickButton() {
      this.$emit("handleClickButton");
    },
  },
};
</script>
<style scoped>
</style>