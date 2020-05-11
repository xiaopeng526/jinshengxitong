<template>
  <div>
    <!--近一年评语-->
    <div class="Comments ">
      <p class="header"><span type="text">近一年评语</span></p>
      <el-table :data="tableComments" style="width: 100%">
        <el-table-column prop="date" label="时间"></el-table-column>
        <el-table-column prop="tag" label="标签"></el-table-column>
        <el-table-column prop="operator_name" label="发布人"></el-table-column>
        <el-table-column prop="evaluator" label="评语"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableComments: []
    };
  },
  methods: {},
  created() {}
};
</script>

<style scoped>
.Comments .header {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
}
</style>
