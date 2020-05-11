<template>
  <div>
    <!--战功-->
    <div class="Battle">
      <p class="header"><span type="text">战功</span></p>
      <el-table :data="tableBattle" style="width: 100%">
        <el-table-column prop="date" label="时间"></el-table-column>
        <el-table-column prop="type" label="战功类型"></el-table-column>
        <el-table-column prop="level" label="战功等级"></el-table-column>
        <el-table-column prop="desc" label="战功描述"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableBattle: []
    };
  },
  methods: {},
  created() {}
};
</script>

<style scoped>
.Battle .header {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
}
</style>
