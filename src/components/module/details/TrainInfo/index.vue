<template>
  <div class="edu-info-component">
    <div class="section-content">
      <section-title :border="false" :title="title"></section-title>
      <!-- {{education_experience_list}} -->
      <div style="width: 100%; max-height:300px;overflow: scroll;">
        <el-table :data="train_list" style="width: 100%;">
          <el-table-column prop="promotion_date" label="时间"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column
            prop="promotion_level"
            label="晋升后职级"
          ></el-table-column>
          <el-table-column prop="level" label="当前职级"></el-table-column>
          <el-table-column prop="post" label="晋升后岗位"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
// 详情页的人才培养
export default {
  props: {
    train_list: {
      type: Array,
      default: () => {
        [];
      }
    }
  },
  data() {
    return {
      title: "人才培养"
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
