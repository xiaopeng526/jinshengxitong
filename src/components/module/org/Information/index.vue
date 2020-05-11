<template>
  <!--基础信息-->
  <div>
    <div class="Mage">
      <p class="header">
        <span type="text">基础信息</span
        ><i class="el-icon-close" @click="close()"></i>
      </p>
      <el-table ref="singleTable" :data="tableData" style="width: 100%">
        <el-table-column prop="workcode" label="工号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="gender" label="性别"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column
          prop="business_unit_name"
          label="事业部"
        ></el-table-column>
        <el-table-column prop="department_name" label="部门"></el-table-column>
        <el-table-column prop="level" label="职级"></el-table-column>
      </el-table>
      <el-table :data="tableData" style="width: 100%; margin-top:20px;">
        <el-table-column prop="rejoined_on" label="入司时间"></el-table-column>
        <el-table-column
          prop="this_level_on"
          label="上次晋级时间"
        ></el-table-column>
        <el-table-column
          prop="level_experience_time"
          label="历练时间"
        ></el-table-column>
        <el-table-column
          prop="level_experience_end_time"
          label="满足历练时间"
        ></el-table-column>
        <el-table-column
          prop="superior_name"
          label="直接上级"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    close() {
      this.$emit("handclose", true);
    }
  },
  created() {}
};
</script>

<style scoped>
.Mage .header {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
}
</style>
