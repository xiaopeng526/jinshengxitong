<template>
  <div class="culture-info-component">
    <div class="section-content">
      <section-title :border="false" :title="title"></section-title>
      <!-- {{education_experience_list}} -->
      <div style="width: 100%; max-height:300px;overflow: scroll;">
        <el-table :data="culture_list" style="width: 100%;">
          <el-table-column
            prop="evaluation_time"
            label="时间"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="evaluation_name"
            label="评分名称"
            width="180"
          ></el-table-column>
          <el-table-column prop="sum_score" label="总分数"></el-table-column>
          <el-table-column prop="_271_level" label="271"></el-table-column>
          <el-table-column prop="scores.scores" label="成就客户">
            <template slot-scope="scope">{{
              scope.row.scores[1] ? scope.row.scores[1].score : ""
            }}</template>
          </el-table-column>
          <el-table-column prop="_271_level" label="创新">
            <template slot-scope="scope">{{
              scope.row.scores[3] ? scope.row.scores[3].score : ""
            }}</template>
          </el-table-column>
          <el-table-column prop="_271_level" label="合作">
            <template slot-scope="scope">{{
              scope.row.scores[4] ? scope.row.scores[4].score : ""
            }}</template>
          </el-table-column>
          <el-table-column prop="_271_level" label="务实">
            <template slot-scope="scope">
              {{ scope.row.scores[2] ? scope.row.scores[2].score : "" }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
// 详情页的文化
export default {
  props: {
    culture_list: {
      type: Array,
      default: () => {
        [];
      }
    }
  },
  data() {
    return {
      title: "文化评分"
    };
  },
  components: {
    "section-title": () => import("@/components/common/SectionTitle/index.vue")
  },
  computed: {}
};
</script>
<style lang="scss" scoped>
.culture-info-component {
  .section-content {
    margin-bottom: 20px;
  }
  & ::v-deep {
    .el-table__header th {
      background: rgba(245, 246, 247, 1);
    }
  }
}
</style>
<style></style>
