(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-347f985e"],{"129f":function(e,t){e.exports=Object.is||function(e,t){return e===t?0!==e||1/e===1/t:e!=e&&t!=t}},5789:function(e,t,r){"use strict";var a=r("71b7"),s=r.n(a);s.a},"71b7":function(e,t,r){},"841c":function(e,t,r){"use strict";var a=r("d784"),s=r("825a"),o=r("1d80"),i=r("129f"),n=r("14c3");a("search",1,(function(e,t,r){return[function(t){var r=o(this),a=void 0==t?void 0:t[e];return void 0!==a?a.call(t,r):new RegExp(t)[e](String(r))},function(e){var a=r(t,e,this);if(a.done)return a.value;var o=s(e),l=String(this),c=o.lastIndex;i(c,0)||(o.lastIndex=0);var d=n(o,l);return i(o.lastIndex,c)||(o.lastIndex=c),null===d?-1:d.index}]}))},bfcc:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"access-hrbp-page"},[r("action-frame",[r("el-row",{staticStyle:{"margin-top":"10px"},attrs:{type:"flex",justify:"space-between"}},[r("div",{staticClass:"user_head"},[r("el-form",{ref:"filterForm",attrs:{model:e.filterForm,inline:!0,"label-width":"0"}},[r("el-form-item",{attrs:{prop:"department","label-width":"60px"}},[r("el-select",{attrs:{placeholder:"请选择数据来源"},model:{value:e.filterForm.dp,callback:function(t){e.$set(e.filterForm,"dp",t)},expression:"filterForm.dp"}},e._l(e.dpArr,(function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),r("el-form-item",{attrs:{prop:"name"}},[r("el-input",{attrs:{placeholder:"请输入部门或编码"},model:{value:e.filterForm.keyword,callback:function(t){e.$set(e.filterForm,"keyword",t)},expression:"filterForm.keyword"}})],1),r("el-form-item",[r("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{type:"primary"},on:{click:function(t){return e.refreshForm()}}},[e._v("查询")]),r("el-button",{directives:[{name:"waves",rawName:"v-waves"}],on:{click:function(t){return e.resetForm()}}},[e._v("重置")])],1)],1)],1),r("div",[r("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{plain:""},on:{click:e.addRole}},[e._v("新增HRBP")])],1)])],1),r("div",{staticClass:"section-content"},[r("content-frame",[r("el-table",{staticStyle:{width:"100%"},attrs:{stripe:"",data:e.tableData}},[r("el-table-column",{attrs:{prop:"department_id",label:"部门编号"}}),r("el-table-column",{attrs:{prop:"department_name",label:"部门名称"}}),r("el-table-column",{attrs:{prop:"HRBP",label:"HRBP"}}),r("el-table-column",{attrs:{prop:"source_text",label:"数据来源"}}),r("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{disabled:"系统同步"==t.row.source_text,type:"text",size:"small"},nativeOn:{click:function(r){return r.preventDefault(),e.modifyUser(t.row)}}},[e._v("修改")]),r("el-button",{attrs:{disabled:"系统同步"==t.row.source_text,type:"text",size:"small"},nativeOn:{click:function(r){return r.preventDefault(),e.deleteRow(t.row.id)}}},[e._v("删除")])]}}])})],1),r("br"),r("el-row",{attrs:{type:"flex",justify:"end"}},[r("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":e.constants.PAGINATION_SIZE_ENUM,"page-size":e.pageSize,layout:"sizes, prev, pager, next",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1)],1)],1),r("div",[r("el-dialog",{attrs:{visible:e.showDialog,"before-close":e.closeForm},on:{"update:visible":function(t){e.showDialog=t}}},[r("el-form",{ref:"formCareer",staticStyle:{padding:"30px 80px"},attrs:{model:e.formCareer,rules:e.formRules}},["add"==e.actionType?r("el-form-item",{attrs:{label:"部门编号","label-width":e.formLabelWidth,prop:"department_id"}},[r("el-autocomplete",{staticStyle:{width:"100%"},attrs:{"fetch-suggestions":e.querySearchAsync,placeholder:"请输入部门编号"},on:{select:e.selectManager},model:{value:e.formCareer.department_id,callback:function(t){e.$set(e.formCareer,"department_id",t)},expression:"formCareer.department_id"}})],1):r("el-form-item",[r("el-form-item",{attrs:{label:"部门编号：","label-width":e.formLabelWidth}},[e._v(e._s(e.formCareer.department_id))]),r("el-form-item",{attrs:{label:"部门名称：","label-width":e.formLabelWidth}},[e._v(e._s(e.formCareer.department_name))])],1),r("el-form-item",{attrs:{label:"HRBP：","label-width":e.formLabelWidth,prop:"workcode"}},[r("el-autocomplete",{staticStyle:{width:"100%"},attrs:{"fetch-suggestions":e.querySearch,placeholder:"请输入工号"},on:{select:e.selectHrd},model:{value:e.formCareer.workcode,callback:function(t){e.$set(e.formCareer,"workcode",t)},expression:"formCareer.workcode"}})],1)],1),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("div",[r("el-button",{on:{click:function(t){return e.close()}}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm()}}},[e._v("确 定")])],1)])],1)],1)],1)},s=[],o=(r("cca6"),r("e6cf"),r("841c"),r("ade3")),i=r("38fb"),n=r("fea5");function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){Object(o["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var d={data(){return{formRules:{department_id:[{required:!0,message:"请输入部门编号",trigger:"blur"}],workcode:[{required:!0,message:"请输入工号",trigger:"blur"}]},formLabelWidth:"120px",actionType:"add",showDialog:!1,pageSize:20,currentPage:1,total:0,filterForm:{keyword:"",dp:""},dpArr:[{value:1,label:"系统同步"},{value:2,label:"手动添加"}],tableData:[],constants:{PAGINATION_SIZE_ENUM:i["t"]},id:"",formCareer:{workcode:"",department_id:"",department_name:""}}},methods:{searchUserBasicInfo(e){return Object(n["cb"])({keywords:e})},searchDepartmentInfo(e){return Object(n["ab"])({keywords:e})},querySearch(e,t){e?this.searchUserBasicInfo(e).then(e=>{t(e.map(e=>(e.value=e.workcode+"----"+e.name,e))||[])}):t([])},querySearchAsync(e,t){e?this.searchDepartmentInfo(e).then(e=>{t(e.map(e=>(e.value=e.department_id+"----"+e.name,e))||[])}):t([])},selectHrd(e){this.formCareer.workcode=e.workcode},selectManager(e){this.formCareer.department_id=e.department_id},handleCurrentChange(e){this.search(c({},this.getBaseParams(),{page:e}))},handleSizeChange(e){this.pageSize=e,this.currentPage=1,this.search(c({},this.getBaseParams(),{per_page:e,page:1}))},close(){"add"==this.actionType?this.$refs.formCareer.resetFields():this.$refs.formCareer.clearValidate(),this.showDialog=!1,this.actionType=""},closeForm(){this.close()},addRole(){this.actionType="add",this.showDialog=!0,this.formCareer={workcode:"",department_id:""}},refreshForm(){this.currentPage=1,this.$nextTick((function(){this.search(c({},this.getBaseParams(),{page:1}))}))},submitForm(){this.$refs.formCareer.validate(e=>{e&&("add"==this.actionType?Object(n["O"])(this.getFormParams()).then(e=>{this.$message({message:"添加成功!",type:"success"}),this.showDialog=!1,this.refresh()}):Object(n["db"])(this.id,this.getParams()).then(e=>{this.$message({message:"添加成功!",type:"success"}),this.showDialog=!1,this.refresh()}))})},deleteRow(e){this.showConfirm("确定要删除吗?").then(()=>{Object(n["h"])(e).then(e=>{this.$message({message:"删除成功!",type:"success"}),this.refresh()})}).catch(()=>{})},resetForm(){this.filterForm.dp="",this.filterForm.keyword="",this.$nextTick((function(){this.refresh()}))},search(e){Object(n["l"])(e).then(e=>{this.tableData=e.data;for(var t=0;t<this.tableData.length;t++)this.tableData[t].HRBP=this.tableData[t].name+"-"+this.tableData[t].workcode;this.total=e.total})},refresh(){this.search(this.getBaseParams())},getBaseParams(){return{page:this.currentPage,per_page:this.pageSize,source:this.filterForm.dp,keyword:this.filterForm.keyword}},getFormParams(){return{workcode:this.formCareer.workcode,department_id:this.formCareer.department_id}},getParams(){return{workcode:this.formCareer.workcode}},modifyUser(e){this.actionType="modify",this.id=e.id,this.$nextTick((function(){this.formCareer=Object.assign({},e)})),this.showDialog=!0}},components:{"action-frame":()=>r.e("chunk-076129e3").then(r.bind(null,"cb5f")),"content-frame":()=>r.e("chunk-76173720").then(r.bind(null,"fc5c"))},created(){this.search(c({},this.getBaseParams(),{page:1}))}},m=d,h=(r("5789"),r("2877")),u=Object(h["a"])(m,a,s,!1,null,"3b8061af",null);t["default"]=u.exports}}]);