(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ee87a38a"],{"129f":function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},"67c0":function(t,e,r){"use strict";var a=r("c7d1"),n=r.n(a);n.a},"841c":function(t,e,r){"use strict";var a=r("d784"),n=r("825a"),o=r("1d80"),l=r("129f"),i=r("14c3");a("search",1,(function(t,e,r){return[function(e){var r=o(this),a=void 0==e?void 0:e[t];return void 0!==a?a.call(e,r):new RegExp(e)[t](String(r))},function(t){var a=r(e,t,this);if(a.done)return a.value;var o=n(t),s=String(this),p=o.lastIndex;l(p,0)||(o.lastIndex=0);var c=i(o,s);return l(o.lastIndex,p)||(o.lastIndex=p),null===c?-1:c.index}]}))},b0c0:function(t,e,r){var a=r("83ab"),n=r("9bf2").f,o=Function.prototype,l=o.toString,i=/^\s*function ([^ (]*)/,s="name";!a||s in o||n(o,s,{configurable:!0,get:function(){try{return l.call(this).match(i)[1]}catch(t){return""}}})},c7d1:function(t,e,r){},ff3f:function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"my-approval-page"},[r("content-frame",[r("el-row",{staticStyle:{background:"#fff",padding:"14px 24px"}},[r("el-col",{attrs:{span:24,align:"end",justify:"end"}},[r("el-button",{staticStyle:{"border-radius":"20px"},attrs:{type:"primary"},on:{click:t.exportMyApprovalList}},[t._v("导出当前列表 ")])],1)],1),r("el-form",{ref:"filterForm",staticStyle:{background:"#fff",padding:"24px"},attrs:{model:t.filterForm,inline:!0}},[r("el-form-item",{attrs:{prop:"workcode",label:"工号："}},[r("el-input",{staticStyle:{width:"130px"},attrs:{placeholder:"请输入工号"},model:{value:t.filterForm.workcode,callback:function(e){t.$set(t.filterForm,"workcode",e)},expression:"filterForm.workcode"}})],1),r("el-form-item",{attrs:{prop:"name",label:"姓名："}},[r("el-input",{staticStyle:{width:"130px"},attrs:{placeholder:"请输入姓名"},model:{value:t.filterForm.name,callback:function(e){t.$set(t.filterForm,"name",e)},expression:"filterForm.name"}})],1),r("el-form-item",{attrs:{prop:"dp",label:"部门："}},[r("el-cascader",{staticStyle:{width:"180px"},attrs:{placeholder:"请选择部门",props:t.filterProps,options:t.dpArr,"show-all-levels":!1},model:{value:t.filterForm.dp,callback:function(e){t.$set(t.filterForm,"dp",e)},expression:"filterForm.dp"}})],1),r("el-form-item",{attrs:{prop:"approval_status",label:"操作状态："}},[r("el-select",{staticStyle:{width:"130px"},attrs:{placeholder:"全部"},model:{value:t.filterForm.approval_status,callback:function(e){t.$set(t.filterForm,"approval_status",e)},expression:"filterForm.approval_status"}},t._l(t.approval_status_arr,(function(t,e,a){return r("el-option",{key:a,attrs:{label:t,value:e}})})),1)],1),r("el-form-item",[r("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{type:"primary"},on:{click:function(e){return t.submitForm("filterForm")}}},[t._v("查询 ")]),r("el-button",{directives:[{name:"waves",rawName:"v-waves"}],on:{click:function(e){return t.resetForm("filterForm")}}},[t._v("重置")])],1)],1),r("el-table",{staticStyle:{width:"100%"},attrs:{stripe:"",data:t.tableData},on:{"selection-change":t.handleSelectionChange}},[r("el-table-column",{attrs:{type:"selection",width:"45"}}),r("el-table-column",{attrs:{prop:"workcode",label:"工号"}}),r("el-table-column",{attrs:{prop:"name",label:"姓名"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("span",{staticClass:"text",on:{click:function(r){return t.promotionName(e.row)}}},[t._v(t._s(e.row.name))])]}}])}),r("el-table-column",{attrs:{prop:"department_name",label:"部门"}}),r("el-table-column",{attrs:{prop:"level",label:"晋升前职级"}}),r("el-table-column",{attrs:{prop:"target_level",label:"目标职级"}}),r("el-table-column",{attrs:{prop:"review_status_text",label:"操作状态"}}),r("el-table-column",{attrs:{prop:"status_text",label:"流程状态"}}),r("el-table-column",{attrs:{prop:"apply_time",label:"申报时间"}}),r("el-table-column",{attrs:{prop:"promotion_type_text",label:"晋升类型"}}),r("el-table-column",{attrs:{prop:"promotion_name",label:"晋升名称"}}),r("el-table-column",{attrs:{prop:"applicant_name",label:"提报人"}}),r("el-table-column",{attrs:{label:"操作",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.status>=9e3?r("el-button",{attrs:{disabled:"",type:"text",size:"small"}},[t._v("审批 ")]):r("el-button",{attrs:{type:"text",size:"small",disabled:!e.row.can_review},nativeOn:{click:function(r){return r.preventDefault(),t.showApprovalDialog(e.row)}}},[t._v("审批 ")])]}}])})],1),r("br"),r("el-row",{attrs:{type:"flex",justify:"end"}},[r("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":t.constants.PAGINATION_SIZE_ENUM,"page-size":t.pageSize,layout:"sizes, prev, pager, next",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e}}})],1)],1),t.ApprovalDialog?r("approval-dialog",{attrs:{ApprovalDialog:t.ApprovalDialog,Id:t.Id,approvalType:t.approvalType},on:{close:t.closeApprovalDialog,refresh:t.refresh}}):t._e()],1)},n=[],o=(r("a4d3"),r("4de4"),r("4160"),r("b0c0"),r("e439"),r("dbb4"),r("b64b"),r("d3b7"),r("ac1f"),r("841c"),r("159b"),r("ade3")),l=r("38fb"),i=r("fea5"),s=r("c9f1");function p(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,a)}return r}function c(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?p(Object(r),!0).forEach((function(e){Object(o["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var u={data:function(){return{pageSize:20,currentPage:1,total:0,filterProps:{value:"id",label:"name",children:"children"},filterForm:{workcode:"",name:"",dp:[],approval_status:""},tableData:[],dpArr:[],approval_status_arr:[],constants:{PAGINATION_SIZE_ENUM:l["t"]},tabelSelection:[],ApprovalDialog:!1,Id:"",approvalType:"hr"}},methods:{closeApprovalDialog:function(){this.ApprovalDialog=!1},handleSelectionChange:function(t){this.tabelSelection=t},promotionName:function(t){var e=t.promotion_id,r=t.id;this.$router.push(Object(s["n"])("myApproval",e,r))},exportMyApprovalList:function(){var t={token:this.getToken(),workcode:this.filterForm.workcode,name:this.filterForm.name,department_id:this.filterForm.dp[this.filterForm.dp.length-1]?this.filterForm.dp[this.filterForm.dp.length-1]:"",approval_status:this.filterForm.approval_status};0==this.tableData.length?this.$message.warning("导出当前的数据为空"):this.downloadFile(s["d"],t,"get")},handleCurrentChange:function(t){this.search(c({},this.getBaseParams(),{page:t}))},handleSizeChange:function(t){this.pageSize=t,this.currentPage=1,this.search(c({},this.getBaseParams(),{per_page:t,page:1}))},getStatus:function(){var t=this;Object(i["J"])().then((function(e){t.approval_status_arr=e}))},getDepartments:function(){var t=this,e={display_parent_node:!0};Object(i["H"])(e).then((function(e){t.dpArr=e}))},submitForm:function(t){var e=this;this.$refs[t].validate((function(t){if(!t)return!1;e.currentPage=1,e.$nextTick((function(){this.search(c({},this.getBaseParams(),{page:1}))}))}))},resetForm:function(t){this.$refs[t].resetFields(),this.refresh()},search:function(t){var e=this;Object(i["r"])(t).then((function(t){var r=t.data,a=t.total;e.tableData=r,e.total=a}))},refresh:function(){this.search(this.getBaseParams())},getBaseParams:function(){return{page:this.currentPage,workcode:this.filterForm.workcode,department_id:this.filterForm.dp[this.filterForm.dp.length-1]?this.filterForm.dp[this.filterForm.dp.length-1]:"",approval_status:this.filterForm.approval_status,name:this.filterForm.name,per_page:this.pageSize}},showApprovalDialog:function(t){200==t.status?this.approvalType="super":300==t.status?this.approvalType="hr":400==t.status?this.approvalType="org":500==t.status&&(this.approvalType="bu"),this.Id=t.id,this.ApprovalDialog=!0}},components:{"content-frame":function(){return r.e("chunk-76173720").then(r.bind(null,"fc5c"))},"approval-dialog":function(){return r.e("chunk-2d21a986").then(r.bind(null,"bbd4"))}},created:function(){this.getStatus(),this.getDepartments(),this.search(c({},this.getBaseParams(),{page:1}))}},f=u,d=(r("67c0"),r("2877")),h=Object(d["a"])(f,a,n,!1,null,"4d4c75aa",null);e["default"]=h.exports}}]);