import Vue from "vue";
import { LSKEYS } from "@/constants/KEY";

const getToken = function() {
  return Vue.$ls.get(LSKEYS.token);
};
export default getToken;
