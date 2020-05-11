<template>
  <div class="tab-nav-component">
    <nav-item
      v-waves
      v-for="(v, i) of navs"
      :text="v.text"
      :index="v.key"
      :key="i"
      :isHead="i == 0"
      :isTail="i == navs.length - 1"
    ></nav-item>
  </div>
</template>
<script>
export default {
  // props: {
  //   navs: {
  //     type: Array,
  //     default: () => []
  //   }
  // },
  data() {
    return {
      navs:[{},{}]

    };
  },
  components: {
    "nav-item": () => import("@/components/common/TabItem/index.vue")
  }
};
</script>
<style lang="scss" scoped>
.tab-nav-component {
  display: flex;
  width: 100%;
}
</style>
