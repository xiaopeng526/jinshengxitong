<template>
  <div class="login">
    <div class="loader">
      <div class="loader__bar"></div>
      <div class="loader__bar"></div>
      <div class="loader__bar"></div>
      <div class="loader__bar"></div>
      <div class="loader__bar"></div>
      <div class="loader__ball"></div>
    </div>
  </div>
</template>

<script>
import { userLogin, fzLogin } from "@/constants/API";
import {
  PATH_PROMOTION_MY,
  PATH_PROMOTION_TEAM,
  PATH_PROMOTION_MY_APPROVAL,
  PATH_PROMOTION_MY_REPORT,
  PATH_PROMOTION_ORG,
  PATH_PROMOTION_HRBP,
  PATH_PROMOTION_DETAIL
} from "@/constants/URL";
import qs from "qs";
import { LSKEYS } from "@/constants/KEY";
// import permission from "@/mixin/permission";
import { sensorLogin } from "@/utils/sensor";
export default {
  data() {
    return {
      startTime: new Date().getTime()
    };
  },
  created() {
    const querys = qs.parse(window.location.search, {
      ignoreQueryPrefix: true
    });
    // console.log(querys, "quers");
    let dst;
    if (querys.path == "team_promotion") {
      //团队晋升列表页
      dst = PATH_PROMOTION_TEAM;
    } else if (querys.path == "self_promotion") {
      //我的晋升列表页
      dst = PATH_PROMOTION_MY;
    } else if (querys.path == "self_approval") {
      //我的审批列表页
      dst = PATH_PROMOTION_MY_APPROVAL;
    } else if (querys.path == "manage_business") {
      //事业部权限管理页面
      dst = PATH_PROMOTION_ORG;
    } else if (querys.path == "manage_hrbp") {
      //HRBP权限管理页面
      dst = PATH_PROMOTION_HRBP;
    } else if (querys.path == "self_promotion_fill") {
      //我的晋升填报详情页
      dst = this.getPromotionDetailPath(querys);
    } else if (querys.path == "self_promotion_detail") {
      //我的晋升详情页
      dst = this.getPromotionDetailPath(querys);
    } else if (querys.path == "self_approval_detail") {
      //我的审批详情页
      dst = this.getPromotionDetailPath(querys);
    } else if (querys.path == "jury_detail") {
      //评审委员会详情页
      dst = this.getPromotionDetailPath(querys);
    }
    const token = querys.token;
    if (token) {
      //! 仿真
      if (process.env.NODE_ENV == "development") {
        this.fzLogin(querys, dst);
      } else {
        this.officialLogin(querys, dst);
      }
    }
  },
  methods: {
    getPromotionDetailPath(querys) {
      const promotion_id = querys.promotion_id;
      const promotion_user_id = querys.promotion_user_id;
      let dst;
      switch (querys.path) {
        case "self_promotion_fill": //我的晋升填报详情页
          dst = PATH_PROMOTION_MY_REPORT(promotion_id, promotion_user_id);
          break;
        case "self_promotion_detail": //我的晋升详情页
          dst = PATH_PROMOTION_DETAIL("self", promotion_id, promotion_user_id);
          break;
        case "self_approval_detail": //我的审批详情页
          dst = PATH_PROMOTION_DETAIL(
            "myApproval",
            promotion_id,
            promotion_user_id
          );
          break;
        case "jury_detail": //评审委员会详情页
          dst = PATH_PROMOTION_DETAIL(
            "approvalOrg",
            promotion_id,
            promotion_user_id
          );
          break;
      }
      return dst;
    },
    saveInfo(res) {
      const { token, admin } = res;
      const { name, permissions, avatar, workcode } = admin;

      this.$ls.set(LSKEYS.token, token);

      this.$ls.set(LSKEYS.username, name);

      this.$ls.set(LSKEYS.permissions, permissions);

      this.$ls.set(LSKEYS.avatar, avatar);

      this.$ls.set(LSKEYS.workcode, workcode);
      sensorLogin(workcode);
    },
    officialLogin(querys, dst) {
      userLogin({ token: querys.token }).then(res => {
        this.callBack(res, dst, querys);
      });
    },
    fzLogin(querys, dst) {/*077640*/
      fzLogin({ workcode: "094203" }).then(res => {
        console.log(res)
        this.callBack(res, dst, querys);
      });
    },
    callBack(res, dst, querys) {
      this.saveInfo(res);
      const duration = new Date().getTime() - this.startTime;
      const delay = Math.max(0, 1500 - duration);
      if (!querys.path) {
        setTimeout(() => {
          this.$router.push({ path: PATH_PROMOTION_MY });
        }, delay);
      } else {
        setTimeout(() => {
          this.$router.push({ path: dst });
        }, delay);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  background: #52ddab;
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  .loader {
    position: relative;
    width: 75px;
    height: 100px;
  }
  .loader__bar {
    position: absolute;
    bottom: 0;
    width: 10px;
    height: 50%;
    background: #fff;
    -webkit-transform-origin: center bottom;
    transform-origin: center bottom;
    box-shadow: 1px 1px 0 rgba(0, 0, 0, 0.2);
  }
  .loader__bar:nth-child(1) {
    left: 0px;
    -webkit-transform: scale(1, 0.2);
    transform: scale(1, 0.2);
    -webkit-animation: barUp1 4s infinite;
    animation: barUp1 4s infinite;
  }
  .loader__bar:nth-child(2) {
    left: 15px;
    -webkit-transform: scale(1, 0.4);
    transform: scale(1, 0.4);
    -webkit-animation: barUp2 4s infinite;
    animation: barUp2 4s infinite;
  }
  .loader__bar:nth-child(3) {
    left: 30px;
    -webkit-transform: scale(1, 0.6);
    transform: scale(1, 0.6);
    -webkit-animation: barUp3 4s infinite;
    animation: barUp3 4s infinite;
  }
  .loader__bar:nth-child(4) {
    left: 45px;
    -webkit-transform: scale(1, 0.8);
    transform: scale(1, 0.8);
    -webkit-animation: barUp4 4s infinite;
    animation: barUp4 4s infinite;
  }
  .loader__bar:nth-child(5) {
    left: 60px;
    -webkit-transform: scale(1, 1);
    transform: scale(1, 1);
    -webkit-animation: barUp5 4s infinite;
    animation: barUp5 4s infinite;
  }
  .loader__ball {
    position: absolute;
    bottom: 10px;
    left: 0;
    width: 10px;
    height: 10px;
    background: #fff;
    border-radius: 50%;
    -webkit-animation: ball 4s infinite;
    animation: ball 4s infinite;
  }

  @-webkit-keyframes ball {
    0% {
      -webkit-transform: translate(0, 0);
      transform: translate(0, 0);
    }
    5% {
      -webkit-transform: translate(8px, -14px);
      transform: translate(8px, -14px);
    }
    10% {
      -webkit-transform: translate(15px, -10px);
      transform: translate(15px, -10px);
    }
    17% {
      -webkit-transform: translate(23px, -24px);
      transform: translate(23px, -24px);
    }
    20% {
      -webkit-transform: translate(30px, -20px);
      transform: translate(30px, -20px);
    }
    27% {
      -webkit-transform: translate(38px, -34px);
      transform: translate(38px, -34px);
    }
    30% {
      -webkit-transform: translate(45px, -30px);
      transform: translate(45px, -30px);
    }
    37% {
      -webkit-transform: translate(53px, -44px);
      transform: translate(53px, -44px);
    }
    40% {
      -webkit-transform: translate(60px, -40px);
      transform: translate(60px, -40px);
    }
    50% {
      -webkit-transform: translate(60px, 0);
      transform: translate(60px, 0);
    }
    57% {
      -webkit-transform: translate(53px, -14px);
      transform: translate(53px, -14px);
    }
    60% {
      -webkit-transform: translate(45px, -10px);
      transform: translate(45px, -10px);
    }
    67% {
      -webkit-transform: translate(37px, -24px);
      transform: translate(37px, -24px);
    }
    70% {
      -webkit-transform: translate(30px, -20px);
      transform: translate(30px, -20px);
    }
    77% {
      -webkit-transform: translate(22px, -34px);
      transform: translate(22px, -34px);
    }
    80% {
      -webkit-transform: translate(15px, -30px);
      transform: translate(15px, -30px);
    }
    87% {
      -webkit-transform: translate(7px, -44px);
      transform: translate(7px, -44px);
    }
    90% {
      -webkit-transform: translate(0, -40px);
      transform: translate(0, -40px);
    }
    100% {
      -webkit-transform: translate(0, 0);
      transform: translate(0, 0);
    }
  }

  @keyframes ball {
    0% {
      -webkit-transform: translate(0, 0);
      transform: translate(0, 0);
    }
    5% {
      -webkit-transform: translate(8px, -14px);
      transform: translate(8px, -14px);
    }
    10% {
      -webkit-transform: translate(15px, -10px);
      transform: translate(15px, -10px);
    }
    17% {
      -webkit-transform: translate(23px, -24px);
      transform: translate(23px, -24px);
    }
    20% {
      -webkit-transform: translate(30px, -20px);
      transform: translate(30px, -20px);
    }
    27% {
      -webkit-transform: translate(38px, -34px);
      transform: translate(38px, -34px);
    }
    30% {
      -webkit-transform: translate(45px, -30px);
      transform: translate(45px, -30px);
    }
    37% {
      -webkit-transform: translate(53px, -44px);
      transform: translate(53px, -44px);
    }
    40% {
      -webkit-transform: translate(60px, -40px);
      transform: translate(60px, -40px);
    }
    50% {
      -webkit-transform: translate(60px, 0);
      transform: translate(60px, 0);
    }
    57% {
      -webkit-transform: translate(53px, -14px);
      transform: translate(53px, -14px);
    }
    60% {
      -webkit-transform: translate(45px, -10px);
      transform: translate(45px, -10px);
    }
    67% {
      -webkit-transform: translate(37px, -24px);
      transform: translate(37px, -24px);
    }
    70% {
      -webkit-transform: translate(30px, -20px);
      transform: translate(30px, -20px);
    }
    77% {
      -webkit-transform: translate(22px, -34px);
      transform: translate(22px, -34px);
    }
    80% {
      -webkit-transform: translate(15px, -30px);
      transform: translate(15px, -30px);
    }
    87% {
      -webkit-transform: translate(7px, -44px);
      transform: translate(7px, -44px);
    }
    90% {
      -webkit-transform: translate(0, -40px);
      transform: translate(0, -40px);
    }
    100% {
      -webkit-transform: translate(0, 0);
      transform: translate(0, 0);
    }
  }
  @-webkit-keyframes barUp1 {
    0% {
      -webkit-transform: scale(1, 0.2);
      transform: scale(1, 0.2);
    }
    40% {
      -webkit-transform: scale(1, 0.2);
      transform: scale(1, 0.2);
    }
    50% {
      -webkit-transform: scale(1, 1);
      transform: scale(1, 1);
    }
    90% {
      -webkit-transform: scale(1, 1);
      transform: scale(1, 1);
    }
    100% {
      -webkit-transform: scale(1, 0.2);
      transform: scale(1, 0.2);
    }
  }
  @keyframes barUp1 {
    0% {
      -webkit-transform: scale(1, 0.2);
      transform: scale(1, 0.2);
    }
    40% {
      -webkit-transform: scale(1, 0.2);
      transform: scale(1, 0.2);
    }
    50% {
      -webkit-transform: scale(1, 1);
      transform: scale(1, 1);
    }
    90% {
      -webkit-transform: scale(1, 1);
      transform: scale(1, 1);
    }
    100% {
      -webkit-transform: scale(1, 0.2);
      transform: scale(1, 0.2);
    }
  }
  @-webkit-keyframes barUp2 {
    0% {
      -webkit-transform: scale(1, 0.4);
      transform: scale(1, 0.4);
    }
    40% {
      -webkit-transform: scale(1, 0.4);
      transform: scale(1, 0.4);
    }
    50% {
      -webkit-transform: scale(1, 0.8);
      transform: scale(1, 0.8);
    }
    90% {
      -webkit-transform: scale(1, 0.8);
      transform: scale(1, 0.8);
    }
    100% {
      -webkit-transform: scale(1, 0.4);
      transform: scale(1, 0.4);
    }
  }
  @keyframes barUp2 {
    0% {
      -webkit-transform: scale(1, 0.4);
      transform: scale(1, 0.4);
    }
    40% {
      -webkit-transform: scale(1, 0.4);
      transform: scale(1, 0.4);
    }
    50% {
      -webkit-transform: scale(1, 0.8);
      transform: scale(1, 0.8);
    }
    90% {
      -webkit-transform: scale(1, 0.8);
      transform: scale(1, 0.8);
    }
    100% {
      -webkit-transform: scale(1, 0.4);
      transform: scale(1, 0.4);
    }
  }
  @-webkit-keyframes barUp3 {
    0% {
      -webkit-transform: scale(1, 0.6);
      transform: scale(1, 0.6);
    }
    100% {
      -webkit-transform: scale(1, 0.6);
      transform: scale(1, 0.6);
    }
  }
  @keyframes barUp3 {
    0% {
      -webkit-transform: scale(1, 0.6);
      transform: scale(1, 0.6);
    }
    100% {
      -webkit-transform: scale(1, 0.6);
      transform: scale(1, 0.6);
    }
  }
  @-webkit-keyframes barUp4 {
    0% {
      -webkit-transform: scale(1, 0.8);
      transform: scale(1, 0.8);
    }
    40% {
      -webkit-transform: scale(1, 0.8);
      transform: scale(1, 0.8);
    }
    50% {
      -webkit-transform: scale(1, 0.4);
      transform: scale(1, 0.4);
    }
    90% {
      -webkit-transform: scale(1, 0.4);
      transform: scale(1, 0.4);
    }
    100% {
      -webkit-transform: scale(1, 0.8);
      transform: scale(1, 0.8);
    }
  }
  @keyframes barUp4 {
    0% {
      -webkit-transform: scale(1, 0.8);
      transform: scale(1, 0.8);
    }
    40% {
      -webkit-transform: scale(1, 0.8);
      transform: scale(1, 0.8);
    }
    50% {
      -webkit-transform: scale(1, 0.4);
      transform: scale(1, 0.4);
    }
    90% {
      -webkit-transform: scale(1, 0.4);
      transform: scale(1, 0.4);
    }
    100% {
      -webkit-transform: scale(1, 0.8);
      transform: scale(1, 0.8);
    }
  }
  @-webkit-keyframes barUp5 {
    0% {
      -webkit-transform: scale(1, 1);
      transform: scale(1, 1);
    }
    40% {
      -webkit-transform: scale(1, 1);
      transform: scale(1, 1);
    }
    50% {
      -webkit-transform: scale(1, 0.2);
      transform: scale(1, 0.2);
    }
    90% {
      -webkit-transform: scale(1, 0.2);
      transform: scale(1, 0.2);
    }
    100% {
      -webkit-transform: scale(1, 1);
      transform: scale(1, 1);
    }
  }
  @keyframes barUp5 {
    0% {
      -webkit-transform: scale(1, 1);
      transform: scale(1, 1);
    }
    40% {
      -webkit-transform: scale(1, 1);
      transform: scale(1, 1);
    }
    50% {
      -webkit-transform: scale(1, 0.2);
      transform: scale(1, 0.2);
    }
    90% {
      -webkit-transform: scale(1, 0.2);
      transform: scale(1, 0.2);
    }
    100% {
      -webkit-transform: scale(1, 1);
      transform: scale(1, 1);
    }
  }
}
</style>
