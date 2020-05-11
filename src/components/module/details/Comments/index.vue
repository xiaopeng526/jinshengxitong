<template>
  <div class="edu-info-component">
    <div class="section-content">
      <section-title :border="false" :title="title"></section-title>
      <!-- {{education_experience_list}} -->
      <div style="width: 100%; max-height:300px;overflow: scroll;">
        <el-table :data="comments" style="width: 100%;">
          <el-table-column
            prop="date"
            label="时间"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="evaluation_name"
            label="标签"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="evaluator_name"
            label="发布人"
            width="80"
          ></el-table-column>
          <el-table-column
            prop="culture_advantage"
            label="评语"
          ></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
// 详情页的评语
export default {
  props: {
    comments: {
      type: Array,
      default: () => {
        [];
      }
    }
  },
  data() {
    return {
      title: "近一年评语"
    };
  },

  components: {
    "section-title": () => import("@/components/common/SectionTitle/index.vue")
    // "content-frame": () =>
    //   import("@/components/common/SectionContentFrame/index.vue")
  },
  computed: {
    // culture_list() {
    //   return this.achievements;
    // }
  }
};
</script>
<style lang="scss" scoped>
.edu-info-component {
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
