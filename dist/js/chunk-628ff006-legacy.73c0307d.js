(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-628ff006"],{1806:function(e,t,r){"use strict";var n=r("e3f6"),i=r.n(n);i.a},"498a":function(e,t,r){"use strict";var n=r("23e7"),i=r("58a8").trim,o=r("c8d2");n({target:"String",proto:!0,forced:o("trim")},{trim:function(){return i(this)}})},"57c6":function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.visible?r("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:e.outside,expression:"outside"}],staticClass:"objectTree-container"},[r("el-input",{attrs:{placeholder:"输入关键字进行过滤"},model:{value:e.filterText,callback:function(t){e.filterText=t},expression:"filterText"}}),r("el-tree",{ref:"tree",attrs:{props:e.defaultProps,"default-checked-keys":e.checkedKeys,"node-key":"id","filter-node-method":e.filterNode,"show-checkbox":"",data:e.treeOps},on:{"check-change":e.treeChange}})],1):e._e()},i=[],o=(r("a4d3"),r("4de4"),r("4160"),r("c975"),r("d81d"),r("b0c0"),r("e439"),r("dbb4"),r("b64b"),r("159b"),r("ade3"));function a(e,t,r){var n=t.modifiers.bubble,i=function(r){(n||!e.contains(r.target)&&e!==r.target)&&t.value(r)};e.__vueClickOutside__=i,document.addEventListener("click",i)}function s(e,t){document.removeEventListener("click",e.__vueClickOutside__),e.__vueClickOutside__=null}var c={bind:a,unbind:s};function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach((function(t){Object(o["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var d=r("f7fe"),f={props:{visible:{type:Boolean,default:!1},data:{type:Array,default:function(){return[]}},pmt:{type:Array,default:function(){return[]}},checkedNodes:{type:Array,default:function(){return[]}},exclusive:{type:Boolean,default:!1},leafOnly:{type:Boolean,default:!1},appendToBody:{type:Boolean,default:!1}},data:function(){return{defaultProps:{label:"name"},filterText:"",tree:this.data,isMounting:!0}},methods:{filterNode:function(e,t){return!e||-1!==t.name.indexOf(e)},treeChange:d((function(e,t,r){var n=this.$refs.tree.getCheckedNodes(this.leafOnly);if(this.exclusive){if(t){var i=this.findRoot(e.id).id;this.disabledOtherBranch(i)}0==n.length&&this.enableAll()}this.$emit("update:checkedNodes",n.map((function(e){var t=e.name,r=e.id;return{name:t,department_id:r}})))}),500),findRoot:function(e){for(var t={},r=0;r<this.data.length;r++)if(t=this.data[r],this.findNode(e,this.data[r]))return t},findNode:function(e,t){if(t.id==e)return!0;var r=t.children;if(r&&r.length>0)for(var n=0;n<r.length;n++)if(this.findNode(e,r[n]))return!0;return!1},disabledOtherBranch:function(e){for(var t=this.tree,r=0;r<t.length;r++)t[r].id!=e&&(t[r]=this.disableNode(t[r],!0),this.$set(t,r,l({},t[r])))},disableNode:function(e,t){var r=this;e.disabled=t;var n=e.children;return n&&n.length>0&&(e.children=n.map((function(e){return r.disableNode(e,t)}))),e},expandNode:function(e,t){var r=this;e.expanded=t;var n=e.children;return n&&n.length>0&&(e.children=n.map((function(e){return r.expandNode(e,t)}))),e},enableAll:function(){for(var e=this.tree,t=0;t<e.length;t++)e[t]=this.disableNode(e[t],!1),this.$set(e,t,l({},e[t]))},collapseAll:function(){for(var e=this.tree,t=0;t<e.length;t++)e[t]=this.expandNode(e[t],!1),this.$set(e,t,l({},e[t]))},outside:function(){this.isMounting||this.$emit("update:visible",!1)}},watch:{filterText:d((function(e){e||this.collapseAll(),this.$refs.tree.filter(e)}),500),data:function(e){this.tree=e}},computed:{checkedKeys:function(){return this.checkedNodes.map((function(e){var t=e.department_id;return t}))},treeOps:function(){return this.tree||this.data}},directives:{"click-outside":c},mounted:function(){this.visible&&this.appendToBody&&document.body.appendChild(this.$el),this.$nextTick((function(){var e=this;setTimeout((function(){e.isMounting=!1}),1e3)}))},destroyed:function(){this.appendToBody&&this.$el&&this.$el.parentNode&&this.$el.parentNode.removeChild(this.$el)}},m=f,p=(r("f556"),r("2877")),h=Object(p["a"])(m,n,i,!1,null,"76de543a",null);t["a"]=h.exports},5899:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(e,t,r){var n=r("1d80"),i=r("5899"),o="["+i+"]",a=RegExp("^"+o+o+"*"),s=RegExp(o+o+"*$"),c=function(e){return function(t){var r=String(n(t));return 1&e&&(r=r.replace(a,"")),2&e&&(r=r.replace(s,"")),r}};e.exports={start:c(1),end:c(2),trim:c(3)}},a15b:function(e,t,r){"use strict";var n=r("23e7"),i=r("44ad"),o=r("fc6a"),a=r("a640"),s=[].join,c=i!=Object,u=a("join",",");n({target:"Array",proto:!0,forced:c||!u},{join:function(e){return s.call(o(this),void 0===e?",":e)}})},a9e3:function(e,t,r){"use strict";var n=r("83ab"),i=r("da84"),o=r("94ca"),a=r("6eeb"),s=r("5135"),c=r("c6b6"),u=r("7156"),l=r("c04e"),d=r("d039"),f=r("7c73"),m=r("241c").f,p=r("06cf").f,h=r("9bf2").f,v=r("58a8").trim,b="Number",g=i[b],y=g.prototype,_=c(f(y))==b,O=function(e){var t,r,n,i,o,a,s,c,u=l(e,!1);if("string"==typeof u&&u.length>2)if(u=v(u),t=u.charCodeAt(0),43===t||45===t){if(r=u.charCodeAt(2),88===r||120===r)return NaN}else if(48===t){switch(u.charCodeAt(1)){case 66:case 98:n=2,i=49;break;case 79:case 111:n=8,i=55;break;default:return+u}for(o=u.slice(2),a=o.length,s=0;s<a;s++)if(c=o.charCodeAt(s),c<48||c>i)return NaN;return parseInt(o,n)}return+u};if(o(b,!g(" 0o1")||!g("0b1")||g("+0x1"))){for(var F,N=function(e){var t=arguments.length<1?0:e,r=this;return r instanceof N&&(_?d((function(){y.valueOf.call(r)})):c(r)!=b)?u(new g(O(t)),r,N):O(t)},k=n?m(g):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),E=0;k.length>E;E++)s(g,F=k[E])&&!s(N,F)&&h(N,F,p(g,F));N.prototype=y,y.constructor=N,a(i,b,N)}},c8d2:function(e,t,r){var n=r("d039"),i=r("5899"),o="​᠎";e.exports=function(e){return n((function(){return!!i[e]()||o[e]()!=o||i[e].name!==e}))}},e3f6:function(e,t,r){},eb08:function(e,t,r){},ec65:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"user-data-dialog"},[r("h1",{staticClass:"title"},[e._v(e._s(e.dialogTitle))]),r("div",{staticClass:"content"},[r("el-form",{ref:"userForm",attrs:{"label-width":"100px",model:e.userForm,rules:e.rules}},[r("el-form-item",{attrs:{label:e.constants.FORM_ENTERPRISE_EMAIL,prop:"email"}},[r("el-autocomplete",{attrs:{"fetch-suggestions":e.querySearchAsync,placeholder:"请输入内容",disabled:e.isEdit},on:{select:e.selectEmail},model:{value:e.userForm.email,callback:function(t){e.$set(e.userForm,"email","string"===typeof t?t.trim():t)},expression:"userForm.email"}})],1),r("el-form-item",{attrs:{label:e.constants.FORM_NAME,prop:"name"}},[r("el-input",{attrs:{disabled:!0},model:{value:e.userForm.name,callback:function(t){e.$set(e.userForm,"name",t)},expression:"userForm.name"}})],1),r("el-form-item",{attrs:{label:e.constants.FORM_DEPARTMENT,prop:"department"}},[r("el-input",{attrs:{placeholder:"请选择部门",readonly:"readonly"},nativeOn:{click:function(t){t.stopPropagation(),e.showDepartmentTree=!e.showDepartmentTree}},model:{value:e.dp_name,callback:function(t){e.dp_name=t},expression:"dp_name"}})],1),r("el-form-item",{attrs:{label:e.constants.FORM_LEVEL,prop:"level"}},[r("el-checkbox-group",{model:{value:e.userForm.level,callback:function(t){e.$set(e.userForm,"level",t)},expression:"userForm.level"}},e._l(e.levels,(function(t){return r("el-checkbox",{key:t.id,attrs:{label:t.id,name:"levels"}},[e._v(e._s(t.name))])})),1)],1),r("el-form-item",{attrs:{label:e.constants.FORM_ROLE,prop:"role"}},[r("el-checkbox-group",{model:{value:e.userForm.role,callback:function(t){e.$set(e.userForm,"role",t)},expression:"userForm.role"}},e._l(e.roles,(function(t){return r("el-checkbox",{key:t.id,attrs:{label:t.id,name:"role"}},[e._v(e._s(t.name))])})),1)],1),r("el-form-item",{staticClass:"btn-group"},[r("el-button",{directives:[{name:"waves",rawName:"v-waves"}],on:{click:e.close}},[e._v(e._s(e.constants.BTN_CANCLE))]),r("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{type:"primary"},on:{click:function(t){return e.submitForm("userForm")}}},[e._v(e._s(e.constants.BTN_CONFIRM))])],1)],1)],1),r("el-drawer",{attrs:{"append-to-body":!0,direction:"ltr",visible:e.showDepartmentTree},on:{"update:visible":function(t){e.showDepartmentTree=t}}},[e.showDepartmentTree?r("TreeSelectPanel",{attrs:{checkedNodes:e.userForm.department,visible:e.showDepartmentTree,data:e.departmentArr},on:{"update:checkedNodes":function(t){return e.$set(e.userForm,"department",t)},"update:checked-nodes":function(t){return e.$set(e.userForm,"department",t)},"update:visible":function(t){e.showDepartmentTree=t}}}):e._e()],1)],1)},i=[],o=(r("a15b"),r("d81d"),r("b0c0"),r("a9e3"),r("498a"),r("fea5")),a=r("57c6"),s=r("38fb"),c={props:{actionType:{type:String,default:"add"},Id:{type:[String,Number],default:""}},data:function(){return{showDepartmentTree:!1,loading:!1,userForm:{email:"",name:"",department:[],level:[],role:[]},roles:[],levels:[{id:"1",name:"普通员工"},{id:"2",name:"组织部成员"}],departmentArr:[],rules:{name:[{required:!0,message:"请输入姓名",trigger:"blur"}],email:[{required:!0,message:"请输入企业邮箱",trigger:"blur"}],level:[{type:"array",required:!0,message:"请至少选择一个职级",trigger:"change"}],department:[{type:"array",required:!0,message:"请至少选择一个部门",trigger:"change"}],role:[{type:"array",required:!0,message:"请选择角色",trigger:"change"}]},constants:{FORM_ENTERPRISE_EMAIL:s["h"],FORM_FAMILY_GROUP:s["i"],FORM_DEPARTMENT:s["g"],FORM_LEVEL:s["j"],FORM_ROLE:s["l"],BTN_CANCLE:s["c"],BTN_CONFIRM:s["d"],FORM_NAME:s["k"]}}},methods:{getDepartments:function(){var e=this;Object(o["G"])().then((function(t){e.departmentArr=t}))},getUserRoles:function(){var e=this;Object(o["A"])().then((function(t){e.roles=t}))},close:function(){this.$emit("update:visible",!1)},submitForm:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return!1;t.submitFunc(t.afterSubmit)}))},searchUserBasicInfo:function(e){return Object(o["cb"])({keywords:e})},addUserSubmit:function(e){var t=this;Object(o["e"])(this.getParams()).then((function(r){return t.$message({message:"添加成功!",type:"success"}),e&&e()}))},modifyUserSubmit:function(e){var t=this,r=this.getParams();Object(o["N"])(this.Id,r).then((function(r){return t.$message({message:"修改成功!",type:"success"}),e&&e()}))},afterSubmit:function(){this.$emit("refresh"),this.close()},querySearchAsync:function(e,t){this.isEdit&&this.loading&&(this.userForm.name=""),e.trim()?this.searchUserBasicInfo(e).then((function(e){t(e.map((function(e){return e.value=e.email,e}))||[])})):t([])},selectEmail:function(e){this.userForm.workcode=e.workcode,this.userForm.name=e.name},getParams:function(){return{workcode:this.userForm.workcode,email:this.userForm.email,name:this.userForm.name,target_rank:this.userForm.level,departments:this.dpIds,roles:this.userForm.role}},getUserDetail:function(){var e=this;Object(o["L"])(this.Id).then((function(t){e.userForm.name=t.name,e.userForm.email=t.email,e.userForm.workcode=t.workcode,e.userForm.level=t.target_rank,e.userForm.role=t.roles,e.userForm.department=t.departments,e.$nextTick((function(){this.loading=!1}))}))}},components:{TreeSelectPanel:a["a"]},computed:{dp_name:function(){return this.userForm.department.map((function(e){return e.name})).join(", ")},dpIds:function(){return this.userForm.department.map((function(e){var t=e.department_id;return t}))},dialogTitle:function(){return"add"==this.actionType?s["x"]:s["z"]},submitFunc:function(){return"add"==this.actionType?this.addUserSubmit:this.modifyUserSubmit},isEdit:function(){return"add"!=this.actionType}},created:function(){this.getDepartments(),this.getUserRoles(),this.isEdit&&this.getUserDetail()}},u=c,l=(r("1806"),r("2877")),d=Object(l["a"])(u,n,i,!1,null,"1070d718",null);t["default"]=d.exports},f556:function(e,t,r){"use strict";var n=r("eb08"),i=r.n(n);i.a},f7fe:function(e,t,r){(function(t){var r="Expected a function",n=NaN,i="[object Symbol]",o=/^\s+|\s+$/g,a=/^[-+]0x[0-9a-f]+$/i,s=/^0b[01]+$/i,c=/^0o[0-7]+$/i,u=parseInt,l="object"==typeof t&&t&&t.Object===Object&&t,d="object"==typeof self&&self&&self.Object===Object&&self,f=l||d||Function("return this")(),m=Object.prototype,p=m.toString,h=Math.max,v=Math.min,b=function(){return f.Date.now()};function g(e,t,n){var i,o,a,s,c,u,l=0,d=!1,f=!1,m=!0;if("function"!=typeof e)throw new TypeError(r);function p(t){var r=i,n=o;return i=o=void 0,l=t,s=e.apply(n,r),s}function g(e){return l=e,c=setTimeout(N,t),d?p(e):s}function _(e){var r=e-u,n=e-l,i=t-r;return f?v(i,a-n):i}function O(e){var r=e-u,n=e-l;return void 0===u||r>=t||r<0||f&&n>=a}function N(){var e=b();if(O(e))return k(e);c=setTimeout(N,_(e))}function k(e){return c=void 0,m&&i?p(e):(i=o=void 0,s)}function E(){void 0!==c&&clearTimeout(c),l=0,i=u=o=c=void 0}function T(){return void 0===c?s:k(b())}function w(){var e=b(),r=O(e);if(i=arguments,o=this,u=e,r){if(void 0===c)return g(u);if(f)return c=setTimeout(N,t),p(u)}return void 0===c&&(c=setTimeout(N,t)),s}return t=F(t)||0,y(n)&&(d=!!n.leading,f="maxWait"in n,a=f?h(F(n.maxWait)||0,t):a,m="trailing"in n?!!n.trailing:m),w.cancel=E,w.flush=T,w}function y(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function _(e){return!!e&&"object"==typeof e}function O(e){return"symbol"==typeof e||_(e)&&p.call(e)==i}function F(e){if("number"==typeof e)return e;if(O(e))return n;if(y(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=y(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(o,"");var r=s.test(e);return r||c.test(e)?u(e.slice(2),r?2:8):a.test(e)?n:+e}e.exports=g}).call(this,r("c8ba"))}}]);