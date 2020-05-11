<template>
  <el-dialog
    class="feedback-dialog"
    title="问题反馈"
    :close-on-click-modal="false"
    :show-close="false"
    center
    :visible="visible"
  >
    <el-form
      @submit.native.prevent
      :rules="rules"
      ref="feedbackForm"
      :model="feedbackForm"
    >
      <el-form-item label="反馈" prop="feedback">
        <el-input
          placeholder="请详细描述您的问题, 我们将尽快为您解决"
          :rows="6"
          type="textarea"
          v-model="feedbackForm.feedback"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button v-waves @click="close">{{ constants.BTN_CANCLE }}</el-button>
      <el-button v-waves type="primary" @click="submitForm('feedbackForm')">{{
        constants.BTN_CONFIRM
      }}</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { BTN_CANCLE, BTN_CONFIRM } from "@/constants/TEXT";
import { postFeedback } from "@/constants/API";
export default {
  props: {
    visible: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      feedbackForm: {
        feedback: ""
      },
      rules: {
        feedback: [
          { required: true, message: "请输入反馈内容", trigger: "blur" },
          { max: 2000, message: "不能超过2000个字符", trigger: "blur" }
        ]
      },
      constants: Object.freeze({
        BTN_CANCLE,
        BTN_CONFIRM
      })
    };
  },
  methods: {
    close() {
      this.$emit("update:visible", false);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          postFeedback({
            content: this.feedbackForm.feedback,
            url: window.location.href
          }).then(_ => {
            this.$message({
              message: "提交成功",
              type: "success"
            });
            this.afterSubmit();
          });
        } else {
          return false;
        }
      });
    },
    afterSubmit() {
      this.$emit("refresh");
      this.close();
    }
  }
};
</script>

<style lang="scss" scoped>
.feedback-dialog {
  & ::v-deep .el-dialog {
    border-radius: 10px;
    width: 30%;
    min-width: 650px;
  }
}
</style>
