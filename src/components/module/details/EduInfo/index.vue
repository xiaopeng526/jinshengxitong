<template>
  <div class="edu-info-component">
    <div class="section-content">
      <section-title :border="false" :title="title"></section-title>
      <!-- {{education_experience_list}} -->
      <el-table :data="education_experience_list" style="width: 100%">
        <el-table-column prop="start_date" label="时间">
          <template slot-scope="scope"
            >{{ scope.row.start_date }}-{{ scope.row.end_date }}</template
          >
        </el-table-column>
        <el-table-column
          prop="school"
          label="学校（从大学起）"
        ></el-table-column>
        <el-table-column prop="major" label="专业"></el-table-column>
        <el-table-column prop="degree" label="学位"></el-table-column>
        <el-table-column prop="study_form" label="是否全年制"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
// 详情页的教育经历部分
export default {
  props: {
    education_experience: {
      type: Array,
      default: () => {
        [];
      }
    }
  },
  data() {
    return {
      title: "教育经历"
    };
  },

  components: {
    "section-title": () => import("@/components/common/SectionTitle/index.vue")
    // "content-frame": () =>
    //   import("@/components/common/SectionContentFrame/index.vue")
  },
  computed: {
    education_experience_list() {
      return this.education_experience;
    }
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
