(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1abe183c"],{"1df9":function(e,t,n){e.exports=n.p+"img/access.d50e8f67.svg"},2220:function(e,t,n){e.exports=n.p+"img/manager.42785b86.svg"},2532:function(e,t,n){"use strict";var a=n("23e7"),s=n("5a34"),r=n("1d80"),i=n("ab13");a({target:"String",proto:!0,forced:!i("includes")},{includes:function(e){return!!~String(r(this)).indexOf(s(e),arguments.length>1?arguments[1]:void 0)}})},"38fb":function(e,t,n){"use strict";n.d(t,"n",(function(){return a})),n.d(t,"o",(function(){return s})),n.d(t,"q",(function(){return r})),n.d(t,"p",(function(){return i})),n.d(t,"b",(function(){return c})),n.d(t,"a",(function(){return o})),n.d(t,"y",(function(){return u})),n.d(t,"v",(function(){return d})),n.d(t,"t",(function(){return m})),n.d(t,"s",(function(){return l})),n.d(t,"h",(function(){return p})),n.d(t,"k",(function(){return v})),n.d(t,"g",(function(){return g})),n.d(t,"i",(function(){return _})),n.d(t,"j",(function(){return x})),n.d(t,"l",(function(){return I})),n.d(t,"c",(function(){return O})),n.d(t,"d",(function(){return f})),n.d(t,"x",(function(){return A})),n.d(t,"z",(function(){return h})),n.d(t,"m",(function(){return P})),n.d(t,"u",(function(){return M})),n.d(t,"w",(function(){return T})),n.d(t,"r",(function(){return R})),n.d(t,"f",(function(){return N})),n.d(t,"e",(function(){return b}));var a="token过期，请重新登录",s="网络错误，请稍后重试",r="请求错误",i="服务器错误",c="权限管理",o="权限选择",u="用户管理",d="角色管理",m=[20,50,100,200],l="退出",p="企业邮箱",v="姓名",g="部门",_="族群",x="职级",I="角色",O="取 消",f="确 定",A="添加用户",h="修改用户",P="角色名称",M="添加角色",T="修改角色",R=["1.0","1.1","1.2","1.3","2.1","2.2","2.3","3.1","3.2","3.3","4.1","4.2","4.3","5.1","5.2","5.3","7"],N=["待直接上级审批","待HRBP审批","待HRD审批","待总经理审批"],b=[{value:1,label:"普通员工"},{value:2,label:"组织部员工"}]},"3d22":function(e,t,n){e.exports=n.p+"img/team_after.9057bd25.svg"},"3fd4":function(e,t,n){e.exports=n.p+"img/team.afb1e2ab.svg"},"44e7":function(e,t,n){var a=n("861d"),s=n("c6b6"),r=n("b622"),i=r("match");e.exports=function(e){var t;return a(e)&&(void 0!==(t=e[i])?!!t:"RegExp"==s(e))}},5690:function(e,t,n){e.exports=n.p+"img/my_approval_after.9c24b509.svg"},"5a34":function(e,t,n){var a=n("44e7");e.exports=function(e){if(a(e))throw TypeError("The method doesn't accept regular expressions");return e}},"6c89":function(e,t,n){e.exports=n.p+"img/approval_org.46a6094f.svg"},7475:function(e,t,n){e.exports=n.p+"img/my.63c25a4a.svg"},"80c0":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-menu",{staticClass:"menu-list",attrs:{collapse:e.isCollapse,"default-openeds":e.defaultOpeneds,"default-active":e.$route.path,"background-color":"#30333C","text-color":"white","active-text-color":"#969798","unique-opened":"",router:""}},[e.canRoleManage?a("el-menu-item",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{index:e.constants.PATH_PROMOTION_MY},on:{click:function(t){return e.getIcon(e.constants.PATH_PROMOTION_MY)}}},[e.myIndex?a("img",{attrs:{src:n("7475"),alt:""}}):a("img",{attrs:{src:n("8ea1"),alt:""}}),a("span",{staticClass:"icon-style"},[e._v("我的晋升")])]):e._e(),e.canRoleManage?a("el-menu-item",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{index:e.constants.PATH_PROMOTION_TEAM},on:{click:function(t){return e.getIcon(e.constants.PATH_PROMOTION_TEAM)}}},[e.teamIndex?a("img",{attrs:{src:n("3fd4"),alt:""}}):a("img",{attrs:{src:n("3d22"),alt:""}}),a("span",{staticClass:"icon-style"},[e._v("团队晋升")])]):e._e(),e.canRoleManage?a("el-menu-item",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{index:e.constants.PATH_PROMOTION_MY_APPROVAL},on:{click:function(t){return e.getIcon(e.constants.PATH_PROMOTION_MY_APPROVAL)}}},[e.myApprovalIndex?a("img",{attrs:{src:n("b0eb"),alt:""}}):a("img",{attrs:{src:n("5690"),alt:""}}),a("span",{staticClass:"icon-style"},[e._v("我的审批")])]):e._e(),e.juryListManager?a("el-menu-item",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{index:e.constants.PATH_PROMOTION_APPROVAL_ORG},on:{click:function(t){return e.getIcon(e.constants.PATH_PROMOTION_APPROVAL_ORG)}}},[e.approvalOrgIndex?a("img",{attrs:{src:n("6c89"),alt:""}}):a("img",{attrs:{src:n("f836"),alt:""}}),a("span",{staticClass:"icon-style"},[e._v("评审委员会")])]):e._e(),e.promotionListManager?a("el-menu-item",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{index:e.constants.PATH_PROMOTION_DATA_MANAGE},on:{click:function(t){return e.getIcon(e.constants.PATH_PROMOTION_DATA_MANAGE)}}},[e.managerIndex?a("img",{attrs:{src:n("2220"),alt:""}}):a("img",{attrs:{src:n("f6e5"),alt:""}}),a("span",{staticClass:"icon-style"},[e._v("晋升数据管理")])]):e._e(),e.roleManager||e.userManager||e.departmentManager||e.hrbpManager?a("el-submenu",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"access-style",attrs:{"show-timeout":100,index:e.constants.PATH_ROLE_MANAGE}},[a("template",{slot:"title"},[e.accessIndex?a("img",{attrs:{src:n("1df9"),alt:""}}):a("img",{attrs:{src:n("b492"),alt:""}}),a("span",{staticClass:"icon-style"},[e._v("权限管理")])]),e.roleManager?a("el-menu-item",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{index:e.constants.PATH_ROLE_MANAGE},on:{click:function(t){return e.getIcon(e.constants.PATH_ROLE_MANAGE)}}},[e._v("角色管理")]):e._e(),e.userManager?a("el-menu-item",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{index:e.constants.PATH_USER_MANAGE},on:{click:function(t){return e.getIcon(e.constants.PATH_USER_MANAGE)}}},[e._v("用户管理")]):e._e(),e.departmentManager?a("el-menu-item",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{index:e.constants.PATH_PROMOTION_ORG},on:{click:function(t){return e.getIcon(e.constants.PATH_PROMOTION_ORG)}}},[e._v("事业部权限管理")]):e._e(),e.hrbpManager?a("el-menu-item",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{index:e.constants.PATH_PROMOTION_HRBP},on:{click:function(t){return e.getIcon(e.constants.PATH_PROMOTION_HRBP)}}},[e._v("HRBP权限管理")]):e._e()],2):e._e()],1)},s=[],r=(n("2532"),n("38fb")),i=n("c9f1"),c=n("493b"),o={props:{isCollapse:{type:Boolean,default:!0}},data(){return{defaultOpeneds:[i["v"]],constants:{PATH_PROMOTION_MY:i["p"],PATH_PROMOTION_TEAM:i["t"],PATH_PROMOTION_MY_APPROVAL:i["q"],PATH_PROMOTION_DATA_MANAGE:i["m"],PATH_PROMOTION_APPROVAL_ORG:i["i"],PATH_PROMOTION_ORG:i["s"],PATH_PROMOTION_HRBP:i["o"],USER_MANAGE:r["y"],PATH_USER_MANAGE:i["v"],ACCESS_SETTING:r["b"],ROLE_MANAGE:r["v"],PATH_ROLE_MANAGE:i["u"]},myIndex:!0,teamIndex:!0,myApprovalIndex:!0,approvalOrgIndex:!0,managerIndex:!0,accessIndex:!0}},methods:{getIcon(e){switch(e){case"/my":this.myIndex=!1,this.teamIndex=!0,this.myApprovalIndex=!0,this.approvalOrgIndex=!0,this.managerIndex=!0,this.accessIndex=!0;break;case"/team":this.myIndex=!0,this.teamIndex=!1,this.myApprovalIndex=!0,this.approvalOrgIndex=!0,this.managerIndex=!0,this.accessIndex=!0;break;case"/myApproval":this.myIndex=!0,this.teamIndex=!0,this.myApprovalIndex=!1,this.approvalOrgIndex=!0,this.managerIndex=!0,this.accessIndex=!0;break;case"/approvalOrg":this.myIndex=!0,this.teamIndex=!0,this.myApprovalIndex=!0,this.approvalOrgIndex=!1,this.managerIndex=!0,this.accessIndex=!0;break;case"/admin":this.myIndex=!0,this.teamIndex=!0,this.myApprovalIndex=!0,this.approvalOrgIndex=!0,this.managerIndex=!1,this.accessIndex=!0;break;case"/access/role":this.myIndex=!0,this.teamIndex=!0,this.myApprovalIndex=!0,this.approvalOrgIndex=!0,this.managerIndex=!0,this.accessIndex=!1;break;case"/access/user":this.myIndex=!0,this.teamIndex=!0,this.myApprovalIndex=!0,this.approvalOrgIndex=!0,this.managerIndex=!0,this.accessIndex=!1;break;case"/promotion/org":this.myIndex=!0,this.teamIndex=!0,this.myApprovalIndex=!0,this.approvalOrgIndex=!0,this.managerIndex=!0,this.accessIndex=!1;break;case"/promotion/hrbp":this.myIndex=!0,this.teamIndex=!0,this.myApprovalIndex=!0,this.approvalOrgIndex=!0,this.managerIndex=!0,this.accessIndex=!1;break}}},computed:{roleManager(){return this.$ls.get(c["a"].permissions,[]).includes(401)},userManager(){return this.$ls.get(c["a"].permissions,[]).includes(402)},departmentManager(){return this.$ls.get(c["a"].permissions,[]).includes(403)},hrbpManager(){return this.$ls.get(c["a"].permissions,[]).includes(404)},promotionListManager(){return this.$ls.get(c["a"].permissions,[]).includes(101)},juryListManager(){return this.$ls.get(c["a"].permissions,[]).includes(301)},canRoleManage(){return 1},canUserManage(){return 1},canSeeFlow(){return 1},canSeeStock(){return 1}}},u=o,d=(n("8241"),n("2877")),m=Object(d["a"])(u,a,s,!1,null,"28211351",null);t["default"]=m.exports},8241:function(e,t,n){"use strict";var a=n("eea5"),s=n.n(a);s.a},"8ea1":function(e,t,n){e.exports=n.p+"img/my_after.68f80d84.svg"},ab13:function(e,t,n){var a=n("b622"),s=a("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(n){try{return t[s]=!1,"/./"[e](t)}catch(a){}}return!1}},b0eb:function(e,t,n){e.exports=n.p+"img/my_approval.963ce1c9.svg"},b492:function(e,t,n){e.exports=n.p+"img/access_after.3609ce9c.svg"},eea5:function(e,t,n){},f6e5:function(e,t,n){e.exports=n.p+"img/manager_after.9c856b12.svg"},f836:function(e,t,n){e.exports=n.p+"img/approval_org_after.62633342.svg"}}]);