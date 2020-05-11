<template>
  <div>
    <div style="padding-left:50px;" class="Staus">
      <p class="header"><span type="text">审批状态</span></p>
    </div>
    <div style="display: flex; padding-left:30px;">
      <div class="block">
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :icon="activity.icon"
            :type="activity.type"
            :size="activity.size"
          >
            <p>{{ activity.title }}</p>
            <p>{{ activity.content }}</p>
            {{ activity.description }}
          </el-timeline-item>
        </el-timeline>
      </div>
      <div class="right">
        <div>
          <span>评审意见：</span>
          <p>
            <el-input
              type="textarea"
              :rows="4"
              maxlength="1000"
              show-word-limit
              v-model="textReview"
            >
            </el-input>
          </p>
        </div>
        <div>
          <span>评审意见：</span>
          <p>
            <el-input
              type="textarea"
              :rows="4"
              maxlength="1000"
              show-word-limit
              v-model="textComments"
            >
            </el-input>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textReview: "",
      textComments: "",
      activities: [
        {
          title: "直接上级",
          content: "张总",
          description: "已通过",
          size: "large",
          type: "primary"
        },
        {
          title: "HR",
          content: "李总",
          description: "已通过"
        },
        {
          title: "事业部总经理",
          content: "王总",
          description: "已通过"
        }
      ]
    };
  },
  methods: {},
  created() {}
};
</script>

<style scoped>
.Staus .header {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
}
.right {
  margin-left: 40px;
  width: 70%;
}
.el-timeline-item {
  height: 100px;
}
</style>
