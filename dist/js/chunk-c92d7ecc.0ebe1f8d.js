(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c92d7ecc"],{8248:function(e,o,t){"use strict";t.r(o);var n=function(){var e=this,o=e.$createElement,t=e._self._c||o;return t("div",{staticClass:"detail-info-component"},[t("content-frame",[t("div",{staticClass:"top_container"},[t("el-row",{attrs:{type:"flex",align:"middle"}},[t("el-col",{attrs:{span:3}}),t("el-col",{attrs:{span:18,justify:"center",align:"middle"}},[t("span",[e._v(e._s(e.promotion_name))])]),t("el-col",{attrs:{span:3,align:"right"}},[e.can_approve?t("el-button",{staticClass:"button text",attrs:{type:"button",size:"mini"},on:{click:e.showApprovalDialog}},[e._v("审批")]):e._e()],1)],1)],1),t("BasicInfo",{attrs:{basic_info:e.basic_info,employment_info:e.employment_info}}),e.fillinfo_show&&2==e.type_id?t("applyInfo",{attrs:{basic_info:e.basic_info,employment_info:e.employment_info,basic_info_back:e.basic_info_back,hr_approved_node:e.hr_approved_node,edit:e.edit}}):e._e(),e.fillinfo_show?t("EduInfo",{attrs:{education_experience:e.education_experience}}):e._e(),e.fillinfo_show?t("TALResume",{attrs:{tal_experience:e.tal_experience}}):e._e(),e.fillinfo_show?t("OtherResume",{attrs:{other_company_experience:e.other_company_experience}}):e._e(),e.fillinfo_show&&2==e.type_id?t("RefInfo",{attrs:{talent:e.talent,Ref_content:e.Ref_content,edit:e.edit}}):e._e(),e.fillinfo_show&&2==e.type_id?t("WorkSummary",{attrs:{job_summary:e.job_summary,edit:e.edit}}):e._e(),e.fillinfo_show&&e.show_weekly&&2==e.type_id?t("Weekly",{attrs:{week_report:e.week_report,edit:e.edit}}):e._e(),t("AchieveInfo",{attrs:{achievements:e.achievements}}),t("CultureInfo",{attrs:{culture_list:e.culture_list}}),e._e(),t("ContributionInfo",{attrs:{contributions:e.contributions}}),t("CommentsInfo",{attrs:{comments:e.comments}}),t("TrainInfo",{attrs:{train_list:e.train_list}}),e.ApproveInfo_show&&"300"==e.hr_approved_node.node_id&&1==e.hr_approved_node.status?t("ApproveDetail",{attrs:{hr_approved_node:e.hr_approved_node}}):e._e(),e.ApproveInfo_show?t("ApproveInfo",{attrs:{nodes:e.nodes}}):e._e()],1),e.ApprovalDialog?t("approval-dialog",{attrs:{ApprovalDialog:e.ApprovalDialog,Id:e.promotion_user_id,approvalType:e.approvalType},on:{close:e.closeApprovalDialog}}):e._e()],1)},i=[],r=(t("e6cf"),t("fea5")),a={data(){return{edit:!1,promotion_name:"",workcode:"",basic_info:{},employment_info:{},basic_info_back:{boy:"",girl:"",target_level:"",is_skip_level:"",development_plan:"",team_people_count:""},achievements:[],culture_list:[],train_list:[],contributions:[],comments:[],promotions:[],nodes:[],education_experience:[],tal_experience:[],other_company_experience:[],talent:[{name:"",index:0,workcode:"",department_name:"",position:"",level:"",type:[]}],Ref_content:{talent_other:"",crisis:"",achievement:["","",""]},job_summary:{leadership_description:"",achievement_description:""},week_report:{study:[{date:"",content:""},{date:"",content:""},{date:"",content:""}],customer:[{date:"",content:""},{date:"",content:""},{date:"",content:""}]},promotion_id:this.$route.params.promotion_id,promotion_user_id:this.$route.params.promotion_user_id,ApproveInfo_show:!1,can_approve:!1,ApprovalDialog:!1,approvalType:"hr",fillinfo_show:!1,show_weekly:!1,type_id:"",hr_approved_node:{}}},components:{"content-frame":()=>t.e("chunk-76173720").then(t.bind(null,"fc5c")),BasicInfo:()=>t.e("chunk-415a2460").then(t.bind(null,"e614")),applyInfo:()=>t.e("chunk-031f2382").then(t.bind(null,"1ff7")),ApproveDetail:()=>t.e("chunk-365ed5a8").then(t.bind(null,"4abb")),AchieveInfo:()=>t.e("chunk-018faf54").then(t.bind(null,"5e4a")),CultureInfo:()=>t.e("chunk-53471c1c").then(t.bind(null,"7419")),PromotionInfo:()=>t.e("chunk-d0155b50").then(t.bind(null,"e297")),EduInfo:()=>t.e("chunk-fa816cf2").then(t.bind(null,"01d5")),TALResume:()=>t.e("chunk-752a719a").then(t.bind(null,"9251")),OtherResume:()=>t.e("chunk-902822fc").then(t.bind(null,"02c5")),ContributionInfo:()=>t.e("chunk-f7251748").then(t.bind(null,"8681")),CommentsInfo:()=>t.e("chunk-170ecf4f").then(t.bind(null,"d939")),TrainInfo:()=>t.e("chunk-18b92f7a").then(t.bind(null,"d05c")),RefInfo:()=>t.e("chunk-1f2c8121").then(t.bind(null,"99bd")),WorkSummary:()=>t.e("chunk-0d4b84ac").then(t.bind(null,"5634")),Weekly:()=>t.e("chunk-276f33f0").then(t.bind(null,"bfd6")),ApproveInfo:()=>t.e("chunk-2e89498a").then(t.bind(null,"309f")),"approval-dialog":()=>t.e("chunk-2d21a986").then(t.bind(null,"bbd4"))},methods:{getPromotionsInfo(){var e="";e="manager"==this.$route.params.type?r["z"]:r["w"],e(this.workcode).then(e=>{this.basic_info=e.basic_info,this.employment_info=e.employment_info,this.achievements=e.achievements,this.culture_list=e.culture_list,this.train_list=e.train_list,this.contributions=e.contributions,this.comments=e.comments,this.promotions=e.promotions,this.education_experience=e.education_experience,this.tal_experience=e.tal_experience,this.other_company_experience=e.other_company_experience})},getPromotionWebReport(){Object(r["v"])(this.promotion_id,this.promotion_user_id).then(e=>{e.promotion_user.user_fill_form&&this.set_data(e),e.promotion_user.nodes&&(this.nodes=e.promotion_user.nodes),this.basic_info_back.target_level=e.promotion_user.target_level,this.basic_info_back.is_skip_level=e.promotion_user.is_skip_level,this.workcode=e.promotion_user.workcode,this.promotion_name=e.promotion_user.promotion.name,this.type_id=e.promotion_user.promotion.type_id,e.promotion_user.hr_approved_node&&(this.hr_approved_node=e.promotion_user.hr_approved_node),this.can_approve=e.approval.can_approve&&"myApproval"==this.type,this.approval_type=e.approval.approval_type,this.getPromotionsInfo(),this.show_weekly=!0})},getPromotionAdminDetail(){Object(r["u"])(this.promotion_id,this.promotion_user_id).then(e=>{e.promotion_user.user_fill_form&&this.set_data(e),e.promotion_user.nodes&&(this.nodes=e.promotion_user.nodes),this.basic_info_back.target_level=e.promotion_user.target_level,this.basic_info_back.is_skip_level=e.promotion_user.is_skip_level,this.workcode=e.promotion_user.workcode,this.promotion_name=e.promotion_user.promotion.name,this.type_id=e.promotion_user.promotion.type_id,e.promotion_user.hr_approved_node&&(this.hr_approved_node=e.promotion_user.hr_approved_node),this.can_approve=e.approval.can_approve&&"myApproval"==this.type,this.approval_type=e.approval.approval_type,this.getPromotionsInfo(),this.show_weekly=!0})},set_data(e){var o=e.promotion_user.user_fill_form;this.basic_info_back={boy:o.children.boy,girl:o.children.girl,development_plan:o.development_plan,team_people_count:o.team_people_count},this.Ref_content={talent_other:o.important_information.talent_other,crisis:o.important_information.crisis,achievement:o.important_information.achievement},this.talent=o.important_information.talent,this.job_summary=o.job_summary,this.week_report=o.week_report},closeApprovalDialog(){this.ApprovalDialog=!1,window.location.reload()},showApprovalDialog(){200==this.approval_type?this.approvalType="super":300==this.approval_type?this.approvalType="hr":400==this.approval_type?this.approvalType="org":500!=this.approval_type&&1e3!=this.approval_type||(this.approvalType="bu"),this.ApprovalDialog=!0}},created(){var e=this.$route.params.type;"basis"==e?(this.workcode=this.$route.params.workcode,this.getPromotionsInfo(),this.type=e):(this.type=e,"manager"==e?(this.getPromotionAdminDetail(),this.fillinfo_show=!0):(this.getPromotionWebReport(),this.fillinfo_show=!0),"manager"!=e&&"approvalOrg"!=e&&"myApproval"!=e||(this.ApproveInfo_show=!0))}},p=a,s=(t("f4bf"),t("2877")),_=Object(s["a"])(p,n,i,!1,null,"096db022",null);o["default"]=_.exports},c4a1:function(e,o,t){},f4bf:function(e,o,t){"use strict";var n=t("c4a1"),i=t.n(n);i.a}}]);