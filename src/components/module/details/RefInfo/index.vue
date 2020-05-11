<template>
  <div class="ref-info-component">
    <div class="section-content">
      <section-title :border="false" :title="title"></section-title>
      <p class="text">
        战功（请在下方介绍您过去三年最主要的战功，包括财务健康，业务健康两个维度，每个不超过40字）
      </p>
      <div>
        <el-input
          v-for="(v, i) of Ref_content.achievement"
          placeholder="请输入文字（40个字以内）"
          :disabled="!edit ? true : false"
          :key="i"
          type="text"
          maxlength="40"
          v-model="Ref_content.achievement[i]"
          style="border-radius: 0px;"
          show-word-limit
        ></el-input>
      </div>
      <p class="text">
        人才引进，培养，输出（请在下方填入你过去三年中培养，引进，输出的人才）
      </p>
      <el-col justify="center" align="right">
        <p v-if="edit">
          <el-button
            :disabled="!edit ? true : false"
            type="button"
            size="mini"
            class="button text"
            @click="talentDelete"
            v-if="talent.length > 1"
            >删除</el-button
          >
          <el-button
            :disabled="!edit ? true : false"
            type="button"
            size="mini"
            class="button text"
            @click="talentAdd"
            v-if="talent.length < 10"
            >增加</el-button
          >
        </p>
      </el-col>
      <div>
        <el-table
          stripe
          :data="talent"
          style="width: 100%"
          :border="true"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            v-if="edit"
            width="45"
          ></el-table-column>
          <el-table-column prop="name" label="姓名" width="140">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.name"
                :disabled="!edit ? true : false"
                filterable
                remote
                reserve-keyword
                placeholder="请输入姓名"
                :remote-method="remoteMethod"
                @change="option_change(scope.row, scope.$index)"
              >
                <el-option
                  v-for="item in options"
                  :key="item.workcode"
                  :label="item.show_text"
                  :value="item.workcode"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            prop="department_name"
            label="现部门"
            width="200"
          ></el-table-column>
          <el-table-column prop="position" label="现岗位"></el-table-column>
          <el-table-column prop="level" label="现职级"></el-table-column>
          <el-table-column label="培养/引进" width="220">
            <template slot-scope="scope">
              <el-checkbox-group v-model="scope.row.type">
                <el-checkbox
                  style="margin-right: 10px;"
                  :disabled="!edit ? true : false"
                  label="1"
                  >培养</el-checkbox
                >
                <el-checkbox
                  style="margin-right: 10px;"
                  :disabled="!edit ? true : false"
                  label="2"
                  >引进</el-checkbox
                >
                <el-checkbox
                  style="margin-right: 10px;"
                  :disabled="!edit ? true : false"
                  label="3"
                  >输出</el-checkbox
                >
              </el-checkbox-group>
            </template>
          </el-table-column>
        </el-table>
        <div style="border:1px solid #EBEEF5;display:flex; align:center">
          <div
            style="min-width:184px;border-right:1px solid #EBEEF5;display: flex;
    align-items: center;
    justify-content: center;
"
          >
            其他
          </div>
          <div style="width:100%">
            <el-input
              :disabled="!edit ? true : false"
              placeholder="（请在以上填入最重要的1-10位，如有更多，请在这里列出其姓名和工号。），并且这个空里的字数限制为2000字以内"
              v-model="Ref_content.talent_other"
              type="textarea"
              :rows="4"
            ></el-input>
          </div>
        </div>
      </div>
      <p class="text">危机解决</p>
      <p>
        <el-input
          :disabled="!edit ? true : false"
          placeholder="如有，请在下方填入您过去三年中主导解决的公司面临的重大危机，100字以内"
          v-model="Ref_content.crisis"
          type="textarea"
          maxlength="100"
          :rows="4"
        ></el-input>
      </p>
    </div>
  </div>
</template>
<script>
// 详情页的关键参考信息
import { getSelfSearch } from "@/constants/API";
export default {
  props: {
    talent: {
      type: Array,
      default: () => []
    },
    Ref_content: {
      type: Object,
      default: () => ({})
    },
    edit: {
      type: Boolean,
      default: true
    }
  },
  data() {
    // 填了隔级的邮箱就必须填隔级的工号
    return {
      title: "关键参考信息",
      select_arr: [],
      options: []
    };
  },
  created() {},
  methods: {
    remoteMethod(query) {
      const data = {
        page: 1,
        per_page: 30,
        name: query
      };
      getSelfSearch(data).then(res => {
        this.options = res.data;
      });
    },
    option_change(row, index) {
      const item = this.options.filter(o_item => o_item.workcode == row.name);
      this.talent[index].name = item[0].name;
      this.talent[index].workcode = item[0].workcode;
      this.talent[index].department_name = item[0].department_name;
      this.talent[index].position = item[0].position;
      this.talent[index].level = item[0].level;
      this.options = [];
    },
    talentDelete() {
      if (!this.select_arr.length) {
        this.$message({
          message: "请选择数据",
          type: "warning"
        });
        return false;
      }
      this.showConfirm("请确认删除该条数据。")
        .then(() => {
          this.$emit("talentDelete", this.select_arr);
        })
        .catch(() => {});
    },
    talentAdd() {
      this.$emit("talentadd");
    },
    handleSelectionChange(data) {
      this.select_arr = [];
      if (data.length) {
        for (let i = 0; i < data.length; i++) {
          this.select_arr.push(data[i].index);
        }
      }
    }
  },
  beforeDestroy() {},
  components: {
    "section-title": () => import("@/components/common/SectionTitle/index.vue")
    // "content-frame": () =>
    //   import("@/components/common/SectionContentFrame/index.vue")
  }
};
</script>
<style lang="scss" scoped>
.ref-info-component {
  & ::v-deep {
    .tip {
      color: red !important;
      margin-left: 14px;
    }
  }
  .button {
    border: solid 1px #5dc5b2;
    border-radius: 30px;
  }
  .section-content {
    margin-bottom: 20px;
    .text {
      color: #5dc5b2;
    }
  }
  & ::v-deep {
    .el-input__inner {
      border: none;
      border-radius: 0px;
    }
  }
  & ::v-deep {
    .el-textarea__inner {
      border-radius: 0px;
    }
  }
  & ::v-deep {
    .el-table__header th {
      background: rgba(245, 246, 247, 1);
    }
  }
}
</style>
