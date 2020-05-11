<template>
  <div :class="cls" @click="clickTag" class="tag-component">
    {{ text }}{{ count }}
    <div class="animateTag" ref="animateTag" :class="animateCls"></div>
  </div>
</template>
<script>
import { delTag, incrTag } from "@/constants/API";
const debounce = require("lodash.debounce");
export default {
  props: {
    text: {
      type: String,
      default: ""
    },
    id: {
      type: [String, Number],
      default: ""
    },
    count: {
      type: [String, Number],
      default: 1
    },
    canDismiss: {
      type: Boolean,
      default: false
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      incrCls: false,
      delCls: false
    };
  },
  computed: {
    cls() {
      return {
        canDismiss: this.canDismiss
      };
    },
    actionFunc() {
      return this.canDismiss ? this.del : this.inc;
    },
    animateCls() {
      return {
        incrCls: this.incrCls,
        delCls: this.delCls
      };
    }
  },
  methods: {
    clickTag() {
      if (!this.readOnly) {
        this.actionFunc();
      }
    },
    del: debounce(function() {
      delTag(this.$route.params.workcode, this.id).then(_ => {
        this.delCls = true;
        this.$nextTick(function() {
          this.$refs["animateTag"].style.top = 0;
          setTimeout(() => {
            this.$emit("refresh");
            this.clearAnimate();
          }, 1000);
        });
      });
    }, 500),
    inc: debounce(function() {
      incrTag(this.$route.params.workcode, {
        name: this.text
      }).then(_ => {
        this.incrCls = true;
        this.$nextTick(function() {
          this.$refs["animateTag"].style.top = 0;
          setTimeout(() => {
            this.$emit("refresh");
            this.clearAnimate();
          }, 1000);
        });
      });
    }, 500),
    clearAnimate() {
      this.incrCls = false;
      this.delCls = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.tag-component {
  padding: 4px 12px;
  font-size: 14px;
  color: #f3ab74;
  letter-spacing: 0;
  border-radius: 20px;
  border: solid 1px #f3ab74;
  margin-bottom: 2px;
  margin-top: 2px;
  cursor: pointer;
  position: relative;
  &.canDismiss {
    background-color: #fff6e0;
    color: #f3ab74;
  }
  & + .tag-component {
    margin-left: 10px;
  }
  .animateTag {
    &.incrCls {
      position: absolute;
      left: 50%;
      top: 50%;
      font-weight: bold;
      font-size: 20px;
      color: #33bfa5;
      width: 100%;
      height: 100%;
      transform: translate(-50%, -50%);
      text-align: center;
      animation: fadeOutUp 1s;
      &::after {
        content: "+1";
      }
    }
    &.delCls {
      position: absolute;
      left: 50%;
      top: 50%;
      font-weight: bold;
      font-size: 20px;
      color: #ff2727;
      width: 100%;
      height: 100%;
      transform: translate(-50%, -50%);
      text-align: center;
      animation: fadeOutUp 1s;
      &::after {
        content: "-1";
      }
    }
  }
  @keyframes fadeOutUp {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      transform: translate3d(0, -100%, 0);
    }
  }

  .fadeOutUp {
    animation-name: fadeOutUp;
  }
}
</style>
