<template>
  <div class="tal-resume-component">
    <div class="section-content">
      <section-title :border="false" :title="title"></section-title>
      <div style="width: 100%; max-height:300px;overflow: scroll;">
        <el-table :data="tal_experience_list" style="width: 100%;">
          <el-table-column prop="start_date" label="时间" width="200">
            <template slot-scope="scope"
              >{{ scope.row.start_date
              }}{{
                scope.row.end_date ? "-" + scope.row.end_date : ""
              }}</template
            >
          </el-table-column>
          <el-table-column
            prop="department_name"
            label="部门"
          ></el-table-column>
          <el-table-column
            prop="position"
            label="职位"
            width="100"
          ></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
// 详情页的好未来履历部分
export default {
  props: {
    tal_experience: {
      type: Array,
      default: () => {
        [];
      }
    }
  },
  data() {
    return {
      title: "好未来履历"
    };
  },
  components: {
    "section-title": () => import("@/components/common/SectionTitle/index.vue")
    // "content-frame": () =>
    //   import("@/components/common/SectionContentFrame/index.vue")
  },
  computed: {
    tal_experience_list() {
      return this.tal_experience;
    }
  }
};
</script>
<style lang="scss" scoped>
.tal-resume-component {
  .section-content {
    margin-bottom: 20px;
    overflow: scroll;
  }
  & ::v-deep {
    .el-table__header th {
      background: rgba(245, 246, 247, 1);
    }
  }
}
</style>
<style></style>
