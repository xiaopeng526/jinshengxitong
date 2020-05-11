/**
 * api 都集中在这里
 * */
import { sendDelete, sendGet, sendPost, sendPut } from "@/utils/base";
const isProd = true || process.env.NODE_ENV == "production";
const prefix = isProd
  ? ""
  : "https://api.admin.zhiyinlou.com/server/index.php?g=Web&c=Mock&o=simple&projectID=35&uri=";

// const test =
//   "https://api.admin.zhiyinlou.com/server/index.php?g=Web&c=Mock&o=simple&projectID=274&uri=";
// const test =
//     "https://api.admin.zhiyinlou.com/server/index.php?g=Web&c=Mock&o=simple&projectID=35&uri="
// // // 周报搜索

//问题反馈
export const postFeedback = (params: object) =>
  sendPost(`${prefix}/star/suggest`, params);
export const refreshToken = (params: object = {}) =>
  sendPost(`${prefix}/admin/refresh`, params);

// 登录 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const userLogin = (params: Object) => sendPost(`/no-auth/login`, params);
// 退出登陆 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const userLogout = (params: Object) =>
  sendPost(`/no-auth/logout`, params);
// 仿真登录 ~~~~~~~~~~~~~~~~~~~
export const fzLogin = (params: Object) =>
  sendPost(`/no-auth/login_fz`, params);

// 我的晋升列表
export const getMyPromotionList = (params: object) =>
  sendGet("/web/self/promotions", params);
// 能否自主填报
export const getMyPromotionCanApply = () =>
  sendGet("/web/self/promotions/can-apply");
// 获取申报草稿
export const getMyPromotiondraft = (
  promotion_id: string,
  promotion_user_id: string
) => {
  return sendGet(
    `/web/self/promotions/${promotion_id}/users/${promotion_user_id}/draft`
  );
};
// 团队晋升 职级列表
export const getPromotionTeamLevel = () =>
  sendGet("/web/team/apply/options/level");
// 团队晋升 我的团队列表
export const getPromotionTeamList = (params: object) =>
  sendGet("/web/team/employees", params);
// 团队晋升 晋升情况
export const getPromotionTeamInfo = (params: object) =>
  sendGet("/web/promotion/users", params);
// 团队晋升 获取部门
export const getTeamDepartments = (params: object) =>
  sendGet("/web/departments", params);
// 团队晋升、我的审批-----获取状态
export const getTeamStatus = () =>
  sendGet("/web/promotion/users/search/status");
// 团队晋升 晋升审批
export const postPromotionTeamApproval = (
  promotionUserId: string,
  params: Object
) => sendPost(`/web/team/approval/${promotionUserId}`, params);
// 数据管理 晋升数据管理列表
export const getPromotionManagerList = (params: object) =>
  sendGet("/admin/promotions", params);
// HR审批 列表
export const getPromotionHrList = (params: object) =>
  sendGet("/web/promotion/users", params);
// HR审批 事业部总经理列表
export const getPromotionBUList = (params: object) =>
  sendGet("/web/promotion/users", params);
// 评审委员会列表
export const getPromotionJuryList = (params: object) =>
  sendGet("/web/jury", params);
// HR审批 HR审核(普通员工)
export const postPromotionHrApproval = (id: string, params: Object) => {
  return sendPost(`/web/hr/evaluation/${id}`, params);
};
// export
// 晋升情况详情导出
export const exportPromotionTeamDetail = (params: Object) =>
  sendPost("/web/team/export-detail", params);
// 晋升情况导出
export const exportPromotionTeam = (params: Object) =>
  sendPost("/web/team/export", params);
// 导出人才excel
export const exportAllTalents = (params: Object) =>
  sendPost(`/star/users/export`, params);

// 角色列表
export const getRoleList = (params: Object) =>
  sendGet(`${prefix}/auth/role`, params);
//删除
export const delRole = (id: String) => sendDelete(`${prefix}/auth/role/${id}`);

// 添加角色
export const addRole = (params: Object) =>
  sendPost(`${prefix}/auth/role`, params);
// 角色详情信息
export const getRoleDetails = (id: String) =>
  sendGet(`${prefix}/auth/role/${id}`);
// 更新角色
export const updateRoleInfo = (id: String, params: Object) =>
  sendPut(`${prefix}/auth/role/${id}`, params);

// 部门权限列表
export const getPermission = () => sendGet(`${prefix}/auth/permissions`);

// 角色列表选项
export const getRoList = () => sendGet(`${prefix}/auth/roles`);

//用户列表
export const getUserList = (params: Object) =>
  sendGet(`${prefix}/auth/user`, params);

//获取部门
export const getTeamDements = (params: object) =>
  sendGet(`${prefix}/web/departments`, params);
// 用户基本信息,模糊搜索
export const searchUserBasicInfo = (keyword: String) =>
  sendGet(`${prefix}/auth/employee`, keyword);
// 添加用户
export const addUser = (params: Object) =>
  sendPost(`${prefix}/auth/user`, params);

// 删除用户
export const delUser = (id: String) => sendDelete(`${prefix}/auth/user/${id}`);

// 修改用户信息
export const modifyUserInfo = (id: String, params: Object) =>
  sendPut(`${prefix}/auth/user/${id}`, params);
// 用户详情信息
export const getUserDetails = (id: String) =>
  sendGet(`${prefix}/auth/user/${id}`);

//事业部权限-------事业部列表
export const getDiviDements = () => sendGet(`${prefix}/auth/business`);
//事业部管理人员列表
export const getBusinessList = (params: Object) =>
  sendGet(`${prefix}/auth/business/manager`, params);
//事业部管理人员修改
export const getUpdateBusiness = (id: String, params: Object) =>
  sendPut(`${prefix}/auth/business/manager/${id}`, params);
// 晋升任务详情
export const PromotionInfo = (promotion_id: String) =>
  sendGet(`/admin/promotion/${promotion_id}`);
// 删除晋升任务
export const PromotionDelete = (promotion_id: String) =>
  sendDelete(`/admin/promotion/${promotion_id}`);
// 我的团队 晋升任务选项
export const getTeamPromotions = (params: Object) =>
  sendGet("/web/team/apply/options/promotions", params);
// 我的团队 晋升提报
export const postTeamPromotionsApply = (params: Object) =>
  sendPost("/web/team/apply", params);
// 创建晋升任务
export const postPromotionCreate = (params: Object) =>
  sendPost("/admin/promotion", params);

// 更新晋升任务
export const PromotionEdit = (promotion_id: String, params: Object) =>
  sendPut(`/admin/promotion/${promotion_id}`, params);
// 事业部总经理审核
export const postPromotionBuApproval = (promotion_id: String, params: Object) =>
  sendPost(`/web/bu/evaluation/${promotion_id}`, params);
// HR审批 HR审核(组织部)
export const postPromotionOrgApproval = (
  promotion_id: string,
  params: Object
) => {
  return sendPost(`/web/hr/org/evaluation/${promotion_id}`, params);
};
// 员工基础数据
export const getPromotionsInfo = (workcode: String) =>
  sendGet(`/admin/employee/${workcode}`);
// 我的晋升 保存申报草稿
export const postPromotionSelfDraft = (
  promotion_id: string,
  promotion_user_id: string,
  params: Object
) => {
  return sendPost(
    `/web/self/promotions/${promotion_id}/users/${promotion_user_id}/draft`,
    params
  );
};
// 人才引进-员工搜索
export const getSelfSearch = (params: Object) =>
  sendGet("/web/self/employees/search", params);
// 我的晋升 提交填报资料
export const postPromotionSelfReport = (
  promotion_id: string,
  promotion_user_id: string,
  params: Object
) => {
  return sendPost(
    `/web/self/promotions/${promotion_id}/users/${promotion_user_id}/forms`,
    params
  );
};
// 我的晋升 晋升员工详情
export const getPromotionReportWebDetail = (
  promotion_id: string,
  promotion_user_id: string
) => {
  return sendGet(`/web/promotion/${promotion_id}/user/${promotion_user_id}`);
};
// 数据管理 晋升员工详情
export const getPromotionReportAdminDetail = (
  promotion_id: string,
  promotion_user_id: string
) => {
  return sendGet(`/admin/promotion/${promotion_id}/user/${promotion_user_id}`);
};

//HRBP~~~~~~~~~~~~~~~~~~~
//部门HR数据来源列表
export const getSourceList = () => sendGet("/auth/hrbp/sources");
//HRBP 列表
export const getHrbpList = (params: Object) => sendGet("/auth/hrbp", params);
//HRBP创建
export const postHrbpCreat = (params: Object) => sendPost("/auth/hrbp", params);
//HRBP 修改
export const updateHrbpInfo = (id: String, params: Object) =>
  sendPut(`${prefix}/auth/hrbp/${id}`, params);
//HRBP 删除
export const deleteHrbpInfo = (id: String) => sendDelete(`/auth/hrbp/${id}`);
// 部门基本信息,模糊搜索
export const searchDepartmentInfo = (keyword: String) =>
  sendGet(`${prefix}/auth/department`, keyword);
//晋升类型选项
export const searchPromotionType = (params: Object) =>
  sendGet(`${prefix}/web/team/apply/options/promotion-type`, params);
//晋升任务人员列表(二级页)
export const promotionList = (promotion_id: String, params: Object) =>
  sendGet(`${prefix}/admin/promotion/${promotion_id}/users`, params);
//评审委员会审批状态
export const getStatus = () => sendGet("/web/jury/search/result/status");

// 个人填报 员工基础数据
export const getPromotionSelfInfo = (workcode: String) =>
  sendGet(`/web/employee/${workcode}`);

// 催办
export const postPushingForward = (promotion_id: String, params: Object) =>
  sendPost(`/admin/promotion/${promotion_id}/message`, params);

// 晋升数据管理二次页---获取操作状态
export const getOperationStatus = () =>
  sendGet("/web/promotion/users/process/status");

//晋升数据管理 - 列表 Excel 导出
export const getPromotionExport = (params: Object) =>
  sendGet("/admin/promotions/users/export", params);
//用户 编辑---获取部门
export const getTeamDepart = () => sendGet("/auth/departments");
