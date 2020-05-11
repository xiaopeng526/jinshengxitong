import ElTableColumnPro from "@/components/common/ElTableColumnPro/ElTableColumnPro.vue";
(ElTableColumnPro as any).install = function(Vue: any) {
  Vue.component(ElTableColumnPro.name, ElTableColumnPro);
};
export default ElTableColumnPro;
