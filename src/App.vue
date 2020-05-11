<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  mounted() {
    var bpitCommonData = require("bpit.common.data");
    if (window.bpit_elk_page_start_time) {
      const end_time = new Date().getTime();
      const load_time = end_time - window.bpit_elk_page_start_time;
      bpitCommonData.log({
        group: "talents",
        project: "FE-PC-PROMOTION",
        env: process.env.VUE_APP_RDENV,
        page: "index",
        time: load_time
      });
    }
  }
};
</script>

<style lang="scss">
body {
  margin: 0px;
  padding: 0px;
  background: #52ddab;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  user-select: none;
}

#app {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
}
.link-like {
  cursor: pointer;

  color: #5dc5b2;
  line-height: 16px;
  font-size: 13px;
}
.el-drawer__body {
  overflow: auto;
}
.el-tree-node > .el-tree-node__children {
  overflow: initial !important;
}
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
