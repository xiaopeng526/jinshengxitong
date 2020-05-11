<template>
  <el-dialog
    class="video-dialog"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :visible="visible"
    center
    width="400px"
    @close="close"
  >
    <video-player
      class="video-player-box"
      ref="videoPlayer"
      :options="playerOptions"
      :playsinline="true"
    ></video-player>
  </el-dialog>
</template>
<script>
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";
export default {
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    url: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      playerOptions: {
        // videojs options
        muted: false,
        width: 350,
        height: 240,
        // language: 'en',
        playbackRates: [1.0, 1.5, 2.0],
        sources: [
          {
            type: "video/mp4",
            src: this.url
          }
        ]
      }
    };
  },
  methods: {
    close() {
      this.$emit("update:visible", false);
    }
  },
  components: {
    videoPlayer
  }
};
</script>
<style scoped lang="scss">
.video-dialog {
  border-bottom: 1px solid #e3e3e3;
  padding: 26px 17px;
  & ::v-deep .vjs-big-play-button {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
