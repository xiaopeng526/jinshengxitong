<template>
  <div class="extend-wrapper-component">
    <div :class="varClass">
      {{ text }}
      <span v-if="showBtn" @click="fold = !fold" class="btn"
        >[{{ btnText }}]</span
      >
    </div>

    <div ref="shadow" class="shadow">{{ text }}</div>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      lines: 3,
      fold: undefined
    };
  },
  methods: {
    cal() {
      const fullHeight = parseInt(
        this.getStyle(this.$refs["shadow"], "height")
      );
      const lineHight = parseInt(
        this.getStyle(this.$refs["shadow"], "line-height")
      );
      this.lines = fullHeight / lineHight;
      this.$nextTick(function() {
        if (this.showBtn) {
          this.fold = true;
        }
      });
    },
    getStyle(ele, attr) {
      if (window.getComputedStyle) {
        return window.getComputedStyle(ele, null).getPropertyValue(attr);
      }
      return ele.currentStyle[attr];
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.cal();
    });
    window.addEventListener("resize", this.cal);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.cal);
  },
  computed: {
    showBtn() {
      return this.lines > 3;
    },
    varClass() {
      return {
        fold: this.fold,
        unfold: !this.fold
      };
    },
    btnText() {
      return this.fold ? "展开" : "收起";
    }
  }
};
</script>
<style lang="scss" scoped>
.extend-wrapper-component {
  position: relative;
  .btn {
    position: absolute;
    right: 0;
    bottom: 0px;
    z-index: 1;
    font-size: 12px;
    color: #41c0a9;
    letter-spacing: 0;
    cursor: pointer;
  }
  .fold {
    max-height: 69px;
    overflow: hidden;
    padding-right: 30px;
  }
  .unfold {
    padding-right: 30px;
  }
  .shadow {
    position: absolute;
    top: 0;
    left: 0;
    right: 30px;
    // height: auto;
    opacity: 0;
  }
}
</style>
