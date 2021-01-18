import {
  getCategories,
} from "network/categories";

export const getCateData = {
  data() {
    return {
      params: {
        type: 3,
        pagenum: 1,
        pagesize: 2,
      },
      cateList: [],
    }
  },

  methods: {
    getCategories(params) {
      getCategories(params).then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error(res.meta.msg);
        }

        if (!params) {
          this.cateList = res.data;
        } else if (params.type === 3) {
          this.cateList = res.data.result;
        } else {
          this.secondLevelCateList = res.data;
          this.$bus.$emit("secondLevelCateList", this.secondLevelCateList);
        }
        this.total = res.data.total;
      });
    },
  },
}

export const switchType = {
  methods: {
    handleSwitchType(res, status) {
      let type = res.meta.status === status ? "success" : "error";
      this.$message({
        message: res.meta.msg,
        type,
      });
    },
  },
}