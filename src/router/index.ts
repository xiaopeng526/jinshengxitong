import Vue from "vue";
import Router from "vue-router";
import {
  PATH_LOGIN,
  PATH_PROMOTION_MY,
  PATH_PROMOTION_MY_REPORT,
  PATH_PROMOTION_TEAM,
  PATH_PROMOTION_MY_APPROVAL,
  PATH_PROMOTION_DATA_MANAGE,
  PATH_PROMOTION_DATA_ADD,
  PATH_PROMOTION_DATA_EDIT,
  PATH_PROMOTION_APPROVAL_ORG,
  PATH_PROMOTION_ORG,
  PATH_PROMOTION_HRBP,
  PATH_PROMOTION_DETAIL,
  PATH_NOT_FOUND,
  PATH_ROLE_MANAGE,
  PATH_USER_MANAGE,
  PATH_MANAGE,
  PATH_403,
  PATH_PROMOTION_BASIS
} from "@/constants/URL";

Vue.use(Router);

function routerWithSidebar(component: () => Promise<any>) {
  return {
    default: component,
    sidebar: () => import("@/components/common/Sidebar/index.vue")
  };
}

const router = new Router({
  mode: "history",
  routes: [
    { path: "/", redirect: PATH_LOGIN },

    {
      path: PATH_PROMOTION_MY,
      component: () => import("@/layout/SidebarLayout/index.vue"),
      children: [
        {
          path: PATH_PROMOTION_MY,
          name: "promotion-my",
          components: routerWithSidebar(() => import("@/views/my/index.vue"))
        },
        {
          path: PATH_PROMOTION_MY_REPORT(),
          name: "promotion-my-report",
          components: routerWithSidebar(() =>
            import("@/views/my/selfReport/index.vue")
          )
        },
        {
          path: PATH_PROMOTION_TEAM,
          name: "promotion-team",
          components: routerWithSidebar(() => import("@/views/team/index.vue"))
        },
        {
          path: PATH_PROMOTION_MY_APPROVAL,
          name: "promotion-team-situation",
          components: routerWithSidebar(() =>
            import("@/views/myApproval/index.vue")
          )
        },
        {
          path: PATH_PROMOTION_DATA_MANAGE,
          name: "promotion-data-manage",
          components: routerWithSidebar(() =>
            import("@/views/dataManage/index.vue")
          )
        },
        {
          path: PATH_PROMOTION_DATA_ADD(),
          name: "promotion-data-manage-create",
          components: routerWithSidebar(() =>
            import("@/views/dataManage/createPromotion/index.vue")
          )
        },
        {
          path: PATH_MANAGE,
          name: "promotion-data-manage-view",
          components: routerWithSidebar(() =>
            import("@/views/dataManage/admin/index.vue")
          )
        },
        {
          path: PATH_PROMOTION_DATA_EDIT(),
          name: "promotion-data-manage-create",
          components: routerWithSidebar(() =>
            import("@/views/dataManage/createPromotion/index.vue")
          )
        },
        {
          path: PATH_PROMOTION_APPROVAL_ORG,
          name: "promotion-approval-org",
          components: routerWithSidebar(() =>
            import("@/views/approvalOrg/index.vue")
          )
        },
        {
          path: PATH_PROMOTION_ORG,
          name: "promotion-org",
          components: routerWithSidebar(() =>
            import("@/views/access/org/index.vue")
          )
        },
        {
          path: PATH_PROMOTION_HRBP,
          name: "promotion-hrbp",
          components: routerWithSidebar(() =>
            import("@/views/access/hrbp/index.vue")
          )
        },
        {
          path: PATH_USER_MANAGE,
          name: "user-manager",
          components: routerWithSidebar(() =>
            import("@/views/access/user/index.vue")
          )
        },
        {
          path: PATH_ROLE_MANAGE,
          name: "role-manager",
          components: routerWithSidebar(() =>
            import("@/views/access/role/index.vue")
          )
        },
        {
          path: PATH_PROMOTION_DETAIL(),
          name: "promotion-detail",
          components: routerWithSidebar(() =>
            import("@/views/detail/index.vue")
          )
        },
        {
          path: PATH_PROMOTION_BASIS(),
          name: "promotion-detail",
          components: routerWithSidebar(() =>
            import("@/views/detail/index.vue")
          )
        }
      ]
    },

    {
      path: PATH_LOGIN,
      name: "login",
      component: () => import("@/views/login/index.vue")
    },
    {
      path: PATH_403,
      name: "not-auth",
      component: () => import("@/views/403.vue")
    },
    {
      path: PATH_NOT_FOUND,
      name: "not-found",
      component: () => import("@/views/404.vue")
    },
    {
      path: "*",
      name: "default",
      component: () => import("@/views/404.vue")
    }
  ]
});

export default router;
