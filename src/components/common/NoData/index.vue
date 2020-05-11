<template>
  <div class="no-data-component">
    <h1>暂无数据</h1>
    <img :src="noData" alt />
  </div>
</template>
<script>
import noData from "@/assets/img/no_data.png";
export default {
  data() {
    return {
      noData
    };
  }
};
</script>
<style lang="scss" scoped>
.no-data-component {
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
  & h1 {
    font-size: 18px;
    color: #3c3c3c;
  }
}
</style>
