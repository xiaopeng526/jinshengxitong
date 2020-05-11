<template>
  <div class="access-org-page">
    <action-frame>
      <el-row type="flex" justify="space-between" style="margin-top:10px;">
        <div class="user_head">
          <el-form :model="filterForm" :inline="true" ref="filterForm">
            <el-form-item prop="department" label="事业部" label-width="60px">
              <el-select
                v-model="filterForm.department"
                placeholder="请选择事业部"
              >
                <el-option
                  v-for="(item, index) in departmentArr"
                  :key="index"
                  :label="item.name"
                  :value="item.department_id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="name">
              <el-input
                placeholder="关键词搜索"
                v-model="filterForm.name"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button v-waves type="primary" @click="refreshForm()"
                >查询</el-button
              >
              <el-button v-waves @click="resetForm('filterForm')"
                >重置</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <div></div>
      </el-row>
    </action-frame>
    <div class="section-content">
      <content-frame>
        <el-table stripe :data="tableData" style="width: 100%">
          <el-table-column
            :key="v.prop"
            v-for="v of tableColumns"
            :prop="v.prop"
            :label="v.label"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="modifyUser(scope.row)"
                type="text"
                size="small"
                >修改</el-button
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
    <div>
      <el-dialog :visible.sync="showDialog">
        <el-form
          :model="formCareer"
          style=" padding: 30px 80px;"
          ref="formCareer"
          :rules="rules"
        >
          <p>
            <span style="paddingLeft:61px">事业部：</span
            >{{ formCareer.business_unit_name }}
          </p>
          <el-form-item
            label="事业部总经理:"
            :label-width="formLabelWidth"
            prop="manager_name"
          >
            <el-autocomplete
              style="width:100%"
              v-model="formCareer.manager_workcode"
              :fetch-suggestions="querySearch"
              placeholder="请输入工号"
              @select="selectManager"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item
            label="事业部HRD:"
            :label-width="formLabelWidth"
            prop="hrd_name"
          >
            <el-autocomplete
              style="width:100%"
              v-model="formCareer.hrd_workcode"
              :fetch-suggestions="querySearch"
              placeholder="请输入工号"
              @select="selectHrd"
            ></el-autocomplete>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="close">取 消</el-button>
          <el-button type="primary" @click="submitForm()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { PAGINATION_SIZE_ENUM } from "@/constants/TEXT";
import {
  getBusinessList,
  getDiviDements,
  getUpdateBusiness,
  searchUserBasicInfo
} from "@/constants/API";
export default {
  data() {
    return {
      pageSize: 20,
      currentPage: 1,
      total: 0,
      tableData: [],
      rules: {
        manager_name: [
          { required: true, message: "请输入事业部总经理", trigger: "blur" }
        ],
        hrd_name: [
          { required: true, message: "请输入事业部HRD", trigger: "blur" }
        ]
      },
      formLabelWidth: "120px",
      showDialog: false,
      filterForm: {
        name: "",
        department: []
      },
      departmentArr: [],
      constants: {
        PAGINATION_SIZE_ENUM
      },
      id: "",
      formCareer: {
        manager_workcode: "",
        hrd_workcode: "",
        business_unit_name: "",
        manager_name: "",
        hrd_name: ""
      },
      tableColumns: Object.freeze([
        {
          prop: "business_unit_name",
          label: "事业部"
        },
        {
          prop: "manager_name_workcode",
          label: "事业部总经理"
        },
        {
          prop: "hrd_name_workcode",
          label: "事业部HRD"
        }
      ]),
      tableListAPI: getBusinessList
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.getTableList({ ...this.getBaseParams(), page: val });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getTableList({ ...this.getBaseParams(), per_page: val, page: 1 });
    },
    getTableList(params) {
      getBusinessList(params).then(res => {
        const { data, total } = res;
        this.tableData = data.map(i => ({
          ...i,
          managerName: i.manager_name,
          managerWorkCode: i.manager_workcode,
          hrdName: i.hrd_name,
          hrdWorkCode: i.hrd_workcode,
          business_unit_name: i.business_unit_name,
          manager_name_workcode:
            i.manager_workcode && i.manager_name
              ? `${i.manager_name}-${i.manager_workcode}`
              : "",
          hrd_name_workcode:
            i.hrd_name && i.hrd_workcode
              ? `${i.hrd_name}-${i.hrd_workcode}`
              : ""
        }));
        this.total = total;
      });
    },
    searchUserBasicInfo(val) {
      return searchUserBasicInfo({ keywords: val });
    },
    querySearch(qs, cb) {
      if (qs) {
        this.searchUserBasicInfo(qs).then(res => {
          cb(
            res.map(v => {
              v.value = v.workcode + "—" + v.name;
              return v;
            }) || []
          );
        });
      } else {
        cb([]);
      }
    },
    selectHrd(item) {
      this.formCareer.hrd_name = item.name;
      this.formCareer.hrd_workcode = item.workcode;
    },
    selectManager(item) {
      this.formCareer.manager_name = item.name;
      this.formCareer.manager_workcode = item.workcode;
    },
    close() {
      this.showDialog = false;
      this.$refs.formCareer.resetFields();
    },
    submitForm() {
      this.$refs.formCareer.validate(valid => {
        if (valid) {
          getUpdateBusiness(this.id, this.getFormParams()).then(_ => {
            this.$message({
              message: "添加成功!",
              type: "success"
            });
            this.showDialog = false;
            this.refresh();
          });
        }
      });
    },
    refreshForm() {
      this.currentPage = 1;
      this.$nextTick(function() {
        this.getTableList({ ...this.getBaseParams(), page: 1 });
      });
    },
    resetForm(filterForm) {
      this.$refs[filterForm].resetFields();
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
        department_id: this.filterForm.department,
        name: this.filterForm.name,
        per_page: this.pageSize
      };
    },
    getFormParams() {
      return {
        manager_workcode: this.formCareer.manager_workcode,
        hrd_workcode: this.formCareer.hrd_workcode,
        business_unit_name: this.formCareer.business_unit_name,
        manager_name: this.formCareer.manager_name,
        hrd_name: this.formCareer.hrd_name
      };
    },
    getDepartments() {
      getDiviDements().then(res => {
        this.departmentArr = res;
      });
    },
    modifyUser(row) {
      const { id, ...others } = row;
      this.id = id;
      this.formCareer = others;
      this.$nextTick(function() {
        this.form = Object.assign({}, row);
      });
      this.showDialog = true;
    }
  },
  components: {
    "action-frame": () => import("@/components/common/ActionFrame/index.vue"),
    "content-frame": () =>
      import("@/components/common/SectionContentFrame/index.vue")
  },
  created() {
    this.getDepartments();
    this.refresh();
  }
};
</script>
<style scoped>
.access-org-page {
  min-width: 660px;
}
.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
