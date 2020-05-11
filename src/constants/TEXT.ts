/**
 * Typescript常量声明
 * const声明一个只读的常量，大写，具体使用含义单词拼接
 * 后续可以考虑拆分为多个文件及模块 HTTP/NAV/ENUM/LABEL/ERROR
 * */

// *枚举,常量文字都放这里
// export const HTTP_STATUS_MSG_404 = "页面走丢了";
export const HTTP_STATUS_MSG_401 = "token过期，请重新登录";
export const HTTP_STATUS_MSG_5XX = "网络错误，请稍后重试";
export const HTTP_STATUS_TITLE_ERROR = "请求错误";
export const HTTP_STATUS_TITLE_5XX = "服务器错误";

// 导航

export const ACCESS_SETTING = "权限管理";
export const ACCESS_CHOICE = "权限选择";
export const USER_MANAGE = "用户管理";
export const ROLE_MANAGE = "角色管理";

export const PAGINATION_SIZE_ENUM = [20, 50, 100, 200];
export const LIST_INIT_SHOW_NUM = 5;

export const QUERY = "查询";
export const RESET = "重置";
export const STARTDATE = "开始日期";
export const ENDDATE = "结束日期";
export const EXPAND_MORE = "展开更多";
export const LOGOUT = "退出";
export const FORM_ENTERPRISE_EMAIL = "企业邮箱";
export const FORM_NAME = "姓名";
export const FORM_DEPARTMENT = "部门";
export const FORM_FAMILY_GROUP = "族群";
export const FORM_LEVEL = "职级";
export const FORM_ROLE = "角色";
export const BTN_CANCLE = "取 消";
export const BTN_CONFIRM = "确 定";
export const USER_ADD = "添加用户";
export const USER_MODIFY = "修改用户";
export const FORM_ROLE_NAME = "角色名称";
export const ROLE_ADD = "添加角色";
export const ROLE_MODIFY = "修改角色";
export const RACE = "民族";
export const WORKCODE = "工号";
export const BIRTHPLACE = "籍贯";
export const MARRIAGE_STATUS = "婚姻状况";
export const GENDER = "性别";
export const BIRTHDAY = "出生日期";
export const AGE = "年龄";
export const COMPANY_AGE = "司龄";
export const POLITICAL = "政治面貌";
export const HOBBIES = "爱好特长";
export const CAREER_GOAL = "职业发展目标";
export const PERSONAL_MISSION = "个人使命";
export const TIME = "时间";
export const NAME = "名称";
export const SCORE = "分数";
export const TAG_271 = "271标签";
export const COMMENT_BY = "评价人";
export const CURRENT_BUSINESS_UNIT = "现事业部";
export const WORKING_LOCATION = "办公地点";
export const CURRENT_POSITION_DURATION = "当前在岗时间";
export const CURRENT_LEVEL_DURATION = "当前职级时间";
export const CURRENT_DEPARTMENT = "现部门";
export const CURRENT_POSITION = "当前岗位";
export const ALIAS_CURRENT_POSITION = "现任岗位";
export const CURRENT_LEVEL = "当前职级";
export const ALIAS_CURRENT_LEVEL = "现任职级";
export const SCHOOL = "学校";
export const MAJOR = "专业";
export const DEGREE = "学位";
export const DATE = "日期";
export const EVENT_AUTHOR = "记评人";
export const EVENT_TAG = "事件标签";
export const PHONE = "电话";
export const LEVEL = "等级";
export const CYCLE = "周期";
export const QUIT_REASON = "离职原因";
export const QUIT_TYPE = "离职类型";
export const DEPARTMENT_BEFORE_QUIT = "离职前所在部门";
export const LEVEL_BEFORE_QUIT = "离职前最后职级";
export const SECOND_RESPONSIBLE_PERSON = "第二责任人";
export const STUDY_FORM = "全日制";
export const RELATIONSHIP = "关系";
export const VIEW = "查看";
export const REVIEW_DATE = "评审时间";
export const IS_REVIEW_PASSED = "评审是否通过";
export const PROMOTION_DATE = "新晋职级生效日期";
export const END_DATE = "结束日期";

export const LEVEL_COLLECTION = [
  "1.0",
  "1.1",
  "1.2",
  "1.3",
  "2.1",
  "2.2",
  "2.3",
  "3.1",
  "3.2",
  "3.3",
  "4.1",
  "4.2",
  "4.3",
  "5.1",
  "5.2",
  "5.3",
  "7"
];
export const EXAMINATION_ITEM = [
  "待直接上级审批",
  "待HRBP审批",
  "待HRD审批",
  "待总经理审批"
];

export const EMPLOYEE_TYPE_ENUM = [
  { value: 1, label: "普通员工" },
  { value: 2, label: "组织部员工" }
];
