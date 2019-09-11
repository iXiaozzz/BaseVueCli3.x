import Vue from "vue";
import "vant/lib/index.css";
import "./utils/flexible";
import App from "./App";
import router from "./router";
import Utils from "./utils/index";
import ExceptionHandle from "./utils/Exception";
import VConsole from "vconsole";
import store from "./store/store";
import "./filter"; // 过滤器
import { Dialog } from "vant";

// 全局注册, 组件使用dialog
Vue.use(Dialog);
Vue.prototype.utils = Utils;
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});
Vue.config.errorHandler = ExceptionHandle;
Vue.prototype.$throw = function (error, that, type) {
  ExceptionHandle(error, that, type);
};
// Todo app 发版本自动修改版本号
Vue.prototype.GLOBAL = {
  appVersion: "1.0.0"
};
// ************* 添加百度统计 ************* start
if (process.env.NODE_ENV === "testing") {
  // 50, AT 等测试环境.
  // 测试环境添加vconsole方便在手机中调试
  let vConsole = new VConsole();
  console.log("[system] 已启用 vconsole" + vConsole.version);
} else if (process.env.NODE_ENV === "production") {
  // 正式环境.
  // hm.src = 'https://hm.baidu.com/hm.js?28b3647c27a7b11f77d5cfb34a63c957'
}
let hm = document.createElement("script");
let s = document.getElementsByTagName("body")[0];
s.appendChild(hm);
// ***************** 添加百度统计 ************ end
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
