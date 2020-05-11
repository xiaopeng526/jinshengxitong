<template>
  <div class="promotion-admin-page">
    <content-frame>
      <el-row style="background:#fff;padding:14px 24px;">
        <el-col :span="24" align="end" justify="end">
          <el-button
            type="text"
            size="small"
            style="margin-right:30px;"
            @click="pushingForward"
            >催办
          </el-button>
          <el-button
            style="border-radius: 20px;"
            type="primary"
            @click="exportPromotionManageList"
            >导出当前列表
          </el-button>
        </el-col>
      </el-row>
      <el-form
        :model="filterForm"
        :inline="true"
        ref="filterForm"
        style="background:#fff;padding:24px;"
      >
        <el-form-item prop="keyword">
          <el-input
            style="width:150px"
            placeholder="输入工号或姓名"
            v-model="filterForm.keyword"
          ></el-input>
        </el-form-item>
        <el-form-item prop="is_apply" label="是否申报：">
          <el-select
            style="width:150px"
            v-model="filterForm.is_apply"
            placeholder="全部"
          >
            <el-option
              v-for="v of is_applys"
              :key="v.value"
              :label="v.label"
              :value="v.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="target_levels" label="目标职级：">
          <el-select
            style="width:150px"
            v-model="filterForm.target_levels"
            multiple
            placeholder="全部"
          >
            <el-option
              v-for="(v, key, i) of levels"
              :key="i"
              :label="v"
              :value="v"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="status" label="流程状态：">
          <el-select
            style="width:150px"
            v-model="filterForm.status"
            multiple
            placeholder="全部"
          >
            <el-option
              v-for="(v, key, i) of approval_status_arr"
              :key="i"
              :label="v"
              :value="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button v-waves type="primary" @click="submitForm('filterForm')"
            >查询
          </el-button>
          <el-button v-waves @click="resetForm('filterForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table
        stripe
        :data="tableData"
        style="width: 100%"
        ref="tableRef"
        :row-key="getRowKeys"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          :reserve-selection="true"
          width="45"
        ></el-table-column>
        <el-table-column prop="workcode" label="工号"></el-table-column>
        <el-table-column label="姓名">
          <template slot-scope="scope">
            <span class="text" @click="promotionName(scope.row)">
              {{ scope.row.name }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="department_name"
          min-width="200"
          label="部门"
        ></el-table-column>
        <el-table-column prop="level" label="当前职级"></el-table-column>
        <el-table-column prop="target_level" label="目标职级"></el-table-column>
        <el-table-column
          prop="promotion_type_text"
          label="晋升类型"
        ></el-table-column>
        <el-table-column prop="applicant_name" label="申报人"></el-table-column>
        <el-table-column
          prop="apply_time"
          min-width="160"
          label="申报时间"
        ></el-table-column>
        <el-table-column prop="status_text" label="流程状态"></el-table-column>
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
    <manage-dialog
      v-if="dialogVisible"
      :visible="dialogVisible"
      :selectedIds="selectedIds"
      :promotion_id="promotion_id"
      :approvedData="approvedData"
      @close="closeApprovalDialog"
    ></manage-dialog>
  </div>
</template>

<script>
import { PAGINATION_SIZE_ENUM } from "@/constants/TEXT";
import {
  getOperationStatus,
  promotionList,
  getPromotionTeamLevel
} from "@/constants/API";
import {
  PATH_PROMOTION_DETAIL,
  PATH_EXPORT_DATA_MANAGER
} from "@/constants/URL";
import { EXAMINATION_ITEM } from "@/constants/TEXT";
export default {
  data() {
    return {
      pageSize: 20,
      currentPage: 1,
      total: 0,
      filterForm: {
        keyword: "",
        is_apply: "",
        target_levels: [],
        status: []
      },
      levels: [],
      is_applys: [
        {
          value: "1",
          label: "是"
        },
        {
          value: "0",
          label: "否"
        }
      ],
      tableData: [],
      promotion_id: this.$route.query.id,
      approval_status_arr: [],
      constants: {
        PAGINATION_SIZE_ENUM
      },
      tabelSelection: [],
      dialogVisible: false
    };
  },
  methods: {
    getRowKeys(row) {
      return row.workcode;
    },
    closeApprovalDialog() {
      this.dialogVisible = false;
    },
    handleSelectionChange(val) {
      this.tabelSelection = val;
    },
    promotionName(row) {
      this.$router.push(
        PATH_PROMOTION_DETAIL("manager", this.promotion_id, row.id)
      );
    },
    exportPromotionManageList() {
      const params = {
        token: this.getToken(),
        workcodeOrName: this.filterForm.keyword,
        is_apply: this.filterForm.is_apply,
        target_levels: this.filterForm.target_levels,
        status: this.filterForm.status,
        promotion_id: this.promotion_id
      };
      if (this.tableData.length == 0) {
        return this.$message.warning("导出当前的数据为空");
      }
      this.downloadFile(PATH_EXPORT_DATA_MANAGER, params, "get");
      this.clearSelection();
    },
    clearSelection() {
      this.$refs["tableRef"].clearSelection();
    },

    //催办弹窗
    pushingForward() {
      const noneSelection = this.tabelSelection.length == 0;
      if (noneSelection) {
        this.$message.error("请选择需要催办的流程");
        return;
      }
      this.dialogVisible = true;
    },
    handleCurrentChange(val) {
      this.search({ ...this.getBaseParams(), page: val });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.search({ ...this.getBaseParams(), per_page: val, page: 1 });
    },
    getStatus() {
      getOperationStatus().then(res => {
        this.approval_status_arr = res;
      });
    },
    getTeamLevel() {
      getPromotionTeamLevel().then(res => {
        this.levels = res;
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.currentPage = 1;
          this.$nextTick(function() {
            this.search({ ...this.getBaseParams(), page: 1 });
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.refresh();
    },
    search(params) {
      promotionList(this.promotion_id, params).then(res => {
        const { data, total } = res;
        this.tableData = data;
        this.total = total;
        this.clearSelection();
      });
    },
    refresh() {
      this.search(this.getBaseParams());
    },
    getBaseParams() {
      return {
        page: this.currentPage,
        keyword: this.filterForm.keyword,
        is_apply: this.filterForm.is_apply,
        target_levels: this.filterForm.target_levels,
        status: this.filterForm.status,
        per_page: this.pageSize
      };
    }
  },
  computed: {
    selectedIds() {
      return this.tabelSelection.map(i => i.id);
    },
    approvedData() {
      return this.tabelSelection.filter(
        item => EXAMINATION_ITEM.indexOf(item.status_text) == -1
      );
    }
  },
  components: {
    "content-frame": () =>
      import("@/components/common/SectionContentFrame/index.vue"),
    "manage-dialog": () =>
      import("@/components/module/dataManage/manageDialog/index.vue")
  },
  created() {
    this.getStatus();
    this.getTeamLevel();
    this.refresh();
  }
};
</script>
<style lang="scss" scoped>
.promotion-admin-page {
  min-width: 1170px;
  .text {
    color: #5dc5b2;
    cursor: pointer;
  }
}
</style>
