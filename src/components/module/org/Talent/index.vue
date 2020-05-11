<template>
  <div>
    <!--人才培养-->
    <div class="talent">
      <p class="header"><span type="text">人才培养</span></p>
      <el-table :data="tableTalent" style="width: 100%">
        <el-table-column prop="date" label="时间"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column
          prop="before_level"
          label="晋升前职级"
        ></el-table-column>
        <el-table-column
          prop="after_level"
          label="晋升后职级"
        ></el-table-column>
        <el-table-column prop="after_post" label="晋升后岗位"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableTalent: []
    };
  },
  methods: {},
  created() {}
};
</script>

<style scoped>
.talent .header {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
}
</style>
