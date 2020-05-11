<template>
  <div v-click-outside="outside" class="objectTree-container" v-if="visible">
    <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
    <el-tree
      @check-change="treeChange"
      :props="defaultProps"
      :default-checked-keys="checkedKeys"
      node-key="id"
      ref="tree"
      :filter-node-method="filterNode"
      show-checkbox
      :data="treeOps"
    ></el-tree>
  </div>
</template>
<script>
const debounce = require("lodash.debounce");
import clickOutside from "@/directives/clickOutside";

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => []
    },
    pmt: {
      type: Array,
      default: () => []
    },
    checkedNodes: {
      type: Array,
      default: () => []
    },
    /*exclusive: {
      type: Boolean,
      default: false
    },
    leafOnly: {
      type: Boolean,
      default: false
    },*/
   /* appendToBody: {
      type: Boolean,
      default: false
    }*/
  },
  data() {
    return {
      defaultProps: { label: "name" },
      filterText: "",
      tree: this.data,
      isMounting: true
    };
  },
  methods: {
    // test
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },

    treeChange: debounce(function() {
      const nodes = this.$refs.tree.getCheckedNodes(this.leafOnly);
      this.$emit(
              "update:checkedNodes",
              nodes.map(({ name, id }) => ({ name, department_id: id }))
      );
    }, 500),
    expandNode(node, expanded) {
      node.expanded = expanded;
      const children = node.children;
      if (children && children.length > 0) {
        node.children = children.map(c => {
          return this.expandNode(c, expanded);
        });
      }
      return node;
    },
    collapseAll() {
      const tree = this.tree;
      for (let index = 0; index < tree.length; index++) {
        tree[index] = this.expandNode(tree[index], false);
        this.$set(tree, index, { ...tree[index] });
      }
    },
    // treeChange: debounce(function(data, checked, _) {
    //   const nodes = this.$refs.tree.getCheckedNodes(this.leafOnly);
    //
    //   if (this.exclusive) {
    //     console.log('暂时无用代码')
    //     if (checked) {
    //       const rootID = this.findRoot(data.id).id;
    //       this.disabledOtherBranch(rootID);
    //     }
    //     if (nodes.length == 0) {
    //       this.enableAll();
    //     }
    //   }
    //
    //   this.$emit(
    //     "update:checkedNodes",
    //     nodes.map(({ name, id }) => ({ name, department_id: id }))
    //   );
    // }, 500),
    // findRoot(id) {
    //   let currentRoot = {};
    //   for (let index = 0; index < this.data.length; index++) {
    //     currentRoot = this.data[index];
    //     if (this.findNode(id, this.data[index])) {
    //       return currentRoot;
    //     }
    //   }
    // },
    // findNode(id, node) {
    //   if (node.id == id) {
    //     return true;
    //   }
    //   const children = node.children;
    //   if (children && children.length > 0) {
    //     for (let index = 0; index < children.length; index++) {
    //       if (this.findNode(id, children[index])) {
    //         return true;
    //       }
    //     }
    //   }
    //   return false;
    // },
    // disabledOtherBranch(id) {
    //   const tree = this.tree;
    //   for (let index = 0; index < tree.length; index++) {
    //     if (tree[index].id == id) {
    //       continue;
    //     }
    //     tree[index] = this.disableNode(tree[index], true);
    //     this.$set(tree, index, { ...tree[index] });
    //   }
    // },
    // disableNode(node, disabled) {
    //   node.disabled = disabled;
    //   const children = node.children;
    //   if (children && children.length > 0) {
    //     node.children = children.map(c => {
    //       return this.disableNode(c, disabled);
    //     });
    //   }
    //   return node;
    // },
    // enableAll() {
    //   const tree = this.tree;
    //   for (let index = 0; index < tree.length; index++) {
    //     tree[index] = this.disableNode(tree[index], false);
    //     this.$set(tree, index, { ...tree[index] });
    //   }
    // },
    // outside() {
    //   if (!this.isMounting) {
    //     alert('无用代码')
    //     this.$emit("update:visible", false);
    //   }
    // }
  },
  watch: {
    filterText: debounce(function(val) {
      if (!val) {
        this.collapseAll();
      }
      this.$refs.tree.filter(val);
    }, 500),
    data(v) {
      this.tree = v;
    }
  },

  computed: {
    checkedKeys() {
      return this.checkedNodes.map(({ department_id }) => department_id);
    },
    treeOps() {
      return this.tree || this.data;
    }
  },
  directives: {
    "click-outside": clickOutside
  },
  mounted() {
    if (this.visible) {
      if (this.appendToBody) {
        document.body.appendChild(this.$el);
      }
    }
    this.$nextTick(function() {
      setTimeout(() => {
        this.isMounting = false;
      }, 1000);
    });
  },
  destroyed() {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  }
};
</script>
<style lang="scss" scoped>
.objectTree-container {
  position: absolute;
  // overflow: auto;
  left: 0;
  top: 78px;
  // z-index: 5;
  padding: 20px;
  // height:
  height: calc(100% - 78px);
  width: 100%;
  // min-width: 100px;
  // width: 40%;
  // width: 175px;
  overflow: auto;
  // background: rgba(51, 51, 51, 1);
  // box-shadow: 20px 12px 32px -3px rgba(0, 0, 0, 0.93);
  // & ::v-deep .el-tree {
  //   overflow: auto;
  //   display: flex;
  // }
}

// .fade-enter-active,
// .fade-leave-active {
//   transition: all 1s;
//   width: 30%;
// }
// .fade-enter,
// .fade-leave-to {
//   opacity: 0;
//   width: 0;
// }
</style>
