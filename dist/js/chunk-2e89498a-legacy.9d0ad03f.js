(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2e89498a"],{"309f":function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"edu-info-component"},[n("div",{staticClass:"section-content"},[n("section-title",{attrs:{border:!1,title:e.title}}),n("el-timeline",e._l(e.nodes,(function(t,o){return n("el-timeline-item",{key:o,attrs:{icon:t.icon,type:t.type,color:"#5dc5b2",size:t.size}},[n("el-row",[n("el-col",{attrs:{span:3}},[e._v(" "+e._s(e.node_person[t.node_id])+" "),n("br"),e._v(" "+e._s(t.name)+" "),n("br"),e._v(" "+e._s(e.status[t.status])+" ")]),n("el-col",{attrs:{span:21}},[t.comment||500!=t.node_id?n("div",[e._v(" 审批意见 ")]):e._e(),t.comment||500!=t.node_id?n("div",[n("el-input",{attrs:{disabled:!0,type:"textarea",rows:3},model:{value:t.comment,callback:function(n){e.$set(t,"comment",n)},expression:"activity.comment"}})],1):e._e()])],1)],1)})),1)],1)])},s=[],i=(n("d3b7"),{props:{nodes:{type:Array,default:function(){}}},data:function(){return{title:"审批状态",status:["待审批","通过","驳回"],node_person:{200:"直接上级",300:"HRBP",400:"HRD",500:"事业部总经理"}}},components:{"section-title":function(){return n.e("chunk-c95c5e34").then(n.bind(null,"7821"))}},computed:{}}),c=i,a=(n("e1d4"),n("2877")),r=Object(a["a"])(c,o,s,!1,null,"abac4612",null);t["default"]=r.exports},e1d4:function(e,t,n){"use strict";var o=n("e816"),s=n.n(o);s.a},e816:function(e,t,n){}}]);