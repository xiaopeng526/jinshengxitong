<template>
  <div class="edu-info-component">
    <div class="section-content">
      <section-title :border="false" :title="title"></section-title>
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in nodes"
          :key="index"
          :icon="activity.icon"
          :type="activity.type"
          color="#5dc5b2"
          :size="activity.size"
        >
          <el-row>
            <el-col :span="3">
              {{ node_person[activity.node_id] }}
              <br />
              {{ activity.name }}
              <br />
              {{ status[activity.status] }}
            </el-col>
            <el-col :span="21">
              <div
                v-if="
                  activity.comment
                    ? true
                    : activity.node_id != 500
                    ? true
                    : false
                "
              >
                审批意见
              </div>
              <div
                v-if="
                  activity.comment
                    ? true
                    : activity.node_id != 500
                    ? true
                    : false
                "
              >
                <el-input
                  v-model="activity.comment"
                  :disabled="true"
                  type="textarea"
                  :rows="3"
                ></el-input>
              </div>
            </el-col>
          </el-row>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>
<script>
// 详情页的审批状态
export default {
  props: {
    nodes: {
      type: Array,
      default: () => {
        [];
      }
    }
  },
  data() {
    return {
      title: "审批状态",
      status: ["待审批", "通过", "驳回"],
      node_person: {
        200: "直接上级",
        300: "HRBP",
        400: "HRD",
        500: "事业部总经理"
      }
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
