<template>
  <div class="edu-info-component">
    <div class="section-content">
      <section-title :border="false" :title="title"></section-title>
      <div style="width: 100%; max-height:300px;overflow: scroll;">
        <el-table :data="achievements" style="width: 100%;">
          <el-table-column
            prop="date"
            label="时间"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="score"
            label="分数"
            width="180"
          ></el-table-column>
          <el-table-column prop="level" label="等级"></el-table-column>
          <el-table-column prop="_271_level" label="271"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
// 详情页的绩效
export default {
  props: {
    achievements: {
      type: Array,
      default: () => {
        [];
      }
    }
  },
  data() {
    return {
      title: "绩效考核"
    };
  },

  components: {
    "section-title": () => import("@/components/common/SectionTitle/index.vue")
  },
  computed: {}
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
