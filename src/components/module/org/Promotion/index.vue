<template>
  <div>
    <!--晋升历史-->
    <div class="promotion_head">
      <p class="header"><span type="text">晋升历史</span></p>
      <el-table :data="tablePromotion" style="width: 100%">
        <el-table-column prop="date" label="时间"></el-table-column>
        <el-table-column prop="target_level" label="晋升级别"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tablePromotion: []
    };
  },
  methods: {},
  created() {}
};
</script>

<style scoped>
.promotion_head .header {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
}
</style>
