<template>
  <div class="feedback-dialog">
    <h3>问题反馈</h3>
    <br />
    <br />
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
      <el-button v-waves @click="close">取消</el-button>
      <el-button v-waves type="primary" @click="submitForm('feedbackForm')"
        >确认</el-button
      >
    </span>
  </div>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    onSubmit: {
      type: Function,
      default: () => {}
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
      }
    };
  },
  methods: {
    close() {
      this.$emit("update:visible", false);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.onSubmit(this.feedbackForm.feedback);
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.feedback-dialog {
  width: 30%;
  min-width: 400px;
  text-align: center;
  max-width: 700px;
  & ::v-deep .el-form-item__label,
  & ::v-deep .el-checkbox__label {
    color: white;
  }
}
</style>
