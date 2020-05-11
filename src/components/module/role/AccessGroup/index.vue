<template>
  <div class="access-role-group-component">
    <el-checkbox :value="checkAll" @change="handleCheckAllChange"
      >{{ label }}
    </el-checkbox>
    <template>
      <el-checkbox-group
        class="sub-group"
        v-model="checkedList"
        @change="handleCheckedCitiesChange"
      >
        <el-checkbox
          v-for="(v, index) in items"
          :label="v.id"
          :key="v.index"
          @change="handleCheckedChange(index)"
          >{{ v.name }}
        </el-checkbox>
      </el-checkbox-group>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: "全选"
    }
  },
  data() {
    return {
      checkedList: [],
      checkIndex: ""
    };
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedList = val ? this.items.map(i => i.id) : [];
    },
    handleCheckedChange(value) {
      this.checkIndex = value;
    },
    handleCheckedCitiesChange(value) {
      const str = value[value.length - 1];
      const index = this.checkedList.indexOf(101);
      const index2 = this.checkedList.indexOf(301);
      if (str < 200) {
        if (this.checkIndex != 0) {
          if (index == -1) {
            this.checkedList.push(101);
          }
        }
      } else if (300 < str < 400) {
        if (this.checkIndex != 0) {
          if (index2 == -1) {
            this.checkedList.push(301);
          }
        }
      }
    }
  },
  computed: {
    checkAll() {
      return (
        this.items.length != 0 && this.checkedList.length == this.items.length
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.access-role-group-component {
  margin: 0 auto;
  display: block;
  text-align: left;

  .sub-group {
    margin-left: 25px;
  }

  & ::v-deep .el-checkbox {
    margin-left: 0px;
    margin-right: 30px;
  }
}
</style>
