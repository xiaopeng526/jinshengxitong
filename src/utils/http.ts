// 引入axios用来封装http请求
// eslint-disable-next-line no-unused-vars
import axios, { AxiosRequestConfig } from "axios";
// token失效|禁用跳转登录页
import router from "../router";
import { innerLock } from "@/utils/lock";
import Vue from "vue";
import { LSKEYS } from "@/constants/KEY";
import { isPC, isClientPC } from "@/utils/ding";
import { refreshToken } from "@/constants/API";
import throttle from "lodash.throttle";
// 提示信息常量引入，方便统一更改
import {
  HTTP_STATUS_MSG_401,
  HTTP_STATUS_MSG_5XX,
  HTTP_STATUS_TITLE_ERROR,
  HTTP_STATUS_TITLE_5XX
} from "../constants/TEXT";
import { stopLoading } from "@/mixin/loading";
// Content-Type:application/x-www-form-urlencoded时 对json数据字符串处理，JSON.stringify()不是很理想
// import qs from "qs";
// 引入element-ui右侧弹框提示样式，可以根据项目需求改不同形式弹框
import { Notification, MessageBox } from "element-ui";
import { PATH_403, PATH_ZHIYINLOU, PATH_HOME } from "@/constants/URL";
// import Vue from "vue";

// 创建axios实例常量配置
const axiosCreate = {
  // 根据环境配置后端api的url
  baseURL: process.env.VUE_APP_API_URL,
  // 请求超时时间
  timeout: 30000,
  // 是否允许后端设置cookie跨域，一般无需改动
  withCredentials: false,
  validateStatus: function(status: number) {
    // 若状态码大于等于500时则Reject 用来统一处理5XX报错走catch方法
    return status < 400;
  }
};

/**
 * 设置post方法的Content-Type
 * 根据后端要求进行application/x-www-form-urlencoded和application/json的替换。
 * 默认application/x-www-form-urlencoded
 * 若是application/json传递，则不需要qs字符串化
 */
// const postHeaders = "application/x-www-form-urlencoded";
const postHeaders = "application/json";

// 创建axios实例
const http = axios.create(axiosCreate);
http.defaults.headers.common["Content-Type"] = postHeaders;
// let loadingInstance: any

let refreshing = false;
const refreshErr = new Error("refreshing token");
const tokenRefreshDuration = 5000;

function tokenCheck(config: AxiosRequestConfig) {
  const url = config.url;
  //* login 页面的请求不检查
  const isLoginReq =
    url && (url.includes("/admin/login") || url.includes("/admin/login_fz"));
  if (isLoginReq) return;
  //* token剩余时间少于 600s 就触发刷新token接口
  if (Vue.$ls.ttl(LSKEYS.token) != -1 && Vue.$ls.ttl(LSKEYS.token) < 600000) {
    refreshToken().then((res: any) => {
      Vue.$ls.set(LSKEYS.token, res.token, res.expires * 1000);
      refreshing = false;
    });
    refreshing = true;
  }
}
const throttleCheck = throttle(tokenCheck, tokenRefreshDuration);
/**
 * axios request拦截器
 * 要求后端不管成功与否返回数据结构
 * {
 *  data:{    正常来讲就是返回数据
 *   errcode:'1'/'2'/'3'...    极少数errcode用来拓展业务需求特殊处理的情况，结合业务需求前后端协商定义
 *  },
 *  errmsg:'失败后端提示信息'       若http状态码为444，我就弹出errmsg内容
 * }
 */
http.interceptors.request.use(
  config => {
    //* 正在刷新token, 不拦截刷新api本身,其他请求延迟请求
    if (refreshing && !config.url!.includes("/admin/refresh")) {
      setTimeout(function() {
        http(config);
      }, 500);
      throw refreshErr;
    }

    //* 非登录接口 的时候判断token过期时间,进行刷新
    throttleCheck(config);
    // loadingInstance = Loading.service({ fullscreen: true });
    //! 处理 ios9上的bug
    config.headers["Authorization"] = Vue.$ls.get(LSKEYS.token, "")
      ? "Bearer " + Vue.$ls.get(LSKEYS.token, "")
      : "Bearer";
    // if (config.method === "post" || config.method === "put") {
    //   config.data = qs.stringify(config.data);
    //   // 对post和put进行数据字符串化处理，若Content-Type:application/json则不需要
    //   config.headers["Content-Type"] = postHeaders;
    // }
    return config;
  },
  error => {
    // loadingInstance.close();
    Promise.reject(error);
  }
);

/**
 * axios respone拦截器
 * 首先针对特殊状态码特殊处理，提示内容统一在常量ts中更改
 * 采用element-ui弹框，根据业务对弹框形式自行改动
 */
http.interceptors.response.use(
  config => {
    return config.data || {};
  },
  (error: any) => {
    // 登录失败|禁用|token失效等相关问题返回401，此处做跳转登录页动作
    stopLoading();
    // * 网络超时处理
    if (error.message.includes("timeout")) {
      Notification({
        type: "error",
        title: HTTP_STATUS_TITLE_ERROR,
        message: "网络超时",
        duration: 3000
      });
      return;
    }
    if (error == refreshErr) {
      // * 刷新中,忽略
      return;
    }
    if (error.response.status === 401) {
      if (isClientPC()) {
        // 弹框
        MessageBox({
          closeOnClickModal: false,
          closeOnPressEscape: false,
          closeOnHashChange: false,
          type: "warning",
          showClose: false,
          message:
            "您没有该应用权限或者当前权限发生变化,请重新进入或者联系管理员申请权限!",
          title: "提示",
          showConfirmButton: false,
          callback: action => {
            this.$message({
              type: "info",
              message: `action: ${action}`
            });
          }
        });
        return;
      }
      if (!innerLock.isLocked()) {
        Notification({
          type: "error",
          title: HTTP_STATUS_TITLE_ERROR,
          message: error.response.data.message || HTTP_STATUS_MSG_401,
          duration: 3000
        });
        innerLock.lock();
        innerLock.autoUnlockLater();
      }
      setTimeout(() => {
        if (isPC()) {
          return (window.location.href = error.response.data.data.redirect_url);
          // return router.push(error.response.data.data.redirect_url);
        }

        return (window.location.href = PATH_ZHIYINLOU);
      }, 1500);
    } else if (error.response.status === 422) {
      Notification({
        type: "error",
        title: HTTP_STATUS_TITLE_ERROR,
        message:
          error.response.data.data[
            Object.keys(error.response.data.data)[0]
          ][0] || HTTP_STATUS_TITLE_ERROR,
        duration: 3000
      });
      return;
      // router.push({ path: PATH_LOGIN });
    } else if (error.response.status === 428) {
      // *没有数据权限
      if (!innerLock.isLocked()) {
        innerLock.lock();
        innerLock.autoUnlockLater();
        Notification({
          type: "error",
          title: HTTP_STATUS_TITLE_ERROR,
          message: error.response.data.message || HTTP_STATUS_MSG_401,
          duration: 3000
        });
        // 跳到list页面
        router.push({ path: PATH_HOME });
        return;
      }
    } else if (error.response.status === 403) {
      router.push(PATH_403);
      return;
    } else if (
      error.response.status >= 400 &&
      error.response.status !== 422 &&
      error.response.status < 500
    ) {
      const type = error.response.status == 460 ? "info" : "error";
      const title =
        error.response.status == 460 ? "温馨提示" : HTTP_STATUS_TITLE_ERROR;
      Notification({
        type: type,
        title: title,
        message: error.response.data.message || HTTP_STATUS_TITLE_ERROR,
        duration: 3000
      });
      return;
    } else {
      Notification({
        // 基于axiosCreate中validateStatus配置的区间判断此时状态码>=500 或者 浏览器直接报错(比如跨域) 走此弹框。
        type: "error",
        title: HTTP_STATUS_TITLE_5XX,
        message: HTTP_STATUS_MSG_5XX,
        duration: 3000
      });
      return Promise.reject(error.response);
    }
  }
);

export default http;
