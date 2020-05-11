// import Vue from "vue";
// import { ss } from "@/constants/Key";

declare var sensors: any;
export const sensorLogin = function(workcode: string) {
  sensors.quick("isReady", function() {
    sensors.login(workcode, function() {
      //回调函数的使用需要 SDK 版本大于等于 1.14.8
      sensors.quick("autoTrack", {
        platForm: "PC"
      });
    });
  });
};

// function getUserInfo() {
//   return {
//     StaffNumber: Vue.$ss.get(ss.targetCode, ""),
//     StaffName: Vue.$ss.get(ss.targetName, "")
//   };
// }
export const pageTrack = function(
  pagecode: string,
  source: string = "",
  conf: object = {}
) {
  const obj = {
    pageName: pagecode,
    source: source,
    ...conf
  };
  if (!source) {
    delete obj.source;
  }
  sensors.track("PageView_RenCai", obj);
};

export const eventTrack = function(pagecode: string, element: string) {
  sensors.track("Click_RenCai_Element", {
    pageName: pagecode,
    $element_name: element
  });
};
