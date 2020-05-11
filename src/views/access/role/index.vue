<template>
  <div class="access-role-page">
    <action-frame>
      <el-row type="flex" justify="end">
        <div>
          <el-button v-waves @click="addRole" plain>新增角色</el-button>
        </div>
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
                @click.native.prevent="modify(scope.row.id)"
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
            :page-size="20"
            layout="sizes, prev, pager, next"
            :total="total"
          ></el-pagination>
        </el-row>
      </content-frame>
    </div>
    <el-drawer size="600px" direction="ltr" :visible.sync="showDialog">
      <role-dialog
        v-if="showDialog"
        :visible.sync="showDialog"
        :id="selectedRole"
        :actionType="actionType"
        :permissions="permissions"
        @refresh="refresh"
      ></role-dialog>
    </el-drawer>
  </div>
</template>

<script>
import { PAGINATION_SIZE_ENUM } from "@/constants/TEXT";
import { getRoleList, delRole, getPermission } from "@/constants/API";
import formMixin from "@/mixin/components/formMixin";

export default {
  mixins: [formMixin],
  data() {
    return {
      showDialog: false,
      actionType: "add",
      selectedRole: "",
      filterForm: {
        name: "",
        department: ""
      },
      constants: {
        PAGINATION_SIZE_ENUM
      },
      permissions: [],
      tableColumns: Object.assign([
        { prop: "name", label: "角色" },
        { prop: "permission_str", label: "权限" }
      ]),
      tableListAPI: getRoleList
    };
  },
  methods: {
    deleteRow(id) {
      this.showConfirm("确定要删除这个角色?")
        .then(() => {
          delRole(id).then(_ => {
            this.$message({
              message: "删除成功!",
              type: "success"
            });
            this.refresh();
          });
        })
        .catch(() => {});
    },
    modify(id) {
      this.selectedRole = id;
      this.actionType = "modify";
      this.showDialog = true;
    },
    addRole() {
      this.actionType = "add";
      this.showDialog = true;
    },
    getPermissionItems() {
      getPermission().then(res => {
        this.permissions = res;
      });
    },
    getParams() {
      return {
        page: this.currentPage,
        per_page: this.pageSize
      };
    },
    refresh() {
      this.getTableList(this.getParams());
    }
  },
  components: {
    "action-frame": () => import("@/components/common/ActionFrame/index.vue"),
    "content-frame": () =>
      import("@/components/common/SectionContentFrame/index.vue"),
    "role-dialog": () =>
      import("@/components/module/role/NewRoleDialog/index.vue")
  },
  created() {
    this.getPermissionItems();
    this.refresh();
  }
};
</script>
