<template>
  <div class="approval-org-page">
    <content-frame>
      <el-row style="background:#fff;padding:14px 24px;">
        <el-col :span="24" align="end" justify="end">
          <!-- <el-button type="primary" @click="exportTeamDetail"
            >导出已选行详情页</el-button
          > -->
          <el-button
            style="border-radius: 20px;"
            type="primary"
            @click="exportApprovalOrgList"
            >导出当前列表</el-button
          >
        </el-col>
      </el-row>
      <el-form
        :model="filterForm"
        :inline="true"
        ref="filterForm"
        style="background:#fff;padding:24px;"
      >
        <el-form-item prop="workcode" label="工号：">
          <el-input
            style="width:130px"
            placeholder="请输入工号"
            v-model="filterForm.workcode"
          ></el-input>
        </el-form-item>
        <el-form-item prop="name" label="姓名：">
          <el-input
            style="width:130px"
            placeholder="请输入姓名"
            v-model="filterForm.name"
          ></el-input>
        </el-form-item>
        <el-form-item prop="department" label="部门：">
          <el-cascader
            v-model="filterForm.dp"
            placeholder="请选择部门"
            :props="filterProps"
            style="margin-left:10px;width:170px"
            :options="dpArr"
            :show-all-levels="false"
          ></el-cascader>
        </el-form-item>
        <el-form-item prop="department" label="晋升结果：">
          <el-select
            style="width:150px"
            v-model="filterForm.status"
            placeholder="全部"
          >
            <el-option
              v-for="(v, index) in approval_status_arr"
              :key="v"
              :label="v"
              :value="index"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button v-waves type="primary" @click="submitForm('filterForm')"
            >查询</el-button
          >
          <el-button v-waves @click="resetForm('filterForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table
        stripe
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="45"></el-table-column>
        <el-table-column prop="workcode" label="工号"></el-table-column>
        <el-table-column prop="name" label="姓名">
          <template slot-scope="scope">
            <span class="text" @click="promotionName(scope.row)">{{
              scope.row.name
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="department_name"
          label="部门"
          width="130"
        ></el-table-column>
        <el-table-column prop="level" label="晋升前职级"></el-table-column>
        <el-table-column prop="target_level" label="目标职级"></el-table-column>
        <el-table-column prop="status_text" label="晋升结果"></el-table-column>
        <el-table-column
          prop="apply_time"
          label="申报时间"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="promotion_type_text"
          label="晋升类型"
        ></el-table-column>
        <el-table-column
          prop="promotion_name"
          label="晋升名称"
        ></el-table-column>
        <el-table-column prop="applicant_name" label="提报人"></el-table-column>
        <!-- <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="modifyUser(scope.row.workcode)"
                      type="text"
                      size="small"
                      >晋升提报</el-button
                    >
                  </template>
        </el-table-column>-->
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
  </div>
</template>

<script>
import { PAGINATION_SIZE_ENUM } from "@/constants/TEXT";
import {
  getStatus,
  getTeamDepartments,
  getPromotionJuryList
} from "@/constants/API";
import {
  PATH_PROMOTION_DETAIL,
  PATH_EXPORT_APPROVAL_ORG
} from "@/constants/URL";

export default {
  data() {
    return {
      showDialog: false,
      actionType: "add",
      selectedUser: "",
      pageSize: 20,
      currentPage: 1,
      total: 0,
      filterProps: {
        value: "id",
        label: "name",
        children: "children"
      },
      filterForm: {
        workcode: "",
        name: "",
        dp: [],
        status: ""
      },
      tableData: [],
      dpArr: [],
      approval_status_arr: [],
      constants: {
        PAGINATION_SIZE_ENUM
      },
      tabelSelection: []
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.tabelSelection = val;
    },
    promotionName(row) {
      const promotion_id = row.promotion_id;
      const promotion_user_id = row.id;
      this.$router.push(
        PATH_PROMOTION_DETAIL("approvalOrg", promotion_id, promotion_user_id)
      );
    },

    exportApprovalOrgList() {
      const params = {
        token: this.getToken(),
        workcode: this.filterForm.workcode,
        name: this.filterForm.name,
        department_id: this.filterForm.dp[this.filterForm.dp.length - 1]
          ? this.filterForm.dp[this.filterForm.dp.length - 1]
          : "",
        status: this.filterForm.status
      };
      if (this.tableData.length == 0) {
        this.$message.warning("导出当前的数据为空");
      } else {
        this.downloadFile(PATH_EXPORT_APPROVAL_ORG, params, "get");
      }
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
      getStatus().then(res => {
        this.approval_status_arr = res;
      });
    },
    getDepartments() {
      const data = {
        display_parent_node: true
      };
      getTeamDepartments(data).then(res => {
        this.dpArr = res;
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.currentPage = 1;
          this.$nextTick(function() {
            this.search({ ...this.getBaseParams(), page: 1 });
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$nextTick(function() {
        this.filterForm = {
          workcode: "",
          name: "",
          dp: [],
          status: ""
        };
        this.refresh();
      });
    },
    search(params) {
      getPromotionJuryList(params).then(res => {
        const { data, total } = res;
        this.tableData = data;
        this.total = total;
      });
    },
    refresh() {
      this.search(this.getBaseParams());
    },
    getBaseParams() {
      return {
        page: this.currentPage,
        per_page: this.pageSize,
        workcode: this.filterForm.workcode,
        department_id: this.filterForm.dp[this.filterForm.dp.length - 1]
          ? this.filterForm.dp[this.filterForm.dp.length - 1]
          : "",
        status: this.filterForm.status,
        name: this.filterForm.name
      };
    },
    modifyUser(workcode) {
      this.selectedUser = workcode;
      this.actionType = "modify";
      this.showDialog = true;
    }
  },
  components: {
    "content-frame": () =>
      import("@/components/common/SectionContentFrame/index.vue")
  },
  created() {
    this.getStatus();
    this.getDepartments();
    this.search({ ...this.getBaseParams(), page: 1 });
  }
};
</script>
<style lang="scss" scoped>
.approval-org-page {
  min-width: 1170px;
  .text {
    color: #5dc5b2;
    cursor: pointer;
  }
}
</style>
