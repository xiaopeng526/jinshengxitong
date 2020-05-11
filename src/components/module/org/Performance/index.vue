<template>
  <!--绩效考核-->
  <div class="performance">
    <p class="header"><span type="text">绩效考核</span></p>
    <el-table :data="tablePerformance" style="width: 100%">
      <el-table-column prop="date" label="时间"></el-table-column>
      <el-table-column prop="score" label="分数"></el-table-column>
      <el-table-column prop="level" label="等级"></el-table-column>
      <el-table-column prop="271" label="271"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tablePerformance: []
    };
  },
  methods: {},
  created() {}
};
</script>

<style scoped>
.performance .header {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
}
</style>
