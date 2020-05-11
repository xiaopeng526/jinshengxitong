<template>
  <div class="section-title-component" :class="sizeCls">
    <span class="title">{{ title }}</span>
    <span v-if="tip" class="tip">{{ tip }}</span>
    <el-tooltip
      v-if="$slots.tip"
      popper-class="tooltips"
      class="tooltips"
      placement="right"
    >
      <div slot="content">
        <slot name="tip"></slot>
      </div>
      <i class="el-icon-question"></i>
    </el-tooltip>
    <slot name="actions"></slot>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    tip: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: ""
    },
    border: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    sizeCls() {
      return {
        [this.size]: true,
        "has-border": this.border
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.section-title-component {
  &.has-border {
    border-bottom: solid 1px #e3e3e3;
  }
  &.small {
    margin-left: 0px;
    .title {
      font-size: 14px;
      padding-left: 5px;
      &::before {
        content: "";
        position: absolute;
        left: 7px;
        width: 5px;
        height: 100%;
        top: 0;
        background: #5dc5b2;
      }
    }
  }
  margin-left: 0px;
  margin-right: 21px;

  box-sizing: border-box;
  padding: 17px 0;
  .title {
    font-size: 18px;
    color: #3c3c3c;
    letter-spacing: 0;
    position: relative;
    padding-left: 17px;
    &::before {
      content: "";
      position: absolute;
      left: 0px;
      width: 5px;
      height: 100%;
      top: 0;
      background: #5dc5b2;
    }
  }
  .tip {
    font-size: 13px;
    color: #6b6b6b;
    letter-spacing: 0;
  }
  .tooltips {
    display: inline-block;
    color: #edd377;
    font-size: 16px;
  }
}
</style>
