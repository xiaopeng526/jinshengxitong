<template>
  <div :class="layoutCls" class="text-item-component">
    <span class="label">{{ label }}:</span>
    <slot>
      <span :inner-html.prop="value | empty" class="text"></span>
    </slot>
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: ""
    },
    value: {
      type: [String, Number],
      default: ""
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    layoutCls() {
      return {
        vertical: this.vertical
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.text-item-component {
  display: flex;
  &.vertical {
    display: block;
    .label,
    .text {
      display: block;
    }
    .text {
      margin-top: 20px;
    }
  }
  & + .text-item-component {
    margin-top: 20px;
  }
  .label {
    font-size: 14px;
    color: #a3a3a3;
    letter-spacing: 0;
    min-width: 120px;
    width: 120px;
    display: inline-block;
  }
  .text {
    font-size: 14px;
    color: #1b1b1b;
    letter-spacing: 0;
    margin-left: 5px;
  }
}
</style>
