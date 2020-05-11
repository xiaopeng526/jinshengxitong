<template>
  <div class="approve-detail-component">
    <div class="section-content">
      <section-title :border="false" :title="title"></section-title>
      <el-row v-if="hr_approved_node.node_id == '300'">
        <el-col :span="3">人才流动</el-col>
        <el-col :span="21">
          <el-checkbox-group v-model="flow_talent">
            <el-checkbox
              v-for="v in flow_talent_arr"
              :disabled="true"
              :label="v.id"
              :key="v.id"
              >{{ v.value }}</el-checkbox
            >
          </el-checkbox-group>
        </el-col>
      </el-row>
      <!-- <p v-if="hr_approved_node.comment">
          {{
            hr_approved_node.node_id == "300" ? "评审意见" : "评审意见及评语"
          }}
        </p> -->
      <!-- <el-form-item v-if="hr_approved_node.comment">
          <el-input
            type="textarea"
            :disabled="true"
            v-model="hr_approved_node.comment"
            :rows="4"
            placeholder="请输入审批意见及评语"
            maxlength="200"
            show-word-limit
          ></el-input>
        </el-form-item> -->
    </div>
  </div>
</template>
<script>
// 详情页的审批意见
export default {
  props: {
    hr_approved_node: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      flow_talent_arr: [
        { id: 1, value: "人才流动-1.5" },
        { id: 2, value: "事业部内部跨地区-1分" },
        { id: 3, value: "活水计划-1分" },
        { id: 4, value: "事业部内部且本地区-0.5分" }
      ],
      title: "审批意见"
    };
  },
  components: {
    "section-title": () => import("@/components/common/SectionTitle/index.vue")
  },
  created() {},
  computed: {
    flow_talent() {
      return JSON.parse(this.hr_approved_node.flow_talent);
    }
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.approve-detail-component {
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
