(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e97c2"],{"8e76":function(e,t,s){"use strict";s.r(t);var o=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("el-dialog",{attrs:{title:"温馨提示",visible:e.visible,"close-on-click-modal":!1,width:"30%",center:""},on:{close:e.close}},[s("span",[e._v("催办功能仅能给待审批状态流程的当前待审批人发送相关通知")]),s("div",{attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:e.close}},[e._v("取消")]),s("el-button",{attrs:{loading:e.isLoading,type:"primary"},on:{click:e.submitRejectReason}},[e._v("确定 ")])],1)])],1)},i=[],a=s("fea5"),r={props:{visible:{type:Boolean,default:!1},selectedIds:{type:Array},promotion_id:{type:[String,Number]},approvedData:{type:Array}},data(){return{isLoading:!1}},methods:{close(){this.$emit("close")},submitRejectReason(){this.approvedData.length?this.$message.error("已选项中含有非待审批状态的流程，请重新选择"):Object(a["W"])(this.promotion_id,{promotion_user_ids:this.selectedIds}).then(()=>{this.$message.success("发送成功"),this.$parent.clearSelection(),this.close()}).catch(()=>{this.$message.error("发送失败")})}}},l=r,n=s("2877"),c=Object(n["a"])(l,o,i,!1,null,"9bf6a8a2",null);t["default"]=c.exports}}]);