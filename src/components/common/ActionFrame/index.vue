<template>
  <div class="action-frame-component">
    <slot></slot>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.action-frame-component {
  overflow: hidden;
  padding: 10px 15px;
  background: #fff;
  border-top: solid 1px #4a7a72;
  & ::v-deep .el-button {
    // color: #4a7a72;
    // border-color: #4a7a72;
  }
  & ::v-deep .el-button--primary {
    // color: white;
  }
}
</style>
