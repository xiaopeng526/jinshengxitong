const userAgent = window.navigator.userAgent.toLowerCase();

function find(needle: string) {
  return userAgent.indexOf(needle) !== -1;
}
const isWindows = find("windows");
const android = !isWindows && find("android");
const androidPhone = android && find("mobile");
const iphone = !isWindows && find("iphone");
const ipod = find("ipod");
const mobile = androidPhone || iphone || ipod;
const dingding = find("dingtalk");
const yach = find("yach");
export const isPC = () => !mobile;

export const isClientPC = () => {
  // tslint:disable-next-line
  return !mobile && (dingding || yach);
};
