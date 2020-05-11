const showConfirm = function(
  tip: String = "确定要执行此操作?",
  confirmButtonText: String = "确定",
  cancelButtonText: String = "取消"
) {
  return this.$confirm(tip, "提示", {
    confirmButtonText,
    cancelButtonText,
    type: "warning"
  });
};
export default showConfirm;
