// import qs from "qs";
const base = process.env.VUE_APP_API_URL;
export const PATH_ZHIYINLOU = process.env.VUE_APP_ZHIYINLOU_URL || "";
// 路由,路径相关

export const PATH_LOGIN = "/login";

//404 page
export const PATH_NOT_FOUND = "/404";
// 403 没有权限
export const PATH_403 = "/403";
//我的晋升
export const PATH_PROMOTION_MY = "/my";
//我的晋升 填报
export const PATH_PROMOTION_MY_REPORT = (
  promotion_id = ":promotion_id",
  promotion_user_id = ":promotion_user_id"
) => `/my/report/${promotion_id}/${promotion_user_id}`;

export const PATH_PROMOTION_TEAM = "/team";
export const PATH_PROMOTION_MY_APPROVAL = "/myApproval";
export const PATH_PROMOTION_DATA_MANAGE = "/admin";
export const PATH_PROMOTION_DATA_ADD = (type = ":type") => `/manager/${type}`;
export const PATH_PROMOTION_DATA_EDIT = (
  type = ":type",
  promotion_id = ":promotion_id"
) => `/manager/${type}/${promotion_id}`;
export const PATH_PROMOTION_APPROVAL_ORG = "/approvalOrg";
export const PATH_PROMOTION_ORG = "/promotion/org";
export const PATH_PROMOTION_HRBP = "/promotion/hrbp";
export const PATH_USER_MANAGE = "/access/user";
export const PATH_ROLE_MANAGE = "/access/role";
export const PATH_MANAGE = "/admin/list";

export const PATH_HOME = PATH_USER_MANAGE;
//详情
export const PATH_PROMOTION_DETAIL = (
  type = ":type",
  promotion_id = ":promotion_id",
  promotion_user_id = ":promotion_user_id"
) => `/detail/${type}/${promotion_id}/${promotion_user_id}`;
//团队晋升----详情
export const PATH_PROMOTION_BASIS = (type = ":type", workcode = ":workcode") =>
  `/detail/${type}/${workcode}`;

//编辑器 上传图片
export const postImgUpload = () => `${base}/web/upload`;

// 晋升数据管理导出
export const PATH_EXPORT_DATA_MANAGER = `${base}/admin/promotions/users/export`;

//我的审批
export const PATH_EXPORT_MY_APPROVAL = `${base}/web/promotions/users/my-approval/export`;

//评审委员会
export const PATH_EXPORT_APPROVAL_ORG = `${base}/web/promotions/users/jury/export`;
