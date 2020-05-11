<template>
  <div class="edu-info-component">
    <div class="section-content">
      <section-title :border="false" :title="title"></section-title>
      <!-- {{education_experience_list}} -->
      <el-table
        :data="contributions"
        style="width: 100%;max-height:300px;overflow: scroll;"
      >
        <el-table-column
          prop="effect_date"
          label="时间"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="type"
          label="战功类型"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="level"
          label="战功等级"
          width="100"
        ></el-table-column>
        <el-table-column prop="content" label="战功描述"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
// 详情页的战功
export default {
  props: {
    contributions: {
      type: Array,
      default: () => {
        [];
      }
    }
  },
  data() {
    return {
      title: "战功"
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
