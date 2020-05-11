import Vue from "vue";
import { LSKEYS } from "@/constants/KEY";
function permission() {
  // tslint:disable-next-line
  return Vue.$ls.get(LSKEYS.permissions, []);
}
export default permission;
