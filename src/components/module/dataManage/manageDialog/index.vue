<template>
  <div>
    <el-dialog
      title="温馨提示"
      :visible="visible"
      @close="close"
      :close-on-click-modal="false"
      width="30%"
      center
    >
      <span>催办功能仅能给待审批状态流程的当前待审批人发送相关通知</span>
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
import { postPushingForward } from "@/constants/API";

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    selectedIds: {
      type: Array
    },
    promotion_id: {
      type: [String, Number]
    },
    approvedData: {
      type: Array
    }
  },
  data() {
    return {
      isLoading: false
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    submitRejectReason() {
      if (!this.approvedData.length) {
        postPushingForward(this.promotion_id, {
          promotion_user_ids: this.selectedIds
        })
          .then(() => {
            this.$message.success("发送成功");
            this.$parent.clearSelection();
            this.close();
          })
          .catch(() => {
            this.$message.error("发送失败");
          });
      } else {
        this.$message.error("已选项中含有非待审批状态的流程，请重新选择");
      }
    }
  }
};
</script>
<style scoped></style>
