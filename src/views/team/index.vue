<template>
  <div class="team-list-page">
    <content-frame>
      <el-form
        :model="filterForm"
        :inline="true"
        ref="filterForm"
        style="background:#fff;padding:24px;"
      >
        <el-form-item prop="workcode" label="工号：">
          <el-input
            style="width:150px"
            placeholder="请输入工号"
            v-model="filterForm.workcode"
          ></el-input>
        </el-form-item>
        <el-form-item prop="name" label="姓名：">
          <el-input
            style="width:150px"
            placeholder="请输入姓名"
            v-model="filterForm.name"
          ></el-input>
        </el-form-item>
        <el-form-item prop="level" label="现职级:">
          <el-select
            collapse-tags
            v-model="filterForm.level"
            placeholder="现职级"
            multiple
          >
            <el-option
              v-for="v of levels"
              :key="v"
              :label="v"
              :value="v"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-left:30px;">
          <el-button v-waves type="primary" @click="submitForm('filterForm')"
            >查询</el-button
          >
          <el-button v-waves @click="resetForm('filterForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table stripe :data="tableData" style="width: 100%">
        <el-table-column
          prop="workcode"
          width="100"
          label="工号"
        ></el-table-column>
        <el-table-column width="100" prop="name" label="姓名">
          <template slot-scope="scope">
            <span
              class="text"
              :disabled="true"
              @click="goToDetail(scope.row)"
              >{{ scope.row.name }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          :key="v.prop"
          v-for="v of tableColumns"
          :prop="v.prop"
          :label="v.label"
        ></el-table-column>
        <el-table-column width="180" label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.is_apply"
              :disabled="scope.row.is_apply"
              type="text"
              size="small"
              >已提报</el-button
            >
            <el-button
              v-else
              :disabled="!scope.row.can_apply"
              @click.native.prevent="showReportDialog(scope.row)"
              type="text"
              size="small"
              >{{ getButtonText(scope.row) }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <br />
      <el-row type="flex" justify="end">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="constants.PAGINATION_SIZE_ENUM"
          :page-size="pageSize"
          layout="sizes, prev, pager, next"
          :total="total"
        ></el-pagination>
      </el-row>
    </content-frame>
    <el-drawer
      title="晋升提报"
      :visible.sync="showPromotionReportDialog"
      direction="rtl"
      size="500px"
    >
      <promotion-report-dialog
        v-if="showPromotionReportDialog"
        :visible.sync="showPromotionReportDialog"
        :data="promotionData"
        @refresh="refresh"
      ></promotion-report-dialog>
    </el-drawer>
  </div>
</template>

<script>
import { getPromotionTeamLevel, getPromotionTeamList } from "@/constants/API";
import { PATH_PROMOTION_BASIS } from "@/constants/URL";
import formMixin from "@/mixin/components/formMixin";

export default {
  mixins: [formMixin],
  data() {
    return {
      filterForm: {
        workcode: "",
        name: "",
        level: []
      },
      tableColumns: Object.freeze([
        {
          prop: "department_name",
          label: "部门"
        },
        {
          prop: "level",
          label: "现职级"
        },
        {
          prop: "level_experience_time",
          label: "历练时间"
        },
        {
          prop: "satisfy_level_experience_time",
          label: "历练满足时间"
        },
        {
          prop: "rejoined_on",
          label: "入司时间"
        },
        {
          prop: "this_level_on",
          label: "上次晋升时间"
        }
      ]),
      levels: [],
      showPromotionReportDialog: false,
      promotionData: {},
      tableListAPI: getPromotionTeamList
    };
  },
  methods: {
    goToDetail(row) {
      this.$router.push(PATH_PROMOTION_BASIS("basis", row.workcode));
    },
    getTeamLevel() {
      getPromotionTeamLevel().then(res => {
        this.levels = res;
      });
    },
    submitForm() {
      this.currentPage = 1;
      this.$nextTick(function() {
        this.getTableList({ ...this.getBaseParams(), page: 1 });
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.currentPage = 1;
      this.$nextTick(function() {
        this.refresh();
      });
    },

    refresh() {
      this.getTableList(this.getBaseParams());
    },
    getBaseParams() {
      return {
        page: this.currentPage,
        workcode: this.filterForm.workcode,
        level: this.filterForm.level,
        name: this.filterForm.name,
        per_page: this.pageSize
      };
    },
    showReportDialog(row) {
      this.showPromotionReportDialog = true;
      this.promotionData = row;
    },
    getButtonText(row) {
      if (row.can_apply) {
        return "晋升提报";
      }
      if (row.is_apply) {
        return "已提报";
      }
      return "暂无有提报资格的晋升任务";
    }
  },
  components: {
    "content-frame": () =>
      import("@/components/common/SectionContentFrame/index.vue"),
    "promotion-report-dialog": () =>
      import("@/components/module/team/PromotionReportDialog/index.vue")
  },
  created() {
    this.getTeamLevel();
    this.refresh();
  }
};
</script>
<style lang="scss" scoped>
.team-list-page {
  min-width: 1100px;
  .text {
    color: #5dc5b2;
    cursor: pointer;
  }
}
</style>
