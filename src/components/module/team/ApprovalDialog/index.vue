<template>
  <div>
    <el-dialog
      title="审批意见"
      :visible="ApprovalDialog"
      @close="close"
      :close-on-click-modal="false"
      width="550px"
      center
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-radio v-model="form.approval" label="1">通过</el-radio>
        <el-radio v-model="form.approval" label="2">不通过</el-radio>
        <p>审批意见及评语</p>
        <el-form-item prop="opinion">
          <el-input
            type="textarea"
            v-model="form.opinion"
            :rows="4"
            placeholder="请输入审批意见及评语"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button
          :loading="isLoading"
          type="primary"
          @click="submitRejectReason"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  postPromotionTeamApproval,
  postPromotionHrApproval,
  postPromotionBuApproval
} from "@/constants/API";
export default {
  props: {
    ApprovalDialog: {
      type: Boolean,
      default: false
    },
    promotion_id: {
      type: null,
      default: ""
    },
    approvalType: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      form: {
        approval: "",
        opinion: ""
      },
      rules: {
        approval: [{ required: true, message: "请选择", blur: "blur" }],
        opinion: [
          { required: true, message: "请输入审批意见及评语", blur: "blur" }
        ]
      },
      isLoading: false
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    submitRejectReason() {
      if (!this.form.approval) {
        this.$message.error("请选择是否通过");
        return;
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          const postTeamData = {
            approval: this.form.approval,
            opinion: this.form.opinion
          };
          if (this.approvalType == "team") {
            postPromotionTeamApproval(this.promotion_id, postTeamData)
              .then(_ => {
                this.isLoading = false;
                this.$message.success("提交成功");
                // this.$emit("update");
              })
              .catch(_ => {
                this.isLoading = false;
              });
          }
          const posthrData = {
            state: this.form.approval,
            opinion: this.form.opinion
          };
          if (this.approvalType == "hr") {
            postPromotionHrApproval(this.promotion_id, posthrData)
              .then(_ => {
                this.isLoading = false;
                this.$message.success("提交成功");
                // this.$emit("update");
              })
              .catch(_ => {
                this.isLoading = false;
              });
          }
          const postbuData = {
            state: this.form.approval,
            opinion: this.form.opinion
          };
          if (this.approvalType == "bu") {
            postPromotionBuApproval(this.promotion_id, postbuData)
              .then(_ => {
                this.isLoading = false;
                this.$message.success("提交成功");
                // this.$emit("update");
              })
              .catch(_ => {
                this.isLoading = false;
              });
          }
        }
      });
    }
  }
};
</script>
<style scoped></style>
