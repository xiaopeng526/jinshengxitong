<template>
  <div>
    <el-dialog
      :title="
        this.approvalType == 'hr'
          ? '评审意见'
          : this.approvalType == 'org'
          ? '晋级审批'
          : '评审意见'
      "
      :visible="ApprovalDialog"
      @close="close"
      :close-on-click-modal="false"
      width="700px"
      center
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item>
          <el-radio v-model="form.state" label="1" @change="changeState(1)"
            >通过
          </el-radio>
          <el-radio v-model="form.state" label="2" @change="changeState(2)"
            >不通过
          </el-radio>
        </el-form-item>
        <el-form-item v-if="this.approvalType == 'org'" prop="plan">
          <el-col :span="5">
            岗位未来规划
          </el-col>
          <el-col :span="19">
            <el-input
              type="text"
              v-model="form.plan"
              placeholder="请输入岗位未来规划"
              maxlength="30"
              show-word-limit
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item v-if="this.approvalType == 'org'" prop="post">
          <el-col :span="5">
            横向发展岗位
          </el-col>
          <el-col :span="19">
            <el-input
              type="text"
              v-model="form.post"
              placeholder="请输入横向发展岗位"
              maxlength="30"
              show-word-limit
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item
          v-if="this.approvalType == 'org'"
          prop="is_promotion_post"
        >
          <el-col :span="18">
            从未来规划及横向发展考虑，此岗位是否可以设立拟晋职级
          </el-col>
          <el-col :span="6">
            <el-radio v-model="form.is_promotion_post" label="1">是</el-radio>
            <el-radio v-model="form.is_promotion_post" label="2">否</el-radio>
          </el-col>
        </el-form-item>
        <el-form-item v-if="this.approvalType == 'org'" prop="is_special">
          <el-col :span="5">
            是否破格提报
          </el-col>
          <el-col :span="19">
            <el-radio
              v-model="form.is_special"
              label="1"
              @change="changeForm(1)"
              >是
            </el-radio>
            <el-radio
              v-model="form.is_special"
              label="2"
              @change="changeForm(2)"
              >否
            </el-radio>
          </el-col>
        </el-form-item>
        <el-form-item v-if="this.approvalType == 'org'" prop="qualification">
          <el-col :span="5">
            晋级资格情况
          </el-col>
          <el-col :span="19">
            <el-checkbox-group
              v-model="form.qualification"
              :disabled="conCation"
            >
              <el-checkbox
                v-for="v in qualification_arr"
                :label="v.id"
                :key="v.id"
                >{{ v.value }}
              </el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-form-item>
        <el-form-item v-if="this.approvalType == 'org'" prop="condition">
          <el-col :span="5">
            破格提报情形
          </el-col>
          <el-col :span="19">
            <el-checkbox-group v-model="form.condition" :disabled="conCation">
              <el-checkbox v-for="v in condition_arr" :label="v.id" :key="v.id"
                >{{ v.value }}
              </el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-form-item>
        <el-form-item
          prop="flow_talent"
          v-if="this.approvalType == 'org' || this.approvalType == 'hr'"
        >
          <el-col :span="5">
            人才流动
          </el-col>
          <el-col :span="19">
            <el-checkbox-group v-model="form.flow_talent">
              <el-checkbox
                v-for="v in flow_talent_arr"
                :label="v.id"
                :key="v.id"
                >{{ v.value }}
              </el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-form-item>
        <p v-if="this.approvalType != 'bu' || checked">
          {{ approvalType == "hr" ? "评审意见" : "评审意见及评语" }}
        </p>
        <el-form-item
          prop="opinion"
          v-if="this.approvalType != 'bu' || checked"
        >
          <el-input
            type="textarea"
            v-model="form.opinion"
            :rows="4"
            placeholder="请输入审批意见及评语"
            maxlength="200"
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button
          :loading="isLoading"
          type="primary"
          @click="submitRejectReason"
          >确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  postPromotionHrApproval,
  postPromotionOrgApproval,
  postPromotionBuApproval,
  postPromotionTeamApproval
} from "@/constants/API";

export default {
  props: {
    ApprovalDialog: {
      type: Boolean,
      default: false
    },
    Id: {
      type: null,
      default: ""
    },
    approvalType: {
      type: String,
      default: ""
    },
    approval: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      conCation: false,
      checked: false,
      form: {
        state: "",
        plan: "",
        post: "",
        is_promotion_post: "",
        is_special: "",
        qualification: [],
        condition: [],
        flow_talent: [],
        opinion: ""
      },
      rules: {
        plan: [{ required: true, message: "请输入岗位未来规划", blur: "blur" }],
        post: [{ required: true, message: "请输入横向发展岗位", blur: "blur" }],
        opinion: [
          { required: true, message: "请输入审批意见及评语", blur: "blur" }
        ],
        is_promotion_post: [
          { required: true, message: "请选择是或否", trigger: "change" }
        ],
        is_special: [
          { required: true, message: "请选择是或否", trigger: "change" }
        ]
      },
      qualification_arr: [
        { id: 1, value: "岗位上限不符合" },
        { id: 2, value: "历练时间不符合" },
        { id: 3, value: "业绩不符合" },
        { id: 4, value: "文化不符合" },
        { id: 5, value: "支教经历不符合" }
      ],
      condition_arr: [
        { id: 1, value: "愿吃亏：如主动去钱库业务" },
        { id: 2, value: "愿担当：如主动承担挑战性怒飙" },
        {
          id: 3,
          value: "潜力大：近两年业绩指标达成情况卓越，未来发展潜力巨大"
        },
        { id: 4, value: "其他" }
      ],
      flow_talent_arr: [
        { id: 1, value: "人才流动-1.5" },
        { id: 2, value: "事业部内部跨地区-1分" },
        { id: 3, value: "活水计划-1分" },
        { id: 4, value: "事业部内部且本地区-0.5分" }
      ],
      isLoading: false
    };
  },
  created() {
    this.form.approval = this.approval;
    this.form.opinion = "";
  },
  methods: {
    changeState(val) {
      if (this.approvalType == "bu" && val == 2) {
        this.checked = true;
      } else {
        this.checked = false;
        this.form.opinion = "";
      }
    },
    changeForm(e) {
      if (e == 1) {
        this.conCation = false;
      } else {
        this.form.qualification = [];
        this.form.condition = [];
        this.conCation = true;
      }
    },
    close() {
      this.$emit("close");
    },
    submitRejectReason() {
      if (!this.form.state) {
        this.$message.error("请选择是否通过");
        return;
      }

      if (this.form.is_special == 1) {
        if (!this.form.qualification.length) {
          this.$message.error("请至少选择一种晋级资格情况");
          return;
        }
        if (!this.form.condition.length) {
          this.$message.error("请至少选择一种破格提报情形");
          return;
        }
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          const postorgData = {
            state: this.form.state,
            plan: this.form.plan,
            post: this.form.post,
            is_promotion_post: this.form.is_promotion_post,
            is_special: this.form.is_special,
            qualification: this.form.qualification,
            condition: this.form.condition,
            flow_talent: this.form.flow_talent,
            opinion: this.form.opinion
          };
          if (this.approvalType == "org") {
            if (this.form.state == 1) {
              this.postPromotionOrgApproval(this.Id, postorgData);
            } else {
              this.showConfirm(
                "建议驳回前先与该员工进行沟通，结果与意见员工本人可见，确认后即可提交"
              ).then(() => {
                this.postPromotionOrgApproval(this.Id, postorgData);
              });
            }
          }
          const posthrData = {
            state: this.form.state,
            flow_talent: this.form.flow_talent,
            opinion: this.form.opinion
          };
          if (this.approvalType == "hr") {
            if (this.form.state == 1) {
              this.postPromotionHrApproval(this.Id, posthrData);
            } else {
              this.showConfirm(
                "建议驳回前先与该员工进行沟通，结果与意见员工本人可见，确认后即可提交"
              ).then(() => {
                this.postPromotionHrApproval(this.Id, posthrData);
              });
            }
          }

          const superData = {
            approval: this.form.state,
            opinion: this.form.opinion
          };
          if (this.approvalType == "super") {
            if (this.form.state == 1) {
              this.postPromotionTeamApproval(this.Id, superData);
            } else {
              this.showConfirm(
                "建议驳回前先与该员工进行沟通，结果与意见员工本人可见，确认后即可提交"
              ).then(() => {
                this.postPromotionTeamApproval(this.Id, superData);
              });
            }
          }

          const buData = {
            state: this.form.state,
            opinion: this.form.opinion
          };
          if (this.approvalType == "bu") {
            if (this.form.state == 1) {
              this.postPromotionBuApproval(this.Id, buData);
            } else {
              this.showConfirm(
                "建议驳回前先与该员工进行沟通，结果与意见员工本人可见，确认后即可提交"
              ).then(() => {
                this.postPromotionBuApproval(this.Id, buData);
              });
            }
          }
        }
      });
    },
    postPromotionOrgApproval(Id, postorgData) {
      postPromotionOrgApproval(Id, postorgData)
        .then(_ => {
          this.isLoading = false;
          this.$message.success("提交成功");
          this.$emit("refresh");
          this.$emit("close");
        })
        .catch(_ => {
          this.isLoading = false;
        });
    },
    postPromotionHrApproval(Id, posthrData) {
      postPromotionHrApproval(Id, posthrData)
        .then(_ => {
          this.isLoading = false;
          this.$message.success("提交成功");
          this.$emit("refresh");
          this.$emit("close");
        })
        .catch(_ => {
          this.isLoading = false;
        });
    },
    postPromotionTeamApproval(Id, superData) {
      postPromotionTeamApproval(Id, superData)
        .then(_ => {
          this.isLoading = false;
          this.$message.success("提交成功");
          this.$emit("refresh");
          this.$emit("close");
        })
        .catch(_ => {
          this.isLoading = false;
        });
    },
    postPromotionBuApproval(Id, buData) {
      postPromotionBuApproval(Id, buData)
        .then(_ => {
          this.isLoading = false;
          this.$message.success("提交成功");
          this.$emit("refresh");
          this.$emit("close");
        })
        .catch(_ => {
          this.isLoading = false;
        });
    }
  }
};
</script>
<style scoped></style>
