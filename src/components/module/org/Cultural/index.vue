<template>
  <div>
    <!--文化评分-->
    <div class="Cultural">
      <p class="header"><span type="text">文化评分</span></p>
      <el-table :data="tableCultural" style="width: 100%">
        <el-table-column prop="date" label="时间"></el-table-column>
        <el-table-column prop="name" label="评分名称"></el-table-column>
        <el-table-column prop="name" label="总分数"></el-table-column>
        <el-table-column prop="271" label="271"></el-table-column>
        <el-table-column prop="level" label="成就客户"></el-table-column>
        <el-table-column prop="department_name" label="创新"></el-table-column>
        <el-table-column
          prop="department_name"
          label="单项分数"
        ></el-table-column>
        <el-table-column prop="department_name" label="合作"></el-table-column>
        <el-table-column prop="department_name" label="务实"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableCultural: []
    };
  },
  methods: {},
  created() {}
};
</script>

<style scoped>
.Cultural .header {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
}
</style>
