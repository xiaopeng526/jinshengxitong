<template>
  <div class="edu-info-component">
    <div class="section-content">
      <section-title :border="false" :title="title"></section-title>
      <div style="width: 100%; max-height:300px;overflow: scroll;">
        <el-table :data="promotions" style="width: 100%;">
          <el-table-column
            prop="promotion_end_time"
            label="时间"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="target_level"
            label="晋级职级"
          ></el-table-column>
          <el-table-column
            prop="promotion_status_text"
            label="状态"
          ></el-table-column>
          <el-table-column prop="promotion_status_text" label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="defaltPromotion(scope.row)"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
// 详情页的晋升历史
import { PATH_PROMOTION_DETAIL } from "@/constants/URL";
export default {
  props: {
    promotions: {
      type: Array,
      default: () => {
        [];
      }
    }
  },
  data() {
    return {
      title: "晋升历史"
    };
  },
  methods: {
    defaltPromotion(row) {
      this.$router
        .push(
          PATH_PROMOTION_DETAIL("self", row.promotion_id, row.promotion_user_id)
        )
        .catch(_ => {
          this.$message.warning("此员工晋升历史详情和当前晋升详情一致");
        });
    }
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
