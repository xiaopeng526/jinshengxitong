import waves from "./waves";

const install = function(Vue) {
  Vue.directive("waves", waves);
};
// tslint:disable-next-line
waves.install = install;
export default waves;
