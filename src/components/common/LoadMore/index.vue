<template>
  <div @click="loading ? undefined : toggle()" class="load-more-component">
    <div class="donut-spinner" v-if="loading"></div>
    <div class="more-text" v-else-if="!expanded">
      {{ constants.EXPAND_MORE }}
      <i class="el-icon-arrow-down"></i>
    </div>
    <div class="more-text" v-else>
      收起
      <i class="el-icon-arrow-up"></i>
    </div>
  </div>
</template>
<script>
import { EXPAND_MORE } from "@/constants/TEXT";
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      constants: {
        EXPAND_MORE
      },
      expanded: false
    };
  },
  methods: {
    toggle() {
      this.expanded = !this.expanded;
      this.$emit("click");
    }
  }
};
</script>
<style lang="scss" scoped>
.load-more-component {
  text-align: center;
  font-size: 15px;
  color: #41c0a9;
  letter-spacing: 0;
  padding: 18px;
  .donut-spinner {
    display: inline-block;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: currentColor;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    -webkit-animation: donut-spinner 1.2s linear infinite;
    animation: donut-spinner 1.2s linear infinite;
  }
  .more-text {
    cursor: pointer;
  }
}

@-webkit-keyframes donut-spinner {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
  }
}

@keyframes donut-spinner {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
  }
}
</style>
