(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b962123a"],{"8bab":function(t,e,a){"use strict";var r=a("af70"),n=a.n(r);n.a},9639:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"my-promotion-page"},[a("div",[a("content-frame",[a("el-row",{staticStyle:{background:"#fff",padding:"14px 24px"}},[a("el-col",{attrs:{span:24,align:"end",justify:"end"}},[t.selfReportAction?a("el-button",{staticStyle:{"border-radius":"20px"},attrs:{type:"primary"},on:{click:t.selfReport}},[t._v("自主提报")]):t._e()],1)],1),a("el-table",{staticStyle:{width:"100%"},attrs:{stripe:"",data:t.tableData}},[a("el-table-column",{attrs:{label:"晋升名称","min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.can_apply?a("span",[t._v(" "+t._s(e.row.promotion_name)+" ")]):a("span",{staticClass:"text",on:{click:function(a){return t.selfDetail(e.row)}}},[t._v(" "+t._s(e.row.promotion_name)+" ")])]}}])}),t._l(t.tableColumns,(function(t){return a("el-table-column",{key:t.prop,attrs:{"min-width":t["min-width"],prop:t.prop,label:t.label}})})),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.can_apply?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.selfReport(e.row)}}},[t._v("填报")]):a("el-button",{attrs:{disabled:"",type:"text",size:"small"}},[t._v("填报")])]}}])})],2),a("br"),a("el-row",{attrs:{type:"flex",justify:"end"}},[a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":t.constants.PAGINATION_SIZE_ENUM,"page-size":t.pageSize,layout:"sizes, prev, pager, next",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e}}})],1)],1)],1)])},n=[],o=(a("e6cf"),a("fea5")),i=a("c9f1"),s=a("9cdc"),l={mixins:[s["a"]],data(){return{promotion_id:0,promotion_user_id:0,selfReportAction:!1,tableColumns:Object.freeze([{prop:"level",label:"晋升前职级"},{prop:"target_level",label:"目标职级"},{prop:"my_list_promotion_status_text",label:"晋升状态"},{"min-width":"110",prop:"apply_time",label:"申报时间"},{prop:"my_list_promotion_type_text",label:"晋升类型"},{prop:"applicant_name",label:"提报人"}]),tableListAPI:o["n"]}},components:{"content-frame":()=>a.e("chunk-76173720").then(a.bind(null,"fc5c"))},methods:{getCanApply(){Object(o["m"])().then(t=>{this.promotion_id=t.extra_data.promotion_id,this.promotion_user_id=t.extra_data.promotion_user_id,this.selfReportAction=1==t.can_apply})},refresh(){this.getTableList(this.getBaseParams())},getBaseParams(){return{page:this.currentPage,per_page:this.pageSize}},selfReport(t){t.promotion_id?this.$router.push(Object(i["r"])(t.promotion_id,t.promotion_user_id)):this.$router.push(Object(i["r"])(this.promotion_id,this.promotion_user_id))},selfDetail(t){this.$router.push(Object(i["n"])("self",t.promotion_id,t.promotion_user_id))}},created(){this.refresh(),this.getCanApply()}},p=l,c=(a("8bab"),a("2877")),u=Object(c["a"])(p,r,n,!1,null,"c8b36f4a",null);e["default"]=u.exports},"9cdc":function(t,e,a){"use strict";var r=a("ade3"),n=a("38fb");function o(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function i(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?o(Object(a),!0).forEach((function(e){Object(r["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}e["a"]={data(){return{pageSize:20,currentPage:1,total:0,tableData:[],constants:{PAGINATION_SIZE_ENUM:n["t"]}}},methods:{handleCurrentChange(t){this.getTableList(i({},this.getBaseParams(),{page:t}))},handleSizeChange(t){this.pageSize=t,this.currentPage=1,this.getTableList(i({},this.getBaseParams(),{per_page:t,page:1}))},getTableList(t){this.startLoading(),this.tableListAPI(t).then(t=>{var{data:e,total:a}=t;this.tableData=e,this.total=a,this.stopLoading()})}}}},af70:function(t,e,a){}}]);