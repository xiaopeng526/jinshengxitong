<template>
  <div class="user-data-dialog">
    <h1 class="title">{{ dialogTitle }}</h1>
    <div class="content">
      <el-form
        label-width="100px"
        :model="userForm"
        :rules="rules"
        ref="userForm"
      >
        <el-form-item :label="constants.FORM_ENTERPRISE_EMAIL" prop="email">
          <el-autocomplete
            v-model.trim="userForm.email"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            :disabled="isEdit"
            @select="selectEmail"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item :label="constants.FORM_NAME" prop="name">
          <el-input :disabled="true" v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item :label="constants.FORM_DEPARTMENT" prop="department">
          <el-input
            placeholder="请选择部门"
            v-model="dp_name"
            readonly="readonly"
            @click.native.stop="showDepartmentTree = !showDepartmentTree"
          ></el-input>
        </el-form-item>
        <el-form-item :label="constants.FORM_LEVEL" prop="level">
          <el-checkbox-group v-model="userForm.level">
            <el-checkbox
              v-for="v in levels"
              :key="v.id"
              :label="v.id"
              name="levels"
              >{{ v.name }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item :label="constants.FORM_ROLE" prop="role">
          <el-checkbox-group v-model="userForm.role">
            <el-checkbox
              v-for="v of roles"
              :key="v.id"
              :label="v.id"
              name="role"
              >{{ v.name }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item class="btn-group">
          <el-button v-waves @click="close">{{
            constants.BTN_CANCLE
          }}</el-button>
          <el-button v-waves type="primary" @click="submitForm('userForm')">{{
            constants.BTN_CONFIRM
          }}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-drawer
      :append-to-body="true"
      direction="ltr"
      :visible.sync="showDepartmentTree"
    >
      <TreeSelectPanel
        v-if="showDepartmentTree"
        :checkedNodes.sync="userForm.department"
        :visible.sync="showDepartmentTree"
        :data="departmentArr"
      ></TreeSelectPanel>
    </el-drawer>
  </div>
</template>

<script>
import {
  addUser,
  searchUserBasicInfo,
  getUserDetails,
  modifyUserInfo,
  getRoList,
  getTeamDepart
} from "@/constants/API";
import TreeSelectPanel from "@/components/common/TreeSelectPanel/index.vue";
import {
  FORM_ENTERPRISE_EMAIL,
  USER_ADD,
  USER_MODIFY,
  BTN_CANCLE,
  FORM_NAME,
  FORM_ROLE,
  BTN_CONFIRM,
  FORM_LEVEL,
  FORM_DEPARTMENT,
  FORM_FAMILY_GROUP
} from "@/constants/TEXT";
export default {
  props: {
    actionType: {
      type: String,
      default: "add"
    },
    Id: {
      type: [String, Number],
      default: ""
    }
  },
  data() {
    return {
      showDepartmentTree: false,
      loading: false,
      userForm: {
        email: "",
        name: "",
        department: [],
        level: [],
        role: []
      },
      roles: [],
      levels: [
        {
          id: "1",
          name: "普通员工"
        },
        {
          id: "2",
          name: "组织部成员"
        }
      ],
      departmentArr: [],
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        email: [{ required: true, message: "请输入企业邮箱", trigger: "blur" }],
        level: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个职级",
            trigger: "change"
          }
        ],
        department: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个部门",
            trigger: "change"
          }
        ],
        role: [
          {
            type: "array",
            required: true,
            message: "请选择角色",
            trigger: "change"
          }
        ]
      },
      constants: {
        FORM_ENTERPRISE_EMAIL,
        FORM_FAMILY_GROUP,
        FORM_DEPARTMENT,
        FORM_LEVEL,
        FORM_ROLE,
        BTN_CANCLE,
        BTN_CONFIRM,
        FORM_NAME
      }
    };
  },
  methods: {
    getDepartments() {
      getTeamDepart().then(res => {
        this.departmentArr = res;
      });
    },
    getUserRoles() {
      getRoList().then(res => {
        this.roles = res;
      });
    },
    close() {
      this.$emit("update:visible", false);
    },
    submitForm(userForm) {
      this.$refs[userForm].validate(valid => {
        if (valid) {
          this.submitFunc(this.afterSubmit);
        } else {
          return false;
        }
      });
    },
    searchUserBasicInfo(email) {
      return searchUserBasicInfo({ keywords: email });
    },
    addUserSubmit(cb) {
      addUser(this.getParams()).then(_ => {
        this.$message({
          message: "添加成功!",
          type: "success"
        });
        return cb && cb();
      });
    },
    modifyUserSubmit(cb) {
      const data = this.getParams();
      modifyUserInfo(this.Id, data).then(_ => {
        this.$message({
          message: "修改成功!",
          type: "success"
        });
        return cb && cb();
      });
    },
    afterSubmit() {
      this.$emit("refresh");
      this.close();
    },
    querySearchAsync(qs, cb) {
      if (this.isEdit && this.loading) {
        this.userForm.name = "";
      }
      if (qs.trim()) {
        this.searchUserBasicInfo(qs).then(res => {
          cb(
            res.map(v => {
              v.value = v.email;
              return v;
            }) || []
          );
        });
      } else {
        cb([]);
      }
    },
    selectEmail(item) {
      this.userForm.workcode = item.workcode;
      this.userForm.name = item.name;
    },
    getParams() {
      return {
        workcode: this.userForm.workcode,
        email: this.userForm.email,
        name: this.userForm.name,
        target_rank: this.userForm.level,
        departments: this.dpIds,
        roles: this.userForm.role
      };
    },
    getUserDetail() {
      getUserDetails(this.Id).then(res => {
        this.userForm.name = res.name;
        this.userForm.email = res.email;
        this.userForm.workcode = res.workcode;
        this.userForm.level = res.target_rank;
        this.userForm.role = res.roles;
        this.userForm.department = res.departments;
        this.$nextTick(function() {
          this.loading = false;
        });
      });
    }
  },
  components: {
    TreeSelectPanel
  },
  computed: {
    dp_name() {
      return this.userForm.department.map(item => item.name).join(", ");
    },
    dpIds() {
      return this.userForm.department.map(({ department_id }) => department_id);
    },
    dialogTitle() {
      return this.actionType == "add" ? USER_ADD : USER_MODIFY;
    },
    submitFunc() {
      return this.actionType == "add"
        ? this.addUserSubmit
        : this.modifyUserSubmit;
    },
    isEdit() {
      return this.actionType != "add";
    }
  },
  created() {
    this.getDepartments();
    this.getUserRoles();
    if (this.isEdit) {
      this.getUserDetail();
    }
  }
};
</script>
<style lang="scss" scoped>
.user-data-dialog {
  position: absolute;
  left: 0;
  top: 78px;
  right: 0;
  height: calc(100% - 78px);
  overflow: auto;
  padding: 20px;
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & ::v-deep .el-checkbox + .el-checkbox {
    margin-left: 0px;
  }
  & ::v-deep .el-checkbox {
    margin-right: 30px;
  }
  & ::v-deep .el-cascader,
  & ::v-deep .el-select,
  & ::v-deep .el-autocomplete {
    width: 100%;
  }
  & ::v-deep .el-form-item {
    flex-shrink: 0;
  }
  .btn-group {
    & ::v-deep .el-form-item__content {
      margin-left: 20px !important;
      text-align: center;
    }
  }
  .title {
    text-align: center;
    margin-left: 73px;
  }
}
</style>
