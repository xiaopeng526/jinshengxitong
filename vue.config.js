const externals = {
  vue: "Vue",
  "vue-router": "VueRouter",
  axios: "axios",
  "element-ui": "ELEMENT"
};

const baseURL = process.env.VUE_APP_CDN || "/";
const isProduction = process.env.NODE_ENV === "production";
module.exports = {
  // lintOnSave: false,
  publicPath: baseURL,
  productionSourceMap: false,
  devServer: {
    // proxy: "http://localhost:1234"
  },
  pwa: {
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true
    }
  },
  configureWebpack: () => {
    const myConfig = {};
    myConfig.externals = externals;

    return myConfig;
  },
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].SENSOR_URL = process.env.VUE_APP_SENSOR_URL;
      args[0].isProduction = isProduction;
      return args;
    });
  }
};
