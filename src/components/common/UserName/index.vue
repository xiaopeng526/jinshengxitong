<template>
  <div class="user-name-component">
    <el-button class="btn-feedback" @click="feedbackVisible = true">
      <img width="19" src="@/assets/img/feedback.png" alt />
      <span>问题反馈</span>
    </el-button>
    <img class="avatar" :src="avatar" alt />
    <span>你好, {{ name }}</span>
<!--    <el-button v-if="!isPC" class="logout" @click="userLogout" type="text">{{-->
<!--      constants.LOGOUT-->
<!--    }}</el-button>-->
    <el-button
      v-if="!isClientPC"
      class="btn-logout"
      v-waves
      type="text"
      size="small"
      @click="handleLogOut"
      >退出</el-button
    >
    <el-drawer size="100" :visible.sync="feedbackVisible" direction="rtl">
      <!--<iframe-->
        <!--id="feeback"-->
        <!--v-if="feedbackVisible"-->
        <!--class="feedbackpage"-->
        <!--:src="feedbackURL"-->
        <!--frameborder="0"-->
      <!--&gt;</iframe>-->
    </el-drawer>
  </div>
</template>
<script>
import { userLogout } from "@/constants/API";
// import { PATH_ZHIYINLOU } from "@/constants/URL";
// import defaultAvatar from "@/assets/img/avatar_default.jpg";
import loginTou from "@/assets/img/login_tou.png";
import { LOGOUT } from "@/constants/TEXT";
import { LSKEYS } from "@/constants/KEY";
import { isPC } from "@/utils/ding";
// import Drawer from "vue-simple-drawer";

export default {
  data() {
    return {
      workcode: this.$ls.get(LSKEYS.workcode, "null"),
      constants: {
        LOGOUT
      },
      isPC: isPC(),
      feedbackVisible: false
    };
  },
  computed: {
    name() {
      return this.$ls.get(LSKEYS.username);
    },
    avatar() {
      return this.$ls.get(LSKEYS.avatar, null)
        ? `${this.$ls.get(LSKEYS.avatar)}_36x36.jpg`
        : loginTou;
    },
    feedbackURL() {
      return (
        "https://feedback.100tal.com/product/edceaf8ba4fb49a489200e549bb39172/" +
        this.workcode
      );
    }
  },
  methods: {
    clear() {
      this.$ls.clear();
    },
    handleLogOut() {
      userLogout().then(res => {
        if (res.redirect_url) {
          this.$message({
            message: "退出成功!",
            type: "success"
          });
          this.clear();
          window.location.href = res.redirect_url;
        } else {
          this.$message.warning("退出失败");
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.feedbackpage {
  height: calc(100% - 20px);
  color: white;
  padding: 20px;
}

.user-name-component {
  background: white;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333333;
  letter-spacing: 0.17px;
  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .logout {
    margin-left: 10px;
  }
  .btn-feedback {
    margin-right: 15px;
    padding: 5px;
    font-size: 13px;
    color: #ff6b01;
    letter-spacing: 0.16px;
    background: #fbfbfb;
    border: 1px solid #e2e2e2;
    border-radius: 14px;
    & ::v-deep span {
      display: flex;
      align-items: center;
      & img {
        margin-right: 5px;
      }
    }
  }
  .btn-logout {
    margin-left: 17px;
  }
}
</style>
