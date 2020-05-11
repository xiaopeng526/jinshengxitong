<template>
  <div class="other-resume-component">
    <div class="section-content">
      <section-title :border="false" :title="title"></section-title>
      <content-frame>
        <div style="width: 100%; max-height:300px;overflow: scroll;">
          <el-table :data="other_company_experience_list" style="width: 100%;">
            <el-table-column prop="start_date" label="时间" width="180">
              <template slot-scope="scope"
                >{{ scope.row.start_date }}-{{ scope.row.end_date }}</template
              >
            </el-table-column>
            <el-table-column
              prop="company"
              label="单位"
              width="280"
            ></el-table-column>
            <el-table-column
              prop="post"
              min-width="180"
              label="职位"
            ></el-table-column>
          </el-table>
        </div>
      </content-frame>
    </div>
  </div>
</template>
<script>
// 详情页的其他单位经历部分
export default {
  props: {
    other_company_experience: {
      type: Array,
      default: () => {
        [];
      }
    }
  },
  data() {
    return {
      title: "其他单位经历"
    };
  },
  components: {
    "section-title": () => import("@/components/common/SectionTitle/index.vue"),
    "content-frame": () =>
      import("@/components/common/SectionContentFrame/index.vue")
  },
  computed: {
    other_company_experience_list() {
      return this.other_company_experience;
    }
  }
};
</script>
<style lang="scss" scoped>
.other-resume-component {
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
