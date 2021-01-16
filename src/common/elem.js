export function message(This, text, callback) {
  This.$confirm(text, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      callback()
    })
    .catch(() => {
      This.$message({
        type: "info",
        message: "已取消删除",
      });
    });
}