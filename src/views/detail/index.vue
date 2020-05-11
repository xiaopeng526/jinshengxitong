<template>
  <div class="detail-info-component">
    <content-frame>
      <div class="top_container">
        <el-row type="flex" align="middle">
          <el-col :span="3"></el-col>
          <el-col :span="18" justify="center" align="middle">
            <span>{{ promotion_name }}</span>
          </el-col>
          <el-col :span="3" align="right">
            <el-button
              v-if="can_approve"
              type="button"
              size="mini"
              class="button text"
              @click="showApprovalDialog"
              >审批</el-button
            >
          </el-col>
        </el-row>
      </div>
      <BasicInfo
        :basic_info="basic_info"
        :employment_info="employment_info"
      ></BasicInfo>
      <applyInfo
        :basic_info="basic_info"
        :employment_info="employment_info"
        :basic_info_back="basic_info_back"
        :hr_approved_node="hr_approved_node"
        :edit="edit"
        v-if="fillinfo_show && type_id == 2"
      ></applyInfo>
      <EduInfo
        :education_experience="education_experience"
        v-if="fillinfo_show"
      ></EduInfo>
      <TALResume
        :tal_experience="tal_experience"
        v-if="fillinfo_show"
      ></TALResume>
      <OtherResume
        :other_company_experience="other_company_experience"
        v-if="fillinfo_show"
      ></OtherResume>
      <RefInfo
        :talent="talent"
        :Ref_content="Ref_content"
        :edit="edit"
        v-if="fillinfo_show && type_id == 2"
      ></RefInfo>
      <WorkSummary
        :job_summary="job_summary"
        :edit="edit"
        v-if="fillinfo_show && type_id == 2"
      ></WorkSummary>
      <Weekly
        :week_report="week_report"
        :edit="edit"
        v-if="fillinfo_show && show_weekly && type_id == 2"
      ></Weekly>
      <AchieveInfo :achievements="achievements"></AchieveInfo>
      <CultureInfo :culture_list="culture_list"></CultureInfo>
      <PromotionInfo :promotions="promotions" v-if="false"></PromotionInfo>
      <ContributionInfo :contributions="contributions"></ContributionInfo>
      <CommentsInfo :comments="comments"></CommentsInfo>
      <TrainInfo :train_list="train_list"></TrainInfo>
      <ApproveDetail
        :hr_approved_node="hr_approved_node"
        v-if="
          ApproveInfo_show &&
            hr_approved_node.node_id == '300' &&
            hr_approved_node.status == 1
        "
      ></ApproveDetail>
      <ApproveInfo :nodes="nodes" v-if="ApproveInfo_show"></ApproveInfo>
    </content-frame>
    <approval-dialog
      v-if="ApprovalDialog"
      :ApprovalDialog="ApprovalDialog"
      :Id="promotion_user_id"
      :approvalType="approvalType"
      @close="closeApprovalDialog"
    ></approval-dialog>
  </div>
</template>

<script>
import {
  getPromotionsInfo,
  getPromotionSelfInfo,
  getPromotionReportWebDetail,
  getPromotionReportAdminDetail
} from "@/constants/API";
export default {
  data() {
    return {
      edit: false,
      promotion_name: "",
      workcode: "",
      basic_info: {},
      employment_info: {},
      basic_info_back: {
        boy: "",
        girl: "",
        target_level: "",
        is_skip_level: "",
        development_plan: "",
        team_people_count: ""
      },
      achievements: [],
      culture_list: [],
      train_list: [],
      contributions: [],
      comments: [],
      promotions: [],
      nodes: [],
      education_experience: [],
      tal_experience: [],
      other_company_experience: [],
      talent: [
        {
          name: "",
          index: 0,
          workcode: "",
          department_name: "",
          position: "",
          level: "",
          type: []
        }
      ],
      Ref_content: {
        talent_other: "",
        crisis: "",
        achievement: ["", "", ""]
      },
      job_summary: {
        leadership_description: "",
        achievement_description: ""
      },
      week_report: {
        study: [
          {
            date: "",
            content: ""
          },
          {
            date: "",
            content: ""
          },
          {
            date: "",
            content: ""
          }
        ],
        customer: [
          {
            date: "",
            content: ""
          },
          {
            date: "",
            content: ""
          },
          {
            date: "",
            content: ""
          }
        ]
      },
      promotion_id: this.$route.params.promotion_id,
      promotion_user_id: this.$route.params.promotion_user_id,
      ApproveInfo_show: false,
      can_approve: false,
      ApprovalDialog: false,
      // Id: this.$route.params.promotion_user_id,
      approvalType: "hr",
      fillinfo_show: false, //填报信息展示
      show_weekly: false,
      type_id: "",
      hr_approved_node: {}
    };
  },
  components: {
    // "action-frame": () => import("@/components/common/ActionFrame/index.vue"),
    "content-frame": () =>
      import("@/components/common/SectionContentFrame/index.vue"),
    BasicInfo: () => import("@/components/module/details/BasicInfo/index.vue"),
    applyInfo: () => import("@/components/module/details/ApplyInfo/index.vue"),
    ApproveDetail: () =>
      import("@/components/module/details/ApprovalDetail/index.vue"),
    AchieveInfo: () =>
      import("@/components/module/details/AchieveInfo/index.vue"),
    CultureInfo: () => import("@/components/module//details/Culture/index.vue"),
    PromotionInfo: () =>
      import("@/components/module/details/Promotion/index.vue"),
    EduInfo: () => import("@/components/module//details/EduInfo/index.vue"),
    TALResume: () => import("@/components/module/details/TALResume/index.vue"),
    OtherResume: () =>
      import("@/components/module/details/OtherResume/index.vue"),
    ContributionInfo: () =>
      import("@/components/module/details/Contribution/index.vue"),
    CommentsInfo: () =>
      import("@/components/module/details/Comments/index.vue"),
    TrainInfo: () => import("@/components/module/details/TrainInfo/index.vue"),

    RefInfo: () => import("@/components/module/details/RefInfo/index.vue"),
    WorkSummary: () =>
      import("@/components/module/details/WorkSummary/index.vue"),
    Weekly: () => import("@/components/module/details/Weekly/index.vue"),
    ApproveInfo: () =>
      import("@/components/module/details/ApprovalInfo/index.vue"),
    "approval-dialog": () =>
      import("@/components/module/Hr/HrApprovalDialog/index.vue")
  },
  methods: {
    getPromotionsInfo() {
      let get_base_info = "";
      if (this.$route.params.type == "manager") {
        get_base_info = getPromotionsInfo;
      } else {
        get_base_info = getPromotionSelfInfo;
      }
      get_base_info(this.workcode).then(res => {
        this.basic_info = res.basic_info;
        this.employment_info = res.employment_info;
        this.achievements = res.achievements;
        this.culture_list = res.culture_list;
        this.train_list = res.train_list;
        this.contributions = res.contributions;
        this.comments = res.comments;
        this.promotions = res.promotions;
        this.education_experience = res.education_experience;
        this.tal_experience = res.tal_experience;
        this.other_company_experience = res.other_company_experience;
      });
    },
    getPromotionWebReport() {
      getPromotionReportWebDetail(
        this.promotion_id,
        this.promotion_user_id
      ).then(res => {
        if (res.promotion_user.user_fill_form) {
          this.set_data(res);
        }
        if (res.promotion_user.nodes) {
          this.nodes = res.promotion_user.nodes; // 审批状态信息
        }
        this.basic_info_back.target_level = res.promotion_user.target_level;
        this.basic_info_back.is_skip_level = res.promotion_user.is_skip_level;
        this.workcode = res.promotion_user.workcode;
        this.promotion_name = res.promotion_user.promotion.name;
        this.type_id = res.promotion_user.promotion.type_id; // 1普通员工 2 组织部
        if (res.promotion_user.hr_approved_node) {
          this.hr_approved_node = res.promotion_user.hr_approved_node; // 审批信息
        }
        this.can_approve =
          res.approval.can_approve && this.type == "myApproval";
        this.approval_type = res.approval.approval_type;
        this.getPromotionsInfo();
        this.show_weekly = true;
      });
    },
    getPromotionAdminDetail() {
      getPromotionReportAdminDetail(
        this.promotion_id,
        this.promotion_user_id
      ).then(res => {
        if (res.promotion_user.user_fill_form) {
          this.set_data(res);
        }
        if (res.promotion_user.nodes) {
          this.nodes = res.promotion_user.nodes; // 审批状态信息
        }
        this.basic_info_back.target_level = res.promotion_user.target_level;
        this.basic_info_back.is_skip_level = res.promotion_user.is_skip_level;
        this.workcode = res.promotion_user.workcode;
        this.promotion_name = res.promotion_user.promotion.name;
        this.type_id = res.promotion_user.promotion.type_id; // 1普通员工 2 组织部
        if (res.promotion_user.hr_approved_node) {
          this.hr_approved_node = res.promotion_user.hr_approved_node; // 审批信息
        }
        this.can_approve =
          res.approval.can_approve && this.type == "myApproval";
        this.approval_type = res.approval.approval_type;

        this.getPromotionsInfo();
        this.show_weekly = true;
      });
    },
    set_data(res) {
      const user_fill_form = res.promotion_user.user_fill_form;
      this.basic_info_back = {
        boy: user_fill_form.children.boy,
        girl: user_fill_form.children.girl,
        development_plan: user_fill_form.development_plan,
        team_people_count: user_fill_form.team_people_count
      };
      this.Ref_content = {
        talent_other: user_fill_form.important_information.talent_other,
        crisis: user_fill_form.important_information.crisis,
        achievement: user_fill_form.important_information.achievement
      };
      this.talent = user_fill_form.important_information.talent;
      this.job_summary = user_fill_form.job_summary;
      this.week_report = user_fill_form.week_report;
    },
    closeApprovalDialog() {
      this.ApprovalDialog = false;
      window.location.reload();
    },
    showApprovalDialog() {
      if (this.approval_type == 200) {
        this.approvalType = "super";
      } else if (this.approval_type == 300) {
        this.approvalType = "hr";
      } else if (this.approval_type == 400) {
        this.approvalType = "org";
      } else if (this.approval_type == 500 || this.approval_type == 1000) {
        this.approvalType = "bu";
      }
      this.ApprovalDialog = true;
    }
  },

  created() {
    const type = this.$route.params.type;
    if (type == "basis") {
      //只看基础数据
      this.workcode = this.$route.params.workcode;
      this.getPromotionsInfo();
      this.type = type;
    } else {
      this.type = type;
      if (type == "manager") {
        //数据管理跳转
        this.getPromotionAdminDetail();
        this.fillinfo_show = true;
        // this.ApproveInfo_show = true;
      } else {
        //非数据管理跳转
        this.getPromotionWebReport();
        this.fillinfo_show = true;
      }
      if (type == "manager" || type == "approvalOrg" || type == "myApproval") {
        this.ApproveInfo_show = true;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.detail-info-component {
  .top_container {
    background: #ffffff;
    padding: 20px 14px;
  }
  & ::v-deep {
    .tip {
      color: red !important;
      margin-left: 14px;
    }
  }
  .button {
    border: solid 1px #5dc5b2;
    border-radius: 30px;
  }
}
</style>
