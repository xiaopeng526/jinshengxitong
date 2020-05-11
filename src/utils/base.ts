import axios from "axios";
import http from "./http";
const bpitCommonData = require("bpit.common.data");
/**
 * Get请求
 * @param { String } url
 * @param { Object } params
 */
export function sendGet(url: string, params: object = {}) {
  return new Promise(async (resolve, _) => {
    const bpit_elk_api_start_time = new Date().getTime();
    const res = await http.get(url, { params });
    if (bpit_elk_api_start_time) {
      const end_time = new Date().getTime();
      const load_time = end_time - bpit_elk_api_start_time;
      bpitCommonData.log({
        group: "talents",
        project: "FE-PC-PROMOTION",
        env: process.env.VUE_APP_RDENV,
        api: url,
        time: load_time
      });
    }
    if (res) {
      resolve(res.data);
    }
  });
}

/**
 * Post 请求
 * @param { String } url
 * @param { Object } data
 */
export function sendPost(url: string, data: object) {
  return new Promise(async (resolve, _) => {
    const bpit_elk_api_start_time = new Date().getTime();
    const res = await http.post(url, data);
    if (bpit_elk_api_start_time) {
      const end_time = new Date().getTime();
      const load_time = end_time - bpit_elk_api_start_time;
      bpitCommonData.log({
        group: "talents",
        project: "FE-PC-PROMOTION",
        env: process.env.VUE_APP_RDENV,
        api: url,
        time: load_time
      });
    }
    if (res) {
      resolve(res.data);
    }
  });
}

/**
 * Put 请求
 * @param { String } url
 * @param { Object } data
 */
export function sendPut(url: string, data: object) {
  return new Promise(async (resolve, _) => {
    const bpit_elk_api_start_time = new Date().getTime();
    const res = await http.put(url, data);
    if (bpit_elk_api_start_time) {
      const end_time = new Date().getTime();
      const load_time = end_time - bpit_elk_api_start_time;
      bpitCommonData.log({
        group: "talents",
        project: "FE-PC-PROMOTION",
        env: process.env.VUE_APP_RDENV,
        api: url,
        time: load_time
      });
    }
    if (res) {
      resolve(res.data);
    }
  });
}

/**
 * Delete请求
 * @param { String } url
 * @param { Object } params
 */
export function sendDelete(url: string, params: object = {}) {
  return new Promise(async (resolve, _) => {
    const bpit_elk_api_start_time = new Date().getTime();
    const res = await http.delete(url, { params });
    if (bpit_elk_api_start_time) {
      const end_time = new Date().getTime();
      const load_time = end_time - bpit_elk_api_start_time;
      bpitCommonData.log({
        group: "talents",
        project: "FE-PC-PROMOTION",
        env: process.env.VUE_APP_RDENV,
        api: url,
        time: load_time
      });
    }
    if (res) {
      resolve(res.data);
    }
  });
}

/**
 * All 请求
 * @param iterable 是一个可以迭代的参数如数组等
 * @param callback 要等到所有请求都完成才会执行
 */
export function sendAll(iterable: any[], callback: (value: any[]) => any) {
  return new Promise(async (resolve, _) => {
    const res: any[] = await axios.all(iterable).then(axios.spread(callback));
    if (res.every(i => !!i)) {
      resolve(res.map(r => r.data));
    }
  });
}
