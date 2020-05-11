<template>
  <div class="detail-info-component">
    <content-frame>
      <div class="top_container">
        <el-row type="flex" align="middle">
          <el-col :span="18" justify="center" align="middle">
            <span>{{ promotion_name }}</span>
          </el-col>
          <el-col :span="6" align="right">
            <el-button
              type="button"
              size="mini"
              class="button text"
              @click="submitDraft"
              >保存</el-button
            >
            <el-button
              type="button"
              size="mini"
              @click="submitReport"
              class="button text"
              >提交</el-button
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
      ></applyInfo>
      <EduInfo :education_experience="education_experience"></EduInfo>
      <TALResume :tal_experience="tal_experience"></TALResume>
      <OtherResume
        :other_company_experience="other_company_experience"
      ></OtherResume>
      <RefInfo
        :talent="talent"
        :Ref_content="Ref_content"
        @talentDelete="talentDelete"
        @talentadd="talentadd"
      ></RefInfo>
      <WorkSummary :job_summary="job_summary"></WorkSummary>
      <Weekly
        ref="Weekly"
        :week_report="week_report"
        v-if="show_weekly"
      ></Weekly>
    </content-frame>
  </div>
</template>

<script>
import {
  getPromotionSelfInfo,
  getMyPromotiondraft,
  getPromotionReportWebDetail,
  postPromotionSelfDraft,
  postPromotionSelfReport
} from "@/constants/API";
import { PATH_PROMOTION_DETAIL } from "@/constants/URL";
export default {
  data() {
    return {
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
      show_weekly: false
    };
  },
  components: {
    // "action-frame": () => import("@/components/common/ActionFrame/index.vue"),
    "content-frame": () =>
      import("@/components/common/SectionContentFrame/index.vue"),
    BasicInfo: () => import("@/components/module/details/BasicInfo/index.vue"),
    applyInfo: () => import("@/components/module/details/ApplyInfo/index.vue"),
    EduInfo: () => import("@/components/module//details/EduInfo/index.vue"),
    TALResume: () => import("@/components/module/details/TALResume/index.vue"),
    OtherResume: () =>
      import("@/components/module/details/OtherResume/index.vue"),
    RefInfo: () => import("@/components/module/details/RefInfo/index.vue"),
    WorkSummary: () =>
      import("@/components/module/details/WorkSummary/index.vue"),
    Weekly: () => import("@/components/module/details/Weekly/index.vue")
  },
  methods: {
    getPromotionsInfo() {
      getPromotionSelfInfo(this.workcode)
        .then(res => {
          this.basic_info = res.basic_info;
          this.employment_info = res.employment_info;
          this.education_experience = res.education_experience;
          this.tal_experience = res.tal_experience;
          this.other_company_experience = res.other_company_experience;
          this.basic_info_back.team_people_count =
            res.basic_info.team_people_count;
        })
        .then(() => {
          this.getPromotionDraft();
        });
    },
    getPromotionDraft() {
      const promotion_id = this.$route.params.promotion_id;
      const promotion_user_id = this.$route.params.promotion_user_id;
      getMyPromotiondraft(promotion_id, promotion_user_id).then(res => {
        if (res) {
          this.basic_info_back = {
            boy: res.content.children.boy,
            girl: res.content.children.girl,
            target_level: this.basic_info_back.target_level,
            development_plan: res.content.development_plan,
            team_people_count: res.content.team_people_count
          };
          this.Ref_content = {
            talent_other: res.content.important_information.talent_other,
            crisis: res.content.important_information.crisis,
            achievement: res.content.important_information.achievement
          };
          this.talent = res.content.important_information.talent;
          this.job_summary = res.content.job_summary;
          this.week_report = res.content.week_report;
        }
        this.show_weekly = true;
      });
    },
    getPromotionWebDetail() {
      const promotion_id = this.$route.params.promotion_id;
      const promotion_user_id = this.$route.params.promotion_user_id;
      getPromotionReportWebDetail(promotion_id, promotion_user_id).then(res => {
        this.workcode = res.promotion_user.workcode;
        this.basic_info_back.target_level = res.promotion_user.target_level;
        this.basic_info_back.is_skip_level = res.promotion_user.is_skip_level;
        this.promotion_name = res.promotion_user.promotion.name;
        this.getPromotionsInfo();
      });
    },
    talentDelete(select_arr) {
      let talent_arr = [];
      talent_arr = this.talent.reduce((arr, item) => {
        if (!select_arr.includes(item.index)) {
          arr.push(item);
        }
        return arr;
      }, []);
      this.talent = [];
      talent_arr.find((item, i) => {
        item.index = i;
      });
      this.talent = talent_arr;
    },
    talentadd() {
      const add_data = {
        name: "",
        index: this.talent.length,
        workcode: "",
        department_name: "",
        position: "",
        level: "",
        type: []
      };
      this.talent.push(add_data);
    },
    submitDraft() {
      const promotion_id = this.$route.params.promotion_id;
      const promotion_user_id = this.$route.params.promotion_user_id;
      postPromotionSelfDraft(
        promotion_id,
        promotion_user_id,
        this.get_submit_data()
      ).then(() => {
        this.$message({
          message: "保存草稿成功",
          type: "success"
        });
      });
    },
    submitReport() {
      this.showConfirm("正式提交后将进入审批并无法修改，请认真核对信息。")
        .then(() => {
          this.submitData();
        })
        .catch(() => {});
    },
    submitData() {
      const promotion_id = this.$route.params.promotion_id;
      const promotion_user_id = this.$route.params.promotion_user_id;
      postPromotionSelfReport(
        promotion_id,
        promotion_user_id,
        this.get_submit_data()
      ).then(() => {
        this.$message({
          message: "提交成功",
          type: "success"
        });
        this.$router.push(
          PATH_PROMOTION_DETAIL("self", promotion_id, promotion_user_id)
        );
      });
    },
    get_submit_data() {
      const callback = this.$refs.Weekly.callback_input();
      const new_week_report = {
        customer: [
          {
            date: this.week_report.customer[0].date,
            content: callback.customer0
          },
          {
            date: this.week_report.customer[1].date,
            content: callback.customer1
          },
          {
            date: this.week_report.customer[2].date,
            content: callback.customer2
          }
        ],
        study: [
          {
            date: this.week_report.study[0].date,
            content: callback.learning0
          },
          {
            date: this.week_report.study[1].date,
            content: callback.learning1
          },
          {
            date: this.week_report.study[2].date,
            content: callback.learning2
          }
        ]
      };
      return {
        children: {
          boy: this.basic_info_back.boy,
          girl: this.basic_info_back.girl
        },
        development_plan: this.basic_info_back.development_plan,
        team_people_count: this.basic_info_back.team_people_count,
        job_summary: this.job_summary,
        important_information: {
          crisis: this.Ref_content.crisis,
          talent: this.talent,
          talent_other: this.Ref_content.talent_other,
          achievement: this.Ref_content.achievement
        },
        week_report: new_week_report
      };
    }
  },

  created() {
    // this.getPromotionsInfo();
    this.getPromotionWebDetail();
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
