<template>
  <el-container class="container">
    <el-aside :class="{ isCollapse }" class="sidebar-container">
      <div class="logo-section">
        <img src="@/assets/img/logo.png" alt />
        <div class="sys-name">晋升系统</div>
      </div>
      <router-view :isCollapse="isCollapse" name="sidebar"></router-view>
    </el-aside>
    <el-container class="content-container">
      <el-header style="padding-left:0;">
        <el-row style="height:100%;" type="flex" justify="space-between">
          <hamburger
            :isActive="!isCollapse"
            @toggleClick="isCollapse = !isCollapse"
          ></hamburger>
          <user-name></user-name>
        </el-row>
      </el-header>
      <el-main class="main-container">
        <transition appear name="fade" mode="out-in">
          <keep-alive :include="['list']">
            <router-view :key="$route.path"></router-view>
          </keep-alive>
        </transition>
      </el-main>
    </el-container>
    <!-- <el-tooltip placement="top" content="tooltip"></el-tooltip> -->
    <back-to-top
      v-if="isBackShow"
      selector=".main-container"
      :custom-style="myBackToTopStyle"
      :visibility-height="300"
      transition-name="fade"
    />
  </el-container>
</template>

<script>
import BackToTop from "@/components/common/BackToTop";
export default {
  data() {
    return {
      isCollapse: false,
      myBackToTopStyle: {
        right: "50px",
        bottom: "50px",
        width: "40px",
        height: "40px",
        "border-radius": "4px",
        "line-height": "45px", // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: "#e7eaf1" // 按钮的背景颜色 The background color of the button
      },
      isBackShow: document.body.scrollTo
    };
  },
  components: {
    "user-name": () => import("@/components/common/UserName/index.vue"),
    hamburger: () => import("@/components/common/Hamburger"),
    BackToTop
  }
};
</script>
<style lang="scss" scoped>
.sidebar-container {
  background-color: #30333c;
  height: 100%;
  max-width: 180px !important;
  overflow: scroll;

  &.isCollapse {
    width: auto !important;
    .sys-name {
      display: none;
    }
    .logo-section {
      & ::v-deep img {
        width: 25px;
        height: 25px;
      }
    }
  }
}
// @media only screen and (max-width: 1280px) {
//   .container {
//     .sidebar-container {
//       // max-width: 150px !important;
//       width: auto !important;
//       .sys-name {
//         display: none;
//       }
//       .logo-section {
//         & ::v-deep img {
//           width: 25px;
//           height: 25px;
//         }
//       }
//     }
//   }
// }
// .sidebar-container >>> ul {
//   height: calc(100% - 168px);
// }
.sidebar-container ::v-deep .el-menu {
  border-right-width: 0px;
}
.container {
  height: 100%;
  .logo-section {
    padding: 15px 0;
    text-align: center;
    & ::v-deep img {
      width: 49px;
      height: 49px;
    }
  }
  .sys-name {
    font-size: 14px;
    color: #ffffff;
    letter-spacing: 0.17px;
    margin-top: 15px;
  }
  .content-container {
    background: white;
    overflow: auto;
  }
}
.main-container {
  background-color: rgb(237, 242, 245);
  padding: 0;
  height: 100%;
  // min-width: 1050px;
  // overflow: auto;
  width: 100%;
}
</style>
