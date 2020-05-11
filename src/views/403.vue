<template>
  <div class="noAuth-page">
    <img :src="noAuth" alt />
    <div>
      <div class="title">无权限</div>
      <div class="desc">您还没有访问此后台的权限！</div>
      <el-button
        v-if="!isPC"
        v-waves
        class="btn"
        @click="goZhiYinLou"
        type="primary"
        >返回知音楼</el-button
      >
    </div>
  </div>
</template>
<script>
import noAuth from "@/assets/img/403.png";
import { PATH_ZHIYINLOU } from "@/constants/URL";
import { isPC } from "@/utils/ding";
export default {
  data() {
    return {
      noAuth,
      isPC: isPC()
    };
  },
  methods: {
    goZhiYinLou() {
      window.location.href = PATH_ZHIYINLOU;
    }
  }
};
</script>

<style lang="scss" scoped>
.noAuth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: #f0f2f5;
  & ::v-deep img {
    width: 300px;
    margin-right: 100px;
  }
  .title {
    font-size: 40px;
    color: #868686;
    letter-spacing: 0.48px;
    line-height: 22px;
  }
  .desc {
    font-size: 24px;
    color: #868686;
    letter-spacing: 0.29px;
    line-height: 22px;
    margin: 20px 0;
  }
  .btn {
    font-size: 20px;
    color: #ffffff;
    letter-spacing: 0.24px;
    line-height: 22px;
  }
}
</style>
