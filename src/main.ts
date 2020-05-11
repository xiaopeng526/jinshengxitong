import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/css/common.scss";
// import Element from "element-ui";
import * as Integrations from "@sentry/integrations";

import LockPlugin from "@/utils/lock";
import mixin from "@/mixin";
import Waves from "@/directives/waves/index.js";
import emptyFilter from "@/filter/empty";
import pathFilter from "@/filter/path";
import linebreakFilter from "@/filter/linebreak";

import "./registerServiceWorker";

import LSWatcher from "vue-storage-watcher";
// wather polyfill for IE 11
import "core-js/features/symbol";
import "core-js/features/set/map";
import "core-js/features/promise";
import "@/utils/ding";

Vue.use({ ...LSWatcher }, { prefix: "rencai_promotion_" });
Vue.use(
  { ...LSWatcher },
  { prefix: "rencai_promotion_ss_", storage: "session" }
);

(window as any).Sentry.init({
  dsn: process.env.VUE_APP_SENTRY_URL!,
  environment: process.env.NODE_ENV,
  integrations: [
    new Integrations.Vue({ Vue, attachProps: true, logErrors: true })
  ],
  ignoreErrors: [
    "Do not support the current environment：notInDingTalk",
    /^Non-Error exception captured with keys:/,
    /^Non-Error promise rejection captured with keys/,
    /^AbortError: The operation was aborted/
  ]
});

Vue.mixin(mixin);
Vue.use(LockPlugin);
Vue.use(Waves);

// Vue.use(Element);
Vue.config.productionTip = false;
Vue.filter("placeholder", emptyFilter);
Vue.filter("path", pathFilter);
Vue.filter("linebreak", linebreakFilter);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
