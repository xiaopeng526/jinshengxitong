<template>
  <div class="work-info-component">
    <div class="section-content">
      <section-title :border="false" :title="title"></section-title>
      <div>
        <p class="text">战功陈述</p>
        <p>
          <el-input
            v-model="job_summary.achievement_description"
            placeholder="说明：请根据您对晋级标准中战功要求的理解，建议围绕财务健康和业务健康维度进行论述，用数据或事例说明您是否达到拟晋职级的战功要求；（请限制在1000字以内）"
            :disabled="!edit ? true : false"
            type="textarea"
            maxlength="1000"
            :rows="4"
          ></el-input>
        </p>
        <p class="text">领导力陈述</p>
        <p>
          <el-input
            v-model="job_summary.leadership_description"
            placeholder="说明：请根据您对晋级标准中领导力模型的理解，在发展业务、发展团队（建议围绕组织健康，即组织中存在的合理与不合理的两方面论述）、发展自我三个维度分别用数据和事例说明您是否达到拟晋职级的领导力要求；（请限制在1000字以内）"
            :disabled="!edit ? true : false"
            type="textarea"
            maxlength="1000"
            :rows="4"
          ></el-input>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
// import { postPerformanceUser, pathPerformanceUser } from "@/constants/API";
export default {
  props: {
    job_summary: {
      type: Object,
      default: () => ({})
    },
    edit: {
      type: Boolean,
      default: true
    }
  },
  data() {
    // 填了隔级的邮箱就必须填隔级的工号
    return {
      title: "工作总结"
    };
  },

  components: {
    "section-title": () => import("@/components/common/SectionTitle/index.vue")
    // "content-frame": () =>
    //   import("@/components/common/SectionContentFrame/index.vue")
  }
};
</script>
<style lang="scss" scoped>
.work-info-component {
  & ::v-deep {
    .tip {
      color: #ff4b4b !important;
      margin-left: 14px;
    }
  }
  .section-content {
    margin-bottom: 20px;
    .text {
      color: #5dc5b2;
    }
  }
  & ::v-deep {
    .el-textarea__inner {
      border-radius: 0px;
    }
  }
  & ::v-deep {
    .el-table__header th {
      background: rgba(245, 246, 247, 1);
    }
  }
}
</style>
