<template>
  <div class="access-user-page">
    <action-frame>
      <el-row type="flex" justify="space-between" style="margin-top:10px;">
        <div class="user_head">
          <el-form :model="filterForm" :inline="true" ref="filterForm">
            <el-form-item prop="departments" label="部门" label-width="60px">
              <el-cascader
                v-model="filterForm.departments"
                placeholder="请选择部门"
                :props="filterProps"
                :options="departmentsArr"
                @change="handleChange"
                :show-all-levels="false"
              ></el-cascader>
            </el-form-item>
            <el-form-item prop="name">
              <el-input
                style="width:200px"
                placeholder="关键词搜索"
                v-model="filterForm.name"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                v-waves
                type="primary"
                @click="submitForm('filterForm')"
                >查询</el-button
              >
              <el-button v-waves @click="resetForm('filterForm')"
                >重置</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-button v-waves @click="addUser" plain>新增用户</el-button>
        </div>
      </el-row>
    </action-frame>
    <div class="section-content">
      <content-frame>
        <el-table stripe :data="tableData" style="width: 100%">
          <el-table-column
            :key="v.prop"
            v-for="v of tableColumns"
            :min-width="v['min-width']"
            :prop="v.prop"
            :label="v.label"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="modifyUser(scope.row.id)"
                type="text"
                size="small"
                >修改</el-button
              >
              <el-button
                @click.native.prevent="deleteRow(scope.row.id)"
                type="text"
                size="small"
                >删除</el-button
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
    </div>
    <el-drawer size="600px" direction="ltr" :visible.sync="showDialog">
      <user-dialog
        v-if="showDialog"
        :visible.sync="showDialog"
        :actionType="actionType"
        :Id="selectedUser"
        @refresh="refresh"
      ></user-dialog>
    </el-drawer>
  </div>
</template>

<script>
import { delUser } from "@/constants/API";
import { getUserList, getTeamDements } from "@/constants/API";
import formMixin from "@/mixin/components/formMixin";

export default {
  mixins: [formMixin],
  data() {
    return {
      showDialog: false,
      actionType: "add",
      selectedUser: "",
      filterForm: {
        name: "",
        departments: []
      },
      filterProps: {
        value: "id",
        label: "name",
        children: "children"
      },
      departmentsArr: [],
      tableListAPI: getUserList,
      tableColumns: Object.freeze([
        { prop: "name", label: "姓名" },
        { "min-width": "120", prop: "email", label: "企业邮箱" },
        { "min-width": "120", prop: "be_admin_time", label: "创建时间" },
        { prop: "creator", label: "创建人" }
      ])
    };
  },
  methods: {
    handleChange(value) {
      this.filterForm.departments = value;
    },
    addUser() {
      this.showDialog = true;
      this.actionType = "add";
    },
    deleteRow(workcode) {
      this.showConfirm("确定要删除这个用户?")
        .then(() => {
          delUser(workcode).then(_ => {
            this.$message({
              message: "删除成功!",
              type: "success"
            });
            this.refresh();
          });
        })
        .catch(() => {});
    },
    submitForm() {
      this.currentPage = 1;
      this.$nextTick(function() {
        this.getTableList({ ...this.getBaseParams(), page: 1 });
      });
    },
    resetForm(filterForm) {
      this.$refs[filterForm].resetFields();
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
        department_id: this.filterForm.departments[
          this.filterForm.departments.length - 1
        ],
        name: this.filterForm.name,
        per_page: this.pageSize
      };
    },
    getDepartments() {
      const Data = {
        display_parent_node: true
      };
      getTeamDements(Data).then(res => {
        this.departmentsArr = res;
      });
    },
    modifyUser(id) {
      this.showDialog = true;
      this.actionType = "modify";
      this.selectedUser = id;
    }
  },
  components: {
    "action-frame": () => import("@/components/common/ActionFrame/index.vue"),
    "content-frame": () =>
      import("@/components/common/SectionContentFrame/index.vue"),
    "user-dialog": () =>
      import("@/components/module/user/NewUserDialog/index.vue")
  },
  created() {
    this.getDepartments();
    this.refresh();
  }
};
</script>
<style lang="scss" scoped>
.access-user-page {
  min-width: 763px;
}
</style>
