<template>
  <div
    @click="$router.replace({ path: $route.path, query: { tab: index } })"
    class="tab-item-component"
    :class="cls"
  >
    {{ text }}
    <div class="head"></div>
    <div class="tail"></div>
  </div>
</template>
<script>
export default {
  name: "tab-item",
  props: {
    text: {
      type: String,
      default: ""
    },
    index: {
      type: String,
      default: ""
    },
    isHead: {
      type: Boolean,
      default: false
    },
    isTail: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    cls() {
      return {
        selected: (this.$route.query.tab || "profile") == this.index,
        isHead: this.isHead,
        isTail: this.isTail
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.tab-item-component {
  margin-right: 20px;
  position: relative;
  // width: 150px;
  flex-basis: 150px;
  height: 34px;
  background: #dcdddc;
  text-align: center;
  font-size: 12px;
  color: #383838;
  letter-spacing: 0.14px;
  line-height: 34px;
  cursor: pointer;
  &.isTail {
    .tail {
      display: none;
    }
  }
  &.isHead {
    .head {
      display: none;
    }
  }
  &.selected {
    background: #5dc5b2;
    color: #ffffff;
    .tail {
      border-color: transparent transparent transparent #5dc5b2;
    }
  }
  .head {
    position: absolute;
    width: 8.7px;
    height: 0;
    left: 0;
    top: 50%;
    border-style: solid;
    border-width: 5px 0 5px 8.7px;
    border-color: transparent transparent transparent rgb(237, 242, 245);
    transform: translateY(-50%);
  }
  .tail {
    position: absolute;
    width: 8.7px;
    right: -16px;
    transform: translateY(-50%);
    top: 50%;
    border-style: solid;
    border-width: 5px 0 5px 8.7px;
    border-color: transparent transparent transparent #dcdddc;
  }
}
</style>
