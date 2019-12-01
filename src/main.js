// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";

Vue.config.productionTip = false;

import "../static/project/js/util.js";
import "../static/element/element.util.js"
import 'element-ui/lib/theme-chalk/index.css';

new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
