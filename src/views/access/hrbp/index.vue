<template>
  <div class="access-hrbp-page">
    <action-frame>
      <el-row type="flex" justify="space-between" style="margin-top:10px;">
        <div class="user_head">
          <el-form
            :model="filterForm"
            :inline="true"
            ref="filterForm"
            label-width="0"
          >
            <el-form-item prop="department" label-width="60px">
              <el-select v-model="filterForm.dp" placeholder="请选择数据来源">
                <el-option
                  v-for="item in dpArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="name">
              <el-input
                placeholder="请输入部门或编码"
                v-model="filterForm.keyword"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button v-waves type="primary" @click="refreshForm()"
                >查询</el-button
              >
              <el-button v-waves @click="resetForm()">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-button v-waves @click="addRole" plain>新增HRBP</el-button>
        </div>
      </el-row>
    </action-frame>
    <div class="section-content">
      <content-frame>
        <el-table stripe :data="tableData" style="width: 100%">
          <el-table-column
            prop="department_id"
            label="部门编号"
          ></el-table-column>
          <el-table-column
            prop="department_name"
            label="部门名称"
          ></el-table-column>
          <el-table-column prop="HRBP" label="HRBP"></el-table-column>
          <el-table-column
            prop="source_text"
            label="数据来源"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                :disabled="scope.row.source_text == '系统同步'"
                @click.native.prevent="modifyUser(scope.row)"
                type="text"
                size="small"
                >修改</el-button
              >
              <el-button
                :disabled="scope.row.source_text == '系统同步'"
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
    <div>
      <el-dialog :visible.sync="showDialog" :before-close="closeForm">
        <el-form
          :model="formCareer"
          style=" padding: 30px 80px;"
          ref="formCareer"
          :rules="formRules"
        >
          <el-form-item
            v-if="actionType == 'add'"
            label="部门编号"
            :label-width="formLabelWidth"
            prop="department_id"
          >
            <el-autocomplete
              style="width:100%"
              v-model="formCareer.department_id"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入部门编号"
              @select="selectManager"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item v-else>
            <el-form-item label="部门编号：" :label-width="formLabelWidth">{{
              formCareer.department_id
            }}</el-form-item>
            <el-form-item label="部门名称：" :label-width="formLabelWidth">{{
              formCareer.department_name
            }}</el-form-item>
          </el-form-item>
          <el-form-item
            label="HRBP："
            :label-width="formLabelWidth"
            prop="workcode"
          >
            <el-autocomplete
              style="width:100%"
              v-model="formCareer.workcode"
              :fetch-suggestions="querySearch"
              placeholder="请输入工号"
              @select="selectHrd"
            ></el-autocomplete>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <div>
            <el-button @click="close()">取 消</el-button>
            <el-button type="primary" @click="submitForm()">确 定</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { PAGINATION_SIZE_ENUM } from "@/constants/TEXT";
import {
  getHrbpList,
  postHrbpCreat,
  updateHrbpInfo,
  deleteHrbpInfo,
  searchUserBasicInfo,
  searchDepartmentInfo
} from "@/constants/API";

export default {
  data() {
    return {
      formRules: {
        department_id: [
          { required: true, message: "请输入部门编号", trigger: "blur" }
        ],
        workcode: [{ required: true, message: "请输入工号", trigger: "blur" }]
      },
      formLabelWidth: "120px",
      actionType: "add",
      showDialog: false,
      pageSize: 20,
      currentPage: 1,
      total: 0,
      filterForm: {
        keyword: "",
        dp: ""
      },
      dpArr: [
        {
          value: 1,
          label: "系统同步"
        },
        {
          value: 2,
          label: "手动添加"
        }
      ],
      tableData: [],
      constants: {
        PAGINATION_SIZE_ENUM
      },
      id: "",
      formCareer: {
        workcode: "",
        department_id: "",
        department_name: ""
      }
    };
  },
  methods: {
    searchUserBasicInfo(val) {
      return searchUserBasicInfo({ keywords: val });
    },
    searchDepartmentInfo(val) {
      return searchDepartmentInfo({ keywords: val });
    },
    querySearch(qs, cb) {
      if (qs) {
        this.searchUserBasicInfo(qs).then(res => {
          cb(
            res.map(v => {
              v.value = v.workcode + "----" + v.name;
              return v;
            }) || []
          );
        });
      } else {
        cb([]);
      }
    },
    querySearchAsync(qs, cb) {
      debugger
      if (qs) {
        this.searchDepartmentInfo(qs).then(res => {
          cb(
            res.map(v => {
              v.value = v.department_id + "----" + v.name;
              return v;
            }) || []
          );
        });
      } else {
        cb([]);
      }
    },
    selectHrd(item) {
      this.formCareer.workcode = item.workcode;
    },
    selectManager(item) {
      this.formCareer.department_id = item.department_id;
    },
    handleCurrentChange(val) {
      this.search({ ...this.getBaseParams(), page: val });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.search({ ...this.getBaseParams(), per_page: val, page: 1 });
    },
    close() {
      if (this.actionType == "add") {
        this.$refs.formCareer.resetFields();
      } else {
        this.$refs.formCareer.clearValidate();
      }
      this.showDialog = false;
      this.actionType = "";
    },
    closeForm() {
      this.close();
    },
    addRole() {
      this.actionType = "add";
      this.showDialog = true;
      this.formCareer = {
        workcode: "",
        department_id: ""
      };
    },
    refreshForm() {
      this.currentPage = 1;
      this.$nextTick(function() {
        this.search({ ...this.getBaseParams(), page: 1 });
      });
    },
    submitForm() {
      this.$refs.formCareer.validate(valid => {
        if (valid) {
          if (this.actionType == "add") {
            postHrbpCreat(this.getFormParams()).then(_ => {
              this.$message({
                message: "添加成功!",
                type: "success"
              });
              this.showDialog = false;
              this.refresh();
            });
          } else {
            updateHrbpInfo(this.id, this.getParams()).then(_ => {
              this.$message({
                message: "添加成功!",
                type: "success"
              });
              this.showDialog = false;
              this.refresh();
            });
          }
        }
      });
    },
    deleteRow(id) {
      this.showConfirm("确定要删除吗?")
        .then(() => {
          deleteHrbpInfo(id).then(_ => {
            this.$message({
              message: "删除成功!",
              type: "success"
            });
            this.refresh();
          });
        })
        .catch(() => {});
    },
    resetForm() {
      this.filterForm.dp = "";
      this.filterForm.keyword = "";
      this.$nextTick(function() {
        this.refresh();
      });
    },
    search(params) {
      getHrbpList(params).then(res => {
        this.tableData = res.data;
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].HRBP =
            this.tableData[i].name + "-" + this.tableData[i].workcode;
        }
        this.total = res.total;
      });
    },
    refresh() {
      this.search(this.getBaseParams());
    },
    getBaseParams() {
      return {
        page: this.currentPage,
        per_page: this.pageSize,
        source: this.filterForm.dp,
        keyword: this.filterForm.keyword
      };
    },
    getFormParams() {
      return {
        workcode: this.formCareer.workcode,
        department_id: this.formCareer.department_id
      };
    },
    getParams() {
      return {
        workcode: this.formCareer.workcode
      };
    },
    modifyUser(row) {
      this.actionType = "modify";
      this.id = row.id;
      this.$nextTick(function() {
        this.formCareer = Object.assign({}, row);
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
    this.search({ ...this.getBaseParams(), page: 1 });
  }
};
</script>
<style scoped>
.access-hrbp-page {
  min-width: 890px;
}
.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
