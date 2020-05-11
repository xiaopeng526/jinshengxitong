import showConfirm from "./showConfirm";
import { startLoading, stopLoading } from "./loading";
import { openNewTab } from "./openTab";
import { downloadFile } from "./downloadFile";
import getToken from "./token";
import permission from "./permission";
import { pageTrack, eventTrack } from "@/utils/sensor";
import { isClientPC } from "@/utils/ding";

export default {
  methods: {
    showConfirm,
    stopLoading,
    startLoading,
    openNewTab,
    downloadFile,
    getToken,
    pageTrack,
    eventTrack
  },
  computed: {
    permission,
    isClientPC
  }
};
