<template>
  <div class="new-role-dialog">
    <h1 class="title">{{ title }}</h1>
    <div class="content">
      <el-form
        :model="roleForm"
        :rules="rules"
        ref="roleForm"
        label-width="100px"
        class="roleForm"
      >
        <el-form-item :label="constants.FORM_ROLE_NAME" prop="name">
          <el-input v-model.trim="roleForm.name"></el-input>
        </el-form-item>
        <el-form-item
          class="permissions"
          :label="constants.ACCESS_CHOICE"
          prop="permissions"
        >
          <access-group
            v-for="(v, i) of permissions"
            :key="i"
            :ref="`access${i}`"
            :items="v.child"
            :label="v.name"
          ></access-group>
        </el-form-item>
        <el-form-item class="btn-group">
          <el-button v-waves @click="close">
            {{ constants.BTN_CANCLE }}
          </el-button>
          <el-button v-waves type="primary" @click="submitForm('roleForm')">
            {{ constants.BTN_CONFIRM }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {
  FORM_ROLE_NAME,
  BTN_CANCLE,
  BTN_CONFIRM,
  ROLE_MODIFY,
  ROLE_ADD,
  ACCESS_CHOICE
} from "@/constants/TEXT";
import { getRoleDetails, addRole, updateRoleInfo } from "@/constants/API";
export default {
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    permissions: {
      type: Array,
      default: () => []
    },
    actionType: {
      type: String,
      default: "add"
    },
    id: {
      type: [String, Number],
      default: ""
    }
  },
  data() {
    const validatePermssion = (rule, value, callback) => {
      const hasCheckedPerm = this.getCheckedPermissions().length > 0;
      if (hasCheckedPerm) {
        callback();
      } else {
        callback(new Error("至少选择一个权限"));
      }
    };

    return {
      treeRole: [],
      roleForm: {
        name: "",
        permission: []
      },
      rules: {
        name: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { max: 20, message: "不能超过20个字符", trigger: "blur" }
        ],
        permission: [{ validator: validatePermssion, trigger: "blur" }]
      },
      constants: {
        FORM_ROLE_NAME,
        BTN_CANCLE,
        BTN_CONFIRM,
        ACCESS_CHOICE
      }
    };
  },
  methods: {
    close() {
      this.$emit("update:visible", false);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submitFunc(this.afterSubmit);
        } else {
          return false;
        }
      });
    },
    getCheckedPermissions() {
      return Object.keys(this.$refs)
        .filter(k => k.startsWith("access"))
        .map(
          k => this.$refs[k] && this.$refs[k][0] && this.$refs[k][0].checkedList
        )
        .reduce((p, c) => p.concat(c), []);
    },
    addRole(cb) {
      addRole(this.getParams()).then(_ => {
        this.$message({
          message: "添加成功",
          type: "success"
        });
        return cb && cb();
      });
    },
    getParams() {
      return {
        name: this.roleForm.name,
        permissions: this.getCheckedPermissions()
      };
    },
    afterSubmit() {
      this.$emit("refresh");
      this.close();
    },
    getInfo(id) {
      getRoleDetails(id).then(res => {
        this.roleForm.name = res.name;
        this.setPermissions(res.permissions);
      });
    },
    updateRoleInfo(cb) {
      updateRoleInfo(this.id, this.getParams()).then(_ => {
        this.$message({
          message: "修改成功",
          type: "success"
        });
        return cb && cb();
      });
    },
    setPermissions(arr) {
      const idArr = Object.values(
        this.permissions.map(p => {
          const items = p.child || [];
          return items.map(i => i.id);
        })
      );
      for (let index = 0; index < idArr.length; index++) {
        const result = [];
        for (const id of arr) {
          if (idArr[index].includes(id)) {
            result.push(id);
          }
        }
        this.$refs[`access${index}`][0].checkedList = result;
      }
    }
  },
  computed: {
    title() {
      return this.actionType == "add" ? ROLE_ADD : ROLE_MODIFY;
    },
    submitFunc() {
      return this.actionType == "add" ? this.addRole : this.updateRoleInfo;
    }
  },
  components: {
    "access-group": () =>
      import("@/components/module/role/AccessGroup/index.vue")
  },
  created() {
    if (this.actionType == "modify") {
      this.getInfo(this.id);
    }
  }
};
</script>
<style scoped lang="scss">
.new-role-dialog {
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
    padding: 15px 20px 20px 0;
    .roleForm {
      max-width: 700px;
    }
  }
  & .permissions ::v-deep .el-form-item__label:before {
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
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
