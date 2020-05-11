<template>
  <el-menu
    :collapse="isCollapse"
    :default-openeds="defaultOpeneds"
    class="menu-list"
    :default-active="$route.path"
    background-color="#30333C"
    text-color="white"
    active-text-color="#969798"
    unique-opened
    router
  >
    <el-menu-item
      v-waves
      v-if="canRoleManage"
      :index="constants.PATH_PROMOTION_MY"
      @click="getIcon(constants.PATH_PROMOTION_MY)"
    >
      <img v-if="myIndex" src="@/assets/img/my.svg" alt="" />
      <img v-else src="@/assets/img/my_after.svg" alt="" />
      <span class="icon-style">我的晋升</span>
    </el-menu-item>
    <el-menu-item
      v-waves
      v-if="canRoleManage"
      :index="constants.PATH_PROMOTION_TEAM"
      @click="getIcon(constants.PATH_PROMOTION_TEAM)"
    >
      <img v-if="teamIndex" src="@/assets/img/team.svg" alt="" />
      <img v-else src="@/assets/img/team_after.svg" alt="" />
      <span class="icon-style">团队晋升</span>
    </el-menu-item>
    <el-menu-item
      v-waves
      v-if="canRoleManage"
      :index="constants.PATH_PROMOTION_MY_APPROVAL"
      @click="getIcon(constants.PATH_PROMOTION_MY_APPROVAL)"
    >
      <img v-if="myApprovalIndex" src="@/assets/img/my_approval.svg" alt="" />
      <img v-else src="@/assets/img/my_approval_after.svg" alt="" />
      <span class="icon-style">我的审批</span>
    </el-menu-item>
    <!-- <el-submenu
      :show-timeout="100"
      v-waves
      v-if="canRoleManage || canUserManage"
      :index="constants.PATH_PROMOTION_TEAM"
    >
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>团队晋升</span>
      </template>
      <el-menu-item
        v-waves
        v-if="canRoleManage"
        :index="constants.PATH_PROMOTION_TEAM"
        >我的团队</el-menu-item
      >
    </el-submenu>-->
    <el-menu-item
      v-waves
      v-if="juryListManager"
      :index="constants.PATH_PROMOTION_APPROVAL_ORG"
      @click="getIcon(constants.PATH_PROMOTION_APPROVAL_ORG)"
    >
      <img v-if="approvalOrgIndex" src="@/assets/img/approval_org.svg" alt="" />
      <img v-else src="@/assets/img/approval_org_after.svg" alt="" />
      <span class="icon-style">评审委员会</span>
    </el-menu-item>
    <el-menu-item
      v-waves
      v-if="promotionListManager"
      :index="constants.PATH_PROMOTION_DATA_MANAGE"
      @click="getIcon(constants.PATH_PROMOTION_DATA_MANAGE)"
    >
      <img v-if="managerIndex" src="@/assets/img/manager.svg" alt="" />
      <img v-else src="@/assets/img/manager_after.svg" alt="" />
      <span class="icon-style">晋升数据管理</span>
    </el-menu-item>

    <!-- <el-menu-item v-waves v-if="canRoleManage" :index="constants.PATH_PROMOTION_DEPARTMENT">
      <i class="el-icon-setting"></i>
      <span>事业部总经理</span>
    </el-menu-item>-->

    <el-submenu
      :show-timeout="100"
      v-waves
      v-if="roleManager || userManager || departmentManager || hrbpManager"
      :index="constants.PATH_ROLE_MANAGE"
      class="access-style"
    >
      <template slot="title">
        <img v-if="accessIndex" src="@/assets/img/access.svg" alt="" />
        <img v-else src="@/assets/img/access_after.svg" alt="" />
        <span class="icon-style">权限管理</span>
      </template>

      <el-menu-item
        v-waves
        v-if="roleManager"
        :index="constants.PATH_ROLE_MANAGE"
        @click="getIcon(constants.PATH_ROLE_MANAGE)"
        >角色管理</el-menu-item
      >
      <el-menu-item
        v-waves
        v-if="userManager"
        :index="constants.PATH_USER_MANAGE"
        @click="getIcon(constants.PATH_USER_MANAGE)"
        >用户管理</el-menu-item
      >
      <el-menu-item
        v-waves
        v-if="departmentManager"
        :index="constants.PATH_PROMOTION_ORG"
        @click="getIcon(constants.PATH_PROMOTION_ORG)"
        >事业部权限管理</el-menu-item
      >
      <el-menu-item
        v-waves
        v-if="hrbpManager"
        :index="constants.PATH_PROMOTION_HRBP"
        @click="getIcon(constants.PATH_PROMOTION_HRBP)"
        >HRBP权限管理</el-menu-item
      >
    </el-submenu>
  </el-menu>
</template>
<script>
import { USER_MANAGE, ACCESS_SETTING, ROLE_MANAGE } from "@/constants/TEXT";
import {
  PATH_PROMOTION_MY,
  PATH_PROMOTION_TEAM,
  PATH_PROMOTION_MY_APPROVAL,
  PATH_PROMOTION_DATA_MANAGE,
  PATH_PROMOTION_APPROVAL_ORG,
  PATH_PROMOTION_ORG,
  PATH_PROMOTION_HRBP,
  PATH_USER_MANAGE,
  // PATH_ACCESS_ROLES,
  PATH_ROLE_MANAGE
} from "@/constants/URL";

import { LSKEYS } from "@/constants/KEY";
// import my from "@/assets/img/my.svg";

export default {
  props: {
    isCollapse: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      defaultOpeneds: [PATH_USER_MANAGE],
      constants: {
        PATH_PROMOTION_MY,
        PATH_PROMOTION_TEAM,
        PATH_PROMOTION_MY_APPROVAL,
        PATH_PROMOTION_DATA_MANAGE,
        PATH_PROMOTION_APPROVAL_ORG,
        PATH_PROMOTION_ORG,
        PATH_PROMOTION_HRBP,
        USER_MANAGE,
        PATH_USER_MANAGE,
        ACCESS_SETTING,
        ROLE_MANAGE,
        PATH_ROLE_MANAGE
      },
      myIndex: true,
      teamIndex: true,
      myApprovalIndex: true,
      approvalOrgIndex: true,
      managerIndex: true,
      accessIndex: true
    };
  },
  methods: {
    getIcon(val) {
      switch (val) {
        case "/my":
          this.myIndex = false;
          this.teamIndex = true;
          this.myApprovalIndex = true;
          this.approvalOrgIndex = true;
          this.managerIndex = true;
          this.accessIndex = true;
          break;
        case "/team":
          this.myIndex = true;
          this.teamIndex = false;
          this.myApprovalIndex = true;
          this.approvalOrgIndex = true;
          this.managerIndex = true;
          this.accessIndex = true;
          break;
        case "/myApproval":
          this.myIndex = true;
          this.teamIndex = true;
          this.myApprovalIndex = false;
          this.approvalOrgIndex = true;
          this.managerIndex = true;
          this.accessIndex = true;
          break;
        case "/approvalOrg":
          this.myIndex = true;
          this.teamIndex = true;
          this.myApprovalIndex = true;
          this.approvalOrgIndex = false;
          this.managerIndex = true;
          this.accessIndex = true;
          break;
        case "/admin":
          this.myIndex = true;
          this.teamIndex = true;
          this.myApprovalIndex = true;
          this.approvalOrgIndex = true;
          this.managerIndex = false;
          this.accessIndex = true;
          break;
        case "/access/role":
          this.myIndex = true;
          this.teamIndex = true;
          this.myApprovalIndex = true;
          this.approvalOrgIndex = true;
          this.managerIndex = true;
          this.accessIndex = false;
          break;
        case "/access/user":
          this.myIndex = true;
          this.teamIndex = true;
          this.myApprovalIndex = true;
          this.approvalOrgIndex = true;
          this.managerIndex = true;
          this.accessIndex = false;
          break;
        case "/promotion/org":
          this.myIndex = true;
          this.teamIndex = true;
          this.myApprovalIndex = true;
          this.approvalOrgIndex = true;
          this.managerIndex = true;
          this.accessIndex = false;
          break;
        case "/promotion/hrbp":
          this.myIndex = true;
          this.teamIndex = true;
          this.myApprovalIndex = true;
          this.approvalOrgIndex = true;
          this.managerIndex = true;
          this.accessIndex = false;
          break;
      }
    }
  },
  computed: {
    roleManager() {
      return this.$ls.get(LSKEYS.permissions, []).includes(401);
    },
    userManager() {
      return this.$ls.get(LSKEYS.permissions, []).includes(402);
    },
    departmentManager() {
      return this.$ls.get(LSKEYS.permissions, []).includes(403);
    },
    hrbpManager() {
      return this.$ls.get(LSKEYS.permissions, []).includes(404);
    },
    promotionListManager() {
      return this.$ls.get(LSKEYS.permissions, []).includes(101);
    },
    juryListManager() {
      return this.$ls.get(LSKEYS.permissions, []).includes(301);
    },
    canRoleManage() {
      return 1;
      // return this.permission.includes(201);
    },
    canUserManage() {
      return 1;
      // return this.permission.includes(202);
    },
    canSeeFlow() {
      return 1;
      // return this.permission.includes(401);
    },

    canSeeStock() {
      return 1;
      // return this.permission.includes(502);
    }
  }
};
</script>

<style scoped>
.menu-list ::v-deep .el-menu-item {
  position: relative;
  padding-left: 26px !important;
}
.menu-list {
  transition: width 0s;
  border-right: none;
}
.menu-list ::v-deep .el-menu-item:hover::after,
.menu-list ::v-deep .el-menu-item.is-active::after {
  position: absolute;
  content: "";
  width: 4px;
  left: 0;
  top: 0px;
  background-color: rgb(76, 233, 195);
  height: 100%;
}
.access-style {
  margin-left: 7px;
}
.icon-style {
  margin-left: 10px;
}
</style>
